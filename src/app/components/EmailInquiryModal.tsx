import { useState, type FormEvent } from 'react';
import { CheckCircle, Loader2, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { sendInquiry, EMAIL_SENDING_ENABLED, type InquiryPayload } from '../lib/sendInquiry';

interface EmailInquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EMPTY: InquiryPayload = { name: '', email: '', phone: '', subject: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 2000;

type Errors = Partial<Record<keyof InquiryPayload | 'agree', string>>;

/** 숫자만 받아 010-1234-5678 / 055-880-2345 / 02-123-4567 형태로 하이픈 자동 삽입 */
function formatPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.startsWith('02')) {
    if (d.length <= 2) return d;
    if (d.length <= 5) return `${d.slice(0, 2)}-${d.slice(2)}`;
    if (d.length <= 9) return `${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`;
    return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6, 10)}`;
  }
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  if (d.length <= 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

function validate(form: InquiryPayload, agree: boolean): Errors {
  const e: Errors = {};
  if (!form.subject.trim()) e.subject = '제목을 입력해주세요.';
  if (!form.message.trim()) e.message = '문의 내용을 입력해주세요.';
  if (!form.email.trim()) e.email = '답변받을 이메일을 입력해주세요.';
  else if (!EMAIL_RE.test(form.email.trim())) e.email = '올바른 이메일 형식이 아닙니다.';
  if (form.phone && form.phone.replace(/\D/g, '').length < 9) e.phone = '연락처를 정확히 입력해주세요.';
  if (!agree) e.agree = '개인정보 수집·이용에 동의해주세요.';
  return e;
}

const inputBase =
  'w-full px-4 py-2.5 border rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow';

export function EmailInquiryModal({ open, onOpenChange }: EmailInquiryModalProps) {
  const [form, setForm] = useState<InquiryPayload>(EMPTY);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  const reset = () => {
    setForm(EMPTY);
    setAgree(false);
    setErrors({});
    setStatus('idle');
    setSubmitError('');
  };

  const handleOpenChange = (next: boolean) => {
    if (status === 'sending') return; // 전송 중엔 닫히지 않게
    onOpenChange(next);
    if (!next && status === 'done') setTimeout(reset, 200); // 닫힘 애니메이션 후 초기화
  };

  const update = (key: keyof InquiryPayload, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const found = validate(form, agree);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(`inquiry-${first}`)?.focus();
      return;
    }
    setStatus('sending');
    setSubmitError('');
    try {
      await sendInquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setSubmitError(err instanceof Error ? err.message : '전송 중 오류가 발생했습니다.');
    }
  };

  const fieldClass = (key: keyof Errors) =>
    `${inputBase} ${errors[key] ? 'border-red-400 bg-red-50/40' : 'border-gray-300'}`;

  const ErrorText = ({ field }: { field: keyof Errors }) =>
    errors[field] ? (
      <p id={`inquiry-${field}-error`} className="mt-1.5 text-sm text-red-600">
        {errors[field]}
      </p>
    ) : null;

  const a11y = (field: keyof Errors) => ({
    id: `inquiry-${field}`,
    'aria-invalid': !!errors[field],
    'aria-describedby': errors[field] ? `inquiry-${field}-error` : undefined,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        {status === 'done' ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">문의가 작성되었습니다</DialogTitle>
            <DialogDescription className="text-gray-600 leading-relaxed">
              입력하신 이메일 <span className="font-medium text-gray-900">{form.email}</span>로
              <br />
              담당자가 확인 후 답변드리겠습니다.
            </DialogDescription>
            {!EMAIL_SENDING_ENABLED && (
              <p className="mt-4 inline-block rounded-md bg-amber-50 px-3 py-1.5 text-xs text-amber-700">
                테스트 모드: 실제 메일은 발송되지 않았습니다
              </p>
            )}
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="mt-8 w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              닫기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 text-left">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                  <Mail className="h-5 w-5 text-emerald-600" />
                </span>
                <div>
                  <DialogTitle className="text-xl font-bold text-gray-900">이메일 문의</DialogTitle>
                  <DialogDescription className="mt-1 text-sm text-gray-500">
                    내용을 남겨주시면 담당자가 이메일로 답변드립니다.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inquiry-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    작성자
                  </label>
                  <input
                    {...a11y('name')}
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={fieldClass('name')}
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label htmlFor="inquiry-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                    연락처
                  </label>
                  <input
                    {...a11y('phone')}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', formatPhone(e.target.value))}
                    className={fieldClass('phone')}
                    placeholder="010-1234-5678"
                  />
                  <ErrorText field="phone" />
                </div>
              </div>

              <div>
                <label htmlFor="inquiry-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  작성자 이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  {...a11y('email')}
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={fieldClass('email')}
                  placeholder="답변받을 이메일 주소"
                />
                <ErrorText field="email" />
              </div>

              <div>
                <label htmlFor="inquiry-subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                  제목 <span className="text-red-500">*</span>
                </label>
                <input
                  {...a11y('subject')}
                  type="text"
                  maxLength={100}
                  value={form.subject}
                  onChange={(e) => update('subject', e.target.value)}
                  className={fieldClass('subject')}
                  placeholder="문의 제목을 입력해주세요"
                />
                <ErrorText field="subject" />
              </div>

              <div>
                <label htmlFor="inquiry-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                  내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...a11y('message')}
                  rows={6}
                  maxLength={MESSAGE_MAX}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  className={`${fieldClass('message')} resize-none`}
                  placeholder="궁금하신 내용을 자유롭게 작성해주세요"
                />
                <div className="flex justify-between">
                  <ErrorText field="message" />
                  <p className="mt-1.5 ml-auto text-xs text-gray-400">
                    {form.message.length.toLocaleString()} / {MESSAGE_MAX.toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    {...a11y('agree')}
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => {
                      setAgree(e.target.checked);
                      if (errors.agree) setErrors((er) => ({ ...er, agree: undefined }));
                    }}
                    className="mt-0.5 h-4 w-4 accent-emerald-600"
                  />
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">[필수]</span> 문의 답변을 위한 개인정보(이메일, 연락처, 작성자) 수집·이용에
                    동의합니다.
                  </span>
                </label>
                <ErrorText field="agree" />
              </div>

              {status === 'error' && (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {submitError}
                </p>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                disabled={status === 'sending'}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-white transition-colors disabled:opacity-50"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
                {status === 'sending' ? '전송 중...' : '문의 보내기'}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
