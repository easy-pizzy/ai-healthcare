import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AlertCircle, Check, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import { sendInquiry, EMAIL_SENDING_ENABLED } from '../lib/sendInquiry';

/* 구글 폼 스타일 토큰 */
const PURPLE = '#673ab7';
const C = {
  bg: 'bg-[#f0ebf8]',
  purpleText: 'text-[#673ab7]',
  purpleBg: 'bg-[#673ab7]',
  purpleBorder: 'border-[#673ab7]',
  error: 'text-[#d93025]',
  errorBorder: 'border-[#d93025]',
  card: 'bg-white rounded-lg border border-[#dadce0]',
  text: 'text-[#202124]',
  sub: 'text-[#5f6368]',
};

export const INQUIRY_CATEGORIES = ['도입문의', '가격문의', '제휴문의', '광고문의'] as const;
const OTHER = '기타';

interface FormState {
  email: string;
  category: string;
  otherText: string;
  name: string;
  organization: string;
  phone: string;
  message: string;
  agree: boolean;
}

const EMPTY: FormState = {
  email: '',
  category: '',
  otherText: '',
  name: '',
  organization: '',
  phone: '',
  message: '',
  agree: false,
};

type Field = keyof FormState;
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED = '필수 질문입니다.';

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.email.trim()) e.email = REQUIRED;
  else if (!EMAIL_RE.test(f.email.trim())) e.email = '올바른 이메일 주소를 입력하세요.';
  if (!f.category) e.category = REQUIRED;
  else if (f.category === OTHER && !f.otherText.trim()) e.category = '기타 항목의 내용을 입력하세요.';
  if (!f.name.trim()) e.name = REQUIRED;
  if (f.phone && f.phone.replace(/\D/g, '').length < 9) e.phone = '올바른 연락처를 입력하세요.';
  if (!f.message.trim()) e.message = REQUIRED;
  if (!f.agree) e.agree = REQUIRED;
  return e;
}

/* ---------- 구글 폼 UI 조각 ---------- */

function QuestionCard({
  id,
  title,
  required,
  description,
  error,
  children,
}: {
  id: string;
  title: string;
  required?: boolean;
  description?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div
      id={`gf-card-${id}`}
      className={`${C.card} p-6 transition-colors ${error ? `${C.errorBorder}` : ''}`}
      role="group"
      aria-labelledby={`gf-title-${id}`}
    >
      <div id={`gf-title-${id}`} className={`text-base ${C.text} leading-6`}>
        {title}
        {required && <span className={`${C.error} ml-1`} aria-hidden>*</span>}
      </div>
      {description && <p className={`mt-1 text-xs ${C.sub} leading-5`}>{description}</p>}
      <div className="mt-4">{children}</div>
      {error && (
        <p id={`gf-err-${id}`} className={`mt-3 flex items-center gap-2 text-xs ${C.error}`} role="alert">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/** 밑줄형 입력: 포커스 시 보라색 밑줄이 가운데서 양옆으로 펼쳐짐 */
function UnderlineInput({
  id,
  value,
  onChange,
  placeholder = '내 답변',
  error,
  type = 'text',
  className = 'sm:w-1/2',
  ...rest
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: boolean;
  type?: string;
  className?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'numeric' | 'tel';
  'aria-label'?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <input
        id={`gf-${id}`}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={error}
        aria-describedby={error ? `gf-err-${id}` : undefined}
        className={`peer w-full bg-transparent border-0 border-b ${error ? C.errorBorder : 'border-[#e0e0e0]'} px-0 pt-1 pb-2 text-sm ${C.text} placeholder:text-[#70757a] focus:outline-none`}
        {...rest}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute left-0 right-0 bottom-0 h-0.5 origin-center scale-x-0 transition-transform duration-300 peer-focus:scale-x-100 ${error ? 'bg-[#d93025]' : C.purpleBg}`}
      />
    </div>
  );
}

function AutoTextarea({
  id,
  value,
  onChange,
  error,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="relative">
      <textarea
        ref={ref}
        id={`gf-${id}`}
        rows={1}
        value={value}
        maxLength={2000}
        onChange={(e) => {
          onChange(e.target.value);
          const el = ref.current;
          if (el) {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
          }
        }}
        placeholder="내 답변"
        aria-invalid={error}
        aria-describedby={error ? `gf-err-${id}` : undefined}
        className={`peer block w-full resize-none overflow-hidden bg-transparent border-0 border-b ${error ? C.errorBorder : 'border-[#e0e0e0]'} px-0 pt-1 pb-2 text-sm leading-6 ${C.text} placeholder:text-[#70757a] focus:outline-none`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute left-0 right-0 bottom-0 h-0.5 origin-center scale-x-0 transition-transform duration-300 peer-focus:scale-x-100 ${error ? 'bg-[#d93025]' : C.purpleBg}`}
      />
    </div>
  );
}

function RadioDot({ checked }: { checked: boolean }) {
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors group-hover:bg-[#673ab7]/[0.06] group-has-[:focus-visible]:bg-[#673ab7]/[0.12]">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${checked ? C.purpleBorder : 'border-[#5f6368]'}`}
      >
        <span className={`h-2.5 w-2.5 rounded-full ${C.purpleBg} transition-transform duration-150 ${checked ? 'scale-100' : 'scale-0'}`} />
      </span>
    </span>
  );
}

function CheckBox({ checked }: { checked: boolean }) {
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors group-hover:bg-[#673ab7]/[0.06] group-has-[:focus-visible]:bg-[#673ab7]/[0.12]">
      <span
        className={`flex h-[18px] w-[18px] items-center justify-center rounded-[2px] border-2 transition-colors ${checked ? `${C.purpleBorder} ${C.purpleBg}` : 'border-[#5f6368]'}`}
      >
        {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
      </span>
    </span>
  );
}

/* ---------- 모달 ---------- */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GoogleFormInquiryModal({ open, onOpenChange }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);

  const set = <K extends Field>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setStatus('idle');
    setSubmitError('');
    setConfirmClear(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (status === 'sending') return;
    onOpenChange(next);
    if (!next && status === 'done') setTimeout(reset, 200);
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const found = validate(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`gf-card-${first}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const category = form.category === OTHER ? `기타: ${form.otherText.trim()}` : form.category;
    setStatus('sending');
    setSubmitError('');
    try {
      await sendInquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        organization: form.organization.trim(),
        category,
        subject: `[${category}] ${form.name.trim()}님 문의`,
        message: form.message.trim(),
      });
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setSubmitError(err instanceof Error ? err.message : '제출 중 오류가 발생했습니다.');
    }
  };

  const headerCard = (children: ReactNode) => (
    <div className={`${C.card} overflow-hidden`}>
      <div className="h-2.5" style={{ backgroundColor: PURPLE }} />
      <div className="px-6 pt-5 pb-6">{children}</div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={`${C.bg} sm:max-w-[700px] max-h-[92vh] overflow-y-auto p-0 gap-0 border-0 [&>button:last-child]:top-6 [&>button:last-child]:right-6 [&>button:last-child]:z-10`}
      >
        <div className="mx-auto w-full max-w-[640px] px-3 py-3 sm:py-6 space-y-3">
          {status === 'done' ? (
            headerCard(
              <>
                <DialogTitle className={`text-[32px] leading-10 font-normal ${C.text} pr-8`}>
                  스마트 경로당 문의하기
                </DialogTitle>
                <DialogDescription className={`mt-4 text-sm ${C.text}`}>
                  응답이 기록되었습니다. 담당자가 확인 후 입력하신 이메일로 연락드리겠습니다.
                </DialogDescription>
                {!EMAIL_SENDING_ENABLED && (
                  <p className="mt-3 inline-block rounded bg-amber-50 px-2.5 py-1 text-xs text-amber-700">
                    테스트 모드: 실제로 전송되지 않았습니다
                  </p>
                )}
                <button
                  type="button"
                  onClick={reset}
                  className={`mt-6 block text-sm ${C.purpleText} underline underline-offset-2 hover:no-underline`}
                >
                  다른 응답 제출
                </button>
              </>,
            )
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-3">
              {headerCard(
                <>
                  <DialogTitle className={`text-[32px] leading-10 font-normal ${C.text} pr-8`}>
                    스마트 경로당 문의하기
                  </DialogTitle>
                  <DialogDescription className={`mt-3 text-sm leading-5 ${C.text} whitespace-pre-line`}>
                    {'하동군 스마트 경로당 헬스케어 시스템에 대한 문의를 남겨주세요.\n영업일 기준 1~2일 내에 담당자가 연락드립니다.'}
                  </DialogDescription>
                  <div className="mt-5 -mx-6 border-t border-[#dadce0]" />
                  <p className={`mt-4 text-sm ${C.error}`}>* 표시는 필수 질문임</p>
                </>,
              )}

              <QuestionCard id="email" title="이메일" required error={errors.email}>
                <UnderlineInput
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="내 이메일"
                  aria-label="이메일"
                  value={form.email}
                  onChange={(v) => set('email', v)}
                  error={!!errors.email}
                />
              </QuestionCard>

              <QuestionCard id="category" title="문의 분류" required error={errors.category}>
                <div role="radiogroup" aria-labelledby="gf-title-category" className="-ml-2.5">
                  {[...INQUIRY_CATEGORIES, OTHER].map((opt) => {
                    const checked = form.category === opt;
                    return (
                      <label key={opt} className="group flex items-center cursor-pointer min-h-12">
                        <input
                          type="radio"
                          name="gf-category"
                          value={opt}
                          checked={checked}
                          onChange={() => set('category', opt)}
                          className="sr-only"
                        />
                        <RadioDot checked={checked} />
                        {opt === OTHER ? (
                          <span className="flex flex-1 items-center gap-3 pl-2">
                            <span className={`text-sm ${C.text}`}>기타:</span>
                            <UnderlineInput
                              id="other"
                              placeholder=""
                              aria-label="기타 문의 분류 입력"
                              className="flex-1 max-w-sm"
                              value={form.otherText}
                              onChange={(v) => {
                                setForm((f) => ({ ...f, otherText: v, category: OTHER }));
                                if (errors.category) setErrors((e) => ({ ...e, category: undefined }));
                              }}
                            />
                          </span>
                        ) : (
                          <span className={`pl-2 text-sm ${C.text}`}>{opt}</span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </QuestionCard>

              <QuestionCard id="name" title="이름" required error={errors.name}>
                <UnderlineInput
                  id="name"
                  autoComplete="name"
                  aria-label="이름"
                  value={form.name}
                  onChange={(v) => set('name', v)}
                  error={!!errors.name}
                />
              </QuestionCard>

              <QuestionCard id="organization" title="소속 기관 / 회사명">
                <UnderlineInput
                  id="organization"
                  autoComplete="organization"
                  aria-label="소속 기관 / 회사명"
                  value={form.organization}
                  onChange={(v) => set('organization', v)}
                />
              </QuestionCard>

              <QuestionCard id="phone" title="연락처" description="예: 010-1234-5678" error={errors.phone}>
                <UnderlineInput
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-label="연락처"
                  value={form.phone}
                  onChange={(v) => set('phone', v.replace(/[^\d-]/g, '').slice(0, 13))}
                  error={!!errors.phone}
                />
              </QuestionCard>

              <QuestionCard id="message" title="문의 내용" required error={errors.message}>
                <AutoTextarea id="message" value={form.message} onChange={(v) => set('message', v)} error={!!errors.message} />
              </QuestionCard>

              <QuestionCard
                id="agree"
                title="개인정보 수집 및 이용 동의"
                required
                description="수집 항목: 이메일, 이름, 소속, 연락처 · 이용 목적: 문의 답변 · 보유 기간: 문의 처리 후 1년"
                error={errors.agree}
              >
                <label className="group -ml-2.5 flex items-center cursor-pointer min-h-12">
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => set('agree', e.target.checked)}
                    className="sr-only"
                  />
                  <CheckBox checked={form.agree} />
                  <span className={`pl-2 text-sm ${C.text}`}>동의합니다</span>
                </label>
              </QuestionCard>

              {status === 'error' && (
                <p role="alert" className={`${C.card} ${C.errorBorder} px-6 py-4 text-sm ${C.error}`}>
                  {submitError}
                </p>
              )}

              <div className="flex items-center justify-between pt-1 pb-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`${C.purpleBg} flex items-center gap-2 rounded px-6 h-9 text-sm font-medium text-white shadow-sm transition-shadow hover:shadow-md hover:bg-[#5e35b1] disabled:opacity-70 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#673ab7]/30`}
                >
                  {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
                  제출
                </button>

                {confirmClear ? (
                  <div className="flex items-center gap-1 text-sm">
                    <span className={`${C.sub} mr-1 hidden sm:inline`}>모든 응답을 지울까요?</span>
                    <button
                      type="button"
                      onClick={() => setConfirmClear(false)}
                      className={`rounded px-3 h-9 font-medium ${C.sub} hover:bg-black/5`}
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={reset}
                      className={`rounded px-3 h-9 font-medium ${C.purpleText} hover:bg-[#673ab7]/[0.06]`}
                    >
                      양식 지우기
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmClear(true)}
                    className={`rounded px-3 h-9 text-sm font-medium ${C.purpleText} hover:bg-[#673ab7]/[0.06]`}
                  >
                    양식 지우기
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
