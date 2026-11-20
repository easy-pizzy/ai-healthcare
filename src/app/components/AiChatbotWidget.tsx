import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp, Bot, MessageCircleQuestion, RotateCcw, X } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* 문구 · 자주 묻는 질문 — 이 부분만 고치면 챗봇 내용이 바뀝니다          */
/* ------------------------------------------------------------------ */

const BOT_NAME = 'AI 건강도우미';
const GREETING = '안녕하세요! 궁금한 건 언제든지 물어보세요 😊';
const GREETING_SUB = '자주 묻는 질문을 눌러보시거나, 직접 입력해 주세요.';

/** 첫 진입 시 말풍선이 나타나기까지 기다리는 시간(ms) */
const TEASER_DELAY = 1200;

type Faq = { q: string; a: string; keywords: string[] };

const FAQS: Faq[] = [
  {
    q: '스마트 경로당은 어떤 서비스인가요?',
    a: '경로당에 계신 어르신의 건강 상태를 측정·기록하고, 보호자·보건소 직원·관계자가 함께 확인할 수 있는 스마트 헬스케어 통합 관리 시스템이에요.',
    keywords: ['서비스', '무엇', '뭐', '소개', '어떤'],
  },
  {
    q: '어떤 기능을 제공하나요?',
    a: '주요 기능은 다음과 같아요.\n• 실시간 건강 모니터링 (혈압·심박수·활동량)\n• 모바일로 언제 어디서나 확인\n• 데이터 분석 리포트\n• 긴급 알림 시스템\n• 안전한 데이터 관리\n• 보호자·보건소·관계자 통합 관리',
    keywords: ['기능', '할수', '제공'],
  },
  {
    q: '보호자도 어르신 건강 정보를 볼 수 있나요?',
    a: '네, 보호자 계정으로 로그인하면 실시간 건강 데이터 조회, 긴급 알림 수신, 건강 리포트 확인이 가능해요.',
    keywords: ['보호자', '가족', '자녀', '부모'],
  },
  {
    q: '건강에 이상이 생기면 어떻게 알 수 있나요?',
    a: '건강 이상 징후가 감지되면 보호자와 담당자에게 즉시 알림이 전송돼 빠르게 대응할 수 있어요.',
    keywords: ['이상', '긴급', '알림', '위급', '응급'],
  },
  {
    q: '로그인은 어디서 하나요?',
    a: '화면 오른쪽 위의 [로그인] 버튼을 눌러 접속할 수 있어요. 계정 발급이 필요하시면 문의처로 연락해 주세요.',
    keywords: ['로그인', '접속', '계정', '가입', '아이디'],
  },
  {
    q: '개인정보는 안전하게 관리되나요?',
    a: '개인정보 보호법을 준수해 민감한 건강 정보를 안전하게 보호하고 관리하고 있어요.',
    keywords: ['개인정보', '보안', '안전', '정보보호'],
  },
  {
    q: '문의 전화번호와 운영 시간이 궁금해요',
    a: '📞 전화: 055-880-2345\n🕘 운영 시간: 평일 09:00 - 18:00\n📍 위치: 경남 하동군 하동읍 군청로 23',
    keywords: ['전화', '번호', '연락', '시간', '운영', '위치', '주소', '문의'],
  },
];

/** 첫 진입 말풍선에 보여줄 질문 개수 */
const TEASER_FAQ_COUNT = 3;

const FALLBACK =
  '죄송해요, 아직 그 질문에는 답변을 준비하지 못했어요 🙏\n아래 자주 묻는 질문을 확인하시거나, 담당자에게 직접 문의해 주세요.';

/* ------------------------------------------------------------------ */

type Msg = { id: number; from: 'bot' | 'me'; text: string };

let seq = 0;
const nextId = () => ++seq;

/** 입력한 문장과 가장 많이 겹치는 키워드를 가진 질문을 찾습니다 */
function findAnswer(input: string): string {
  const t = input.replace(/\s/g, '');
  const exact = FAQS.find((f) => f.q.replace(/\s/g, '') === t);
  if (exact) return exact.a;
  let best: Faq | null = null;
  let bestScore = 0;
  for (const f of FAQS) {
    const score = f.keywords.filter((k) => t.includes(k)).length;
    if (score > bestScore) {
      best = f;
      bestScore = score;
    }
  }
  return best ? best.a : FALLBACK;
}

/** 이번 방문(브라우저 탭)에서 말풍선을 이미 봤는지 — 저장소가 막혀 있어도 오류 없이 동작 */
const SEEN_KEY = 'ai-chatbot-teaser-seen';
function hasSeenTeaser() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}
function markTeaserSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* 무시 */
  }
}

interface Props {
  /** "다른 방법으로 문의하기"를 눌렀을 때 실행 (예: 문의하기 섹션으로 이동) */
  onContact?: () => void;
}

export function AiChatbotWidget({ onContact }: Props) {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  // 첫 진입 시 말풍선 표시
  useEffect(() => {
    if (hasSeenTeaser()) return;
    const id = window.setTimeout(() => setTeaser(true), TEASER_DELAY);
    return () => window.clearTimeout(id);
  }, []);

  // 언마운트 시 대기 중인 답변 타이머 정리
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  // 새 메시지가 오면 맨 아래로 스크롤
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const dismissTeaser = () => {
    setTeaser(false);
    markTeaserSeen();
  };

  const openChat = () => {
    dismissTeaser();
    setOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 250);
  };

  const ask = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { id: nextId(), from: 'me', text: q }]);
    setInput('');
    setTyping(true);
    const id = window.setTimeout(() => {
      setMessages((m) => [...m, { id: nextId(), from: 'bot', text: findAnswer(q) }]);
      setTyping(false);
    }, 700);
    timers.current.push(id);
  };

  const askFromTeaser = (q: string) => {
    openChat();
    ask(q);
  };

  const reset = () => {
    timers.current.forEach(window.clearTimeout);
    setMessages([]);
    setTyping(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 break-keep">
      {/* ---------- 채팅 창 ---------- */}
      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            role="dialog"
            aria-label={`${BOT_NAME} 채팅`}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'bottom right' }}
            className="w-[calc(100vw-2rem)] sm:w-[380px] h-[min(600px,calc(100dvh-7rem))] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* 헤더 */}
            <header className="flex items-center gap-3 px-4 py-3 bg-emerald-500 text-white">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold leading-tight">{BOT_NAME}</p>
                <p className="text-xs text-emerald-50 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-300" /> 24시간 응답
                </p>
              </div>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  aria-label="대화 처음부터"
                  title="대화 처음부터"
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="채팅 닫기"
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* 대화 영역 */}
            <div ref={listRef} className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 space-y-3" aria-live="polite">
              <BotBubble>
                <p className="font-semibold text-gray-900">{GREETING}</p>
                <p className="mt-1 text-gray-600">{GREETING_SUB}</p>
              </BotBubble>

              <div className="pl-10">
                <p className="text-xs font-medium text-gray-500 mb-2">자주 묻는 질문</p>
                <ul className="flex flex-col gap-2">
                  {FAQS.map((f) => (
                    <li key={f.q}>
                      <button
                        type="button"
                        onClick={() => ask(f.q)}
                        disabled={typing}
                        className="w-full text-left text-sm bg-white border border-emerald-200 text-emerald-800 rounded-xl px-3 py-2 hover:bg-emerald-50 hover:border-emerald-400 transition-colors disabled:opacity-50"
                      >
                        {f.q}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {messages.map((m) =>
                m.from === 'me' ? (
                  <div key={m.id} className="flex justify-end">
                    <p className="max-w-[80%] bg-emerald-500 text-white text-sm rounded-2xl rounded-br-sm px-3 py-2 whitespace-pre-line">
                      {m.text}
                    </p>
                  </div>
                ) : (
                  <BotBubble key={m.id}>
                    <p className="whitespace-pre-line text-gray-800">{m.text}</p>
                    {m.text === FALLBACK && onContact && (
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          onContact();
                        }}
                        className="mt-2 text-sm font-medium text-emerald-700 underline underline-offset-2"
                      >
                        다른 방법으로 문의하기 →
                      </button>
                    )}
                  </BotBubble>
                ),
              )}

              {typing && (
                <BotBubble>
                  <span className="flex gap-1 py-1" aria-label="답변 작성 중">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-gray-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </span>
                </BotBubble>
              )}
            </div>

            {/* 입력창 */}
            <form onSubmit={onSubmit} className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="궁금한 내용을 입력하세요"
                aria-label="질문 입력"
                className="flex-1 min-w-0 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="보내기"
                className="shrink-0 w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors disabled:bg-gray-300"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ---------- 첫 진입 말풍선 ---------- */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.div
            key="teaser"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'bottom right' }}
            className="relative w-[calc(100vw-2rem)] max-w-[300px] bg-white rounded-2xl shadow-xl border border-gray-200 p-4"
          >
            <button
              type="button"
              onClick={dismissTeaser}
              aria-label="안내 닫기"
              className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="font-bold text-gray-900 pr-6">{GREETING}</p>
            <p className="text-xs text-gray-500 mt-1 mb-3">자주 묻는 질문</p>
            <ul className="flex flex-col gap-1.5">
              {FAQS.slice(0, TEASER_FAQ_COUNT).map((f) => (
                <li key={f.q}>
                  <button
                    type="button"
                    onClick={() => askFromTeaser(f.q)}
                    className="w-full text-left text-sm text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg px-3 py-2 transition-colors"
                  >
                    {f.q}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={openChat}
              className="mt-2 w-full text-xs text-gray-500 hover:text-gray-700 py-1"
            >
              질문 더 보기
            </button>
            {/* 꼬리 */}
            <span className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-gray-200 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- 플로팅 버튼 ---------- */}
      <motion.button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label={open ? '챗봇 닫기' : 'AI 챗봇 열기'}
        aria-expanded={open}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center hover:bg-emerald-600 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'x' : 'bot'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X className="w-6 h-6" /> : <MessageCircleQuestion className="w-7 h-7" />}
          </motion.span>
        </AnimatePresence>
        {teaser && !open && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white" aria-hidden />
        )}
      </motion.button>
    </div>
  );
}

function BotBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
        <Bot className="w-4 h-4" />
      </div>
      <div className="max-w-[85%] bg-white border border-gray-200 text-sm rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm">
        {children}
      </div>
    </div>
  );
}
