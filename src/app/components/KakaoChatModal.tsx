import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent, type ReactNode } from 'react';
import { ArrowUp, Camera, ChevronLeft, Heart, Image as ImageIcon, Menu, Plus, Smile, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';

/* 카카오톡 대화방 스타일 토큰 */
const K = {
  roomBg: 'bg-[#b2c7d9]',
  yellow: '#fee500',
  meta: 'text-[#556677]',
  unread: 'text-[#f5d400]',
};

const ROOM_NAME = '하동군 스마트 경로당 상담';
const BOT_NAME = '스마트 경로당 상담봇';
const CATEGORIES = ['도입문의', '가격문의', '제휴문의', '광고문의', '기타'];
const EMOJIS = ['😀', '😂', '🥰', '😊', '😉', '😮', '😢', '😭', '😡', '👍', '👏', '🙏', '💪', '🙇', '❤️', '🎉', '🔥', '✨', '👀', '✅', '⭐', '☕', '🌷', '🍀'];

type Msg =
  | { id: number; kind: 'text'; from: 'me' | 'bot'; text: string; at: Date; read: boolean }
  | { id: number; kind: 'image'; from: 'me' | 'bot'; src: string; at: Date; read: boolean }
  | { id: number; kind: 'system'; text: string; at: Date };

let seq = 0;
const nextId = () => ++seq;

const fmtTime = (d: Date) => d.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit' });
const fmtDate = (d: Date) =>
  d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
const sameMinute = (a: Date, b: Date) => Math.floor(a.getTime() / 60000) === Math.floor(b.getTime() / 60000);
const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

/** 키워드 기반 자동 응답 */
function botReply(text: string): { lines: string[]; quick?: string[] } {
  const t = text.replace(/\s/g, '');
  if (/도입|설치|신청/.test(t))
    return {
      lines: [
        '도입 문의 감사합니다 😊',
        '스마트 경로당 시스템은 경로당별 건강측정 기기 설치 + 관리 포털 제공으로 구성됩니다.\n\n도입을 원하시는 경로당 수와 지역을 알려주시면 담당자가 맞춤 안내를 드릴게요.',
      ],
      quick: ['가격문의', '상담원 연결'],
    };
  if (/가격|비용|견적|요금/.test(t))
    return {
      lines: [
        '가격은 경로당 수와 설치 기기 구성에 따라 달라져요.',
        '정확한 견적을 위해 아래 정보를 남겨주세요.\n• 경로당 수\n• 필요한 측정 항목(혈압, 혈당, 체성분 등)\n• 연락받으실 번호',
      ],
      quick: ['도입문의', '상담원 연결'],
    };
  if (/제휴|협력|파트너/.test(t))
    return {
      lines: ['제휴 제안 환영합니다 🤝', '기관/회사명과 제휴 내용을 간단히 적어주시면 담당 부서로 전달해 드릴게요.'],
      quick: ['상담원 연결'],
    };
  if (/광고|홍보|배너/.test(t))
    return {
      lines: ['광고 문의는 담당 부서 검토 후 회신드리고 있어요.', '광고 매체, 기간, 예산을 알려주시면 빠르게 안내해 드릴게요.'],
      quick: ['상담원 연결'],
    };
  if (/상담원|사람|연결/.test(t))
    return {
      lines: ['상담원 연결을 요청했어요 🙋', '운영시간(평일 09:00~18:00) 내 순서대로 답변드립니다.\n급한 문의는 055-880-2345로 전화 주세요.'],
    };
  if (/기타/.test(t)) return { lines: ['궁금하신 내용을 자유롭게 입력해 주세요 ✍️'] };
  if (/안녕|하이|hello|hi/i.test(t)) return { lines: ['안녕하세요! 무엇을 도와드릴까요?'], quick: CATEGORIES };
  if (/감사|고마/.test(t)) return { lines: ['도움이 되었다니 기뻐요 😊 언제든 다시 문의해 주세요!'] };
  return {
    lines: ['메시지 잘 받았어요! 담당자가 확인 후 이 채팅방에서 답변드릴게요.', '문의 유형을 선택하시면 더 빠르게 안내해 드릴 수 있어요.'],
    quick: CATEGORIES,
  };
}

/* ---------- 말풍선 ---------- */

function Avatar() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-[15px] bg-emerald-500 shrink-0">
      <Heart className="h-5 w-5 text-white" fill="white" />
    </div>
  );
}

function Bubble({ from, tail, children, image }: { from: 'me' | 'bot'; tail: boolean; children: ReactNode; image?: boolean }) {
  if (image) return <div className="overflow-hidden rounded-xl">{children}</div>;
  const mine = from === 'me';
  return (
    <div
      className={[
        'relative px-3 py-2 text-[14px] leading-[1.45] text-[#191919] whitespace-pre-wrap break-words rounded-[14px]',
        mine ? 'bg-[#fee500]' : 'bg-white',
        tail && mine &&
          "rounded-tr-[4px] before:absolute before:top-0 before:-right-[6px] before:border-t-[10px] before:border-t-[#fee500] before:border-r-[8px] before:border-r-transparent before:content-['']",
        tail && !mine &&
          "rounded-tl-[4px] before:absolute before:top-0 before:-left-[6px] before:border-t-[10px] before:border-t-white before:border-l-[8px] before:border-l-transparent before:content-['']",
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

function Meta({ time, unread, align }: { time?: string; unread?: boolean; align: 'left' | 'right' }) {
  if (!time && !unread) return null;
  return (
    <div className={`flex flex-col shrink-0 pb-0.5 ${align === 'right' ? 'items-end' : 'items-start'}`}>
      {unread && <span className={`text-[11px] font-bold leading-none ${K.unread}`}>1</span>}
      {time && <span className={`mt-0.5 text-[10px] leading-none whitespace-nowrap ${K.meta}`}>{time}</span>}
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex gap-2 px-3">
      <div className="w-10" />
      <div className="flex items-center gap-1 rounded-[14px] bg-white px-3.5 py-3" aria-label="상대방이 입력 중">
        {[0, 150, 300].map((d) => (
          <span key={d} className="h-1.5 w-1.5 rounded-full bg-[#9aa5b1] animate-bounce" style={{ animationDelay: `${d}ms` }} />
        ))}
      </div>
    </div>
  );
}

/* ---------- 모달 ---------- */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KakaoChatModal({ open, onOpenChange }: Props) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [quick, setQuick] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState('');
  const [panel, setPanel] = useState<'none' | 'plus' | 'emoji'>('none');
  const [menuOpen, setMenuOpen] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const albumRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);
  const started = useRef(false);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  /** 상대가 읽고 → 입력 중 → 답장하는 흐름 */
  const runBot = (lines: string[], quickReplies?: string[]) => {
    setQuick([]);
    later(() => setMessages((ms) => ms.map((m) => (m.kind !== 'system' && m.from === 'me' ? { ...m, read: true } : m))), 500);
    let delay = 900;
    lines.forEach((line, i) => {
      later(() => setTyping(true), delay);
      delay += Math.min(600 + line.length * 18, 1800);
      later(() => {
        setTyping(false);
        setMessages((ms) => [...ms, { id: nextId(), kind: 'text', from: 'bot', text: line, at: new Date(), read: true }]);
        if (i === lines.length - 1 && quickReplies) setQuick(quickReplies);
      }, delay);
      delay += 250;
    });
  };

  // 처음 열 때 입장 메시지 + 인사
  useEffect(() => {
    if (!open || started.current) return;
    started.current = true;
    setMessages([{ id: nextId(), kind: 'system', text: '상담 채팅방에 입장했습니다.', at: new Date() }]);
    runBot(
      ['안녕하세요! 하동군 스마트 경로당 상담 채팅방입니다 😊', '문의하실 내용을 선택하거나 메시지를 입력해 주세요.\n(운영시간: 평일 09:00~18:00)'],
      CATEGORIES,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // 새 메시지·입력 중 표시 시 맨 아래로
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, quick, open]);

  const resizeInput = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`; // 최대 4줄
  };

  const send = (raw: string) => {
    const value = raw.trim();
    if (!value) return;
    setMessages((ms) => [...ms, { id: nextId(), kind: 'text', from: 'me', text: value, at: new Date(), read: false }]);
    setText('');
    requestAnimationFrame(resizeInput);
    const r = botReply(value);
    runBot(r.lines, r.quick);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // 한글 조합 중 Enter 는 무시 (중복 전송 방지)
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(text);
    }
  };

  const onPickImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      setMessages((ms) => [...ms, { id: nextId(), kind: 'image', from: 'me', src: String(reader.result), at: new Date(), read: false }]);
      setPanel('none');
      runBot(['사진 잘 받았어요 📷 담당자가 확인 후 답변드릴게요.']);
    };
    reader.readAsDataURL(file);
  };

  const clearChat = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTyping(false);
    setMenuOpen(false);
    setMessages([{ id: nextId(), kind: 'system', text: '대화 내용을 삭제했습니다.', at: new Date() }]);
    setQuick(CATEGORIES);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${K.roomBg} p-0 gap-0 border-0 overflow-hidden rounded-[20px] sm:max-w-[400px] h-[min(720px,88vh)] flex flex-col [&>button:last-child]:hidden`}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        {/* 헤더 */}
        <header className="relative flex items-center gap-1 px-2 h-14 shrink-0">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5"
            aria-label="채팅방 닫기"
          >
            <ChevronLeft className="h-6 w-6 text-[#191919]" />
          </button>
          <DialogTitle className="flex-1 min-w-0 flex items-baseline gap-1.5 text-[16px] font-bold text-[#191919]">
            <span className="truncate">{ROOM_NAME}</span>
            <span className="text-[14px] font-normal text-[#4a5967]">2</span>
          </DialogTitle>
          <DialogDescription className="sr-only">스마트 경로당 상담 채팅방</DialogDescription>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5"
            aria-label="채팅방 메뉴"
            aria-expanded={menuOpen}
          >
            <Menu className="h-5 w-5 text-[#191919]" />
          </button>
          {menuOpen && (
            <div className="absolute right-3 top-12 z-20 w-44 overflow-hidden rounded-lg bg-white py-1 shadow-lg">
              <button
                type="button"
                onClick={clearChat}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-[#191919] hover:bg-gray-50"
              >
                <Trash2 className="h-4 w-4 text-gray-500" />
                대화 내용 지우기
              </button>
            </div>
          )}
        </header>

        {/* 메시지 목록 */}
        <div
          ref={listRef}
          role="log"
          aria-live="polite"
          className="flex-1 overflow-y-auto pb-3 space-y-1"
          onClick={() => {
            setMenuOpen(false);
          }}
        >
          {messages.map((m, i) => {
            const prev = messages[i - 1];
            const next = messages[i + 1];
            const dateDivider = !prev || !sameDay(prev.at, m.at);

            const divider = dateDivider && (
              <div className="flex justify-center py-3">
                <span className="rounded-full bg-black/15 px-3.5 py-1 text-[12px] text-white">{fmtDate(m.at)}</span>
              </div>
            );

            if (m.kind === 'system') {
              return (
                <div key={m.id}>
                  {divider}
                  <div className="flex justify-center py-1.5">
                    <span className="rounded-full bg-black/10 px-3 py-1 text-[12px] text-[#3c4a57]">{m.text}</span>
                  </div>
                </div>
              );
            }

            const groupedWithPrev =
              prev && prev.kind !== 'system' && prev.from === m.from && sameMinute(prev.at, m.at) && !dateDivider;
            const groupedWithNext = next && next.kind !== 'system' && next.from === m.from && sameMinute(next.at, m.at);
            const time = groupedWithNext ? undefined : fmtTime(m.at);
            const tail = !groupedWithPrev;
            const content =
              m.kind === 'image' ? (
                <img src={m.src} alt="보낸 사진" className="block max-h-60 max-w-[200px] object-cover" />
              ) : (
                m.text
              );

            if (m.from === 'me') {
              return (
                <div key={m.id}>
                  {divider}
                  <div className={`flex justify-end items-end gap-1 px-3 pr-4 ${tail ? 'pt-1.5' : ''}`}>
                    <Meta time={time} unread={!m.read} align="right" />
                    <div className="max-w-[70%]">
                      <Bubble from="me" tail={tail} image={m.kind === 'image'}>
                        {content}
                      </Bubble>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={m.id}>
                {divider}
                <div className={`flex gap-2 px-3 ${tail ? 'pt-1.5' : ''}`}>
                  <div className="w-10 shrink-0">{tail && <Avatar />}</div>
                  <div className="min-w-0 flex-1 pl-1">
                    {tail && <p className="mb-1 text-[12px] text-[#4a5967]">{BOT_NAME}</p>}
                    <div className="flex items-end gap-1">
                      <div className="max-w-[75%]">
                        <Bubble from="bot" tail={tail} image={m.kind === 'image'}>
                          {content}
                        </Bubble>
                      </div>
                      <Meta time={time} align="left" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {typing && <TypingBubble />}

          {/* 빠른 답장 */}
          {quick.length > 0 && !typing && (
            <div className="flex gap-1.5 overflow-x-auto px-3 pl-[60px] pt-2 pb-1 [scrollbar-width:none]">
              {quick.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="shrink-0 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-[13px] text-[#191919] shadow-sm hover:bg-[#fffbe0] active:bg-[#fff6b3]"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 입력창 */}
        <div className="shrink-0 bg-white">
          <div className="flex items-end gap-1 px-2 py-2">
            <button
              type="button"
              onClick={() => setPanel((p) => (p === 'plus' ? 'none' : 'plus'))}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#4d4d4d] hover:bg-gray-100"
              aria-label={panel === 'plus' ? '메뉴 닫기' : '더보기'}
              aria-expanded={panel === 'plus'}
            >
              <Plus className={`h-6 w-6 transition-transform duration-200 ${panel === 'plus' ? 'rotate-45' : ''}`} />
            </button>

            <div className="flex flex-1 items-end rounded-[20px] bg-[#f3f3f3] pl-3.5 pr-1">
              <textarea
                ref={inputRef}
                rows={1}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  resizeInput();
                }}
                onKeyDown={onKeyDown}
                onFocus={() => setPanel('none')}
                placeholder="메시지 입력"
                aria-label="메시지 입력"
                className="flex-1 resize-none bg-transparent py-2 text-[14px] leading-5 text-[#191919] placeholder:text-[#a0a0a0] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setPanel((p) => (p === 'emoji' ? 'none' : 'emoji'))}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-black/5 ${panel === 'emoji' ? 'text-[#191919]' : 'text-[#7a7a7a]'}`}
                aria-label="이모티콘"
                aria-expanded={panel === 'emoji'}
              >
                <Smile className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => send(text)}
              disabled={!text.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors disabled:bg-[#f3f3f3] disabled:text-[#c4c4c4] bg-[#fee500] text-[#191919]"
              aria-label="전송"
            >
              <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>

          {/* + 패널 */}
          {panel === 'plus' && (
            <div className="grid grid-cols-4 gap-y-4 border-t border-gray-100 px-4 py-5">
              {[
                { label: '앨범', icon: ImageIcon, color: 'bg-[#7ed36c]', onClick: () => albumRef.current?.click() },
                { label: '카메라', icon: Camera, color: 'bg-[#5fb3f6]', onClick: () => cameraRef.current?.click() },
              ].map(({ label, icon: Icon, color, onClick }) => (
                <button key={label} type="button" onClick={onClick} className="flex flex-col items-center gap-1.5">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-[18px] ${color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </span>
                  <span className="text-[12px] text-[#4d4d4d]">{label}</span>
                </button>
              ))}
            </div>
          )}

          {/* 이모지 패널 */}
          {panel === 'emoji' && (
            <div className="grid grid-cols-8 gap-1 border-t border-gray-100 px-3 py-3">
              {EMOJIS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => {
                    setText((t) => t + em);
                    requestAnimationFrame(resizeInput);
                  }}
                  className="flex h-10 items-center justify-center rounded-lg text-2xl hover:bg-gray-100"
                  aria-label={`이모지 ${em}`}
                >
                  {em}
                </button>
              ))}
            </div>
          )}

          <input ref={albumRef} type="file" accept="image/*" className="hidden" onChange={onPickImage} />
          <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onPickImage} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
