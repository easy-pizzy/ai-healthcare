export interface InquiryPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  /** 문의 분류 (구글 폼 문의) */
  category?: string;
  /** 소속 기관 (구글 폼 문의) */
  organization?: string;
}

/** 문의 메일을 받을 회사 이메일 주소 — TODO: 실제 주소로 교체 */
export const COMPANY_EMAIL = 'contact@example.com';

/**
 * 실제 메일 발송 연동 여부.
 * false 인 동안에는 입력 내용만 검증·정리하고 발송하지 않습니다(콘솔에만 출력).
 * EmailJS, Formspree, 자체 API 등을 연결한 뒤 true 로 바꾸세요.
 */
export const EMAIL_SENDING_ENABLED = false;

export async function sendInquiry(payload: InquiryPayload): Promise<void> {
  const mail = {
    to: COMPANY_EMAIL,
    replyTo: payload.email,
    subject: `[스마트 경로당 문의] ${payload.subject}`,
    body: [
      ...(payload.category ? [`문의 분류: ${payload.category}`] : []),
      `작성자: ${payload.name || '(미입력)'}`,
      ...(payload.organization ? [`소속 기관: ${payload.organization}`] : []),
      `이메일: ${payload.email}`,
      `연락처: ${payload.phone || '(미입력)'}`,
      '',
      payload.message,
    ].join('\n'),
  };

  if (!EMAIL_SENDING_ENABLED) {
    // 발송 직전 단계: 여기서 실제 전송 코드를 호출하면 됩니다.
    console.info('[sendInquiry] 테스트 모드 — 실제 발송 안 함', mail);
    await new Promise((r) => setTimeout(r, 600));
    return;
  }

  // TODO: 실제 발송 연동 예시
  // const res = await fetch('/api/inquiry', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(mail),
  // });
  // if (!res.ok) throw new Error('메일 전송에 실패했습니다.');
  throw new Error('메일 발송이 아직 연동되지 않았습니다.');
}
