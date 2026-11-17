import { useEffect, useState, Fragment } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface TypewriterLine {
  text: string;
  className?: string;
}

interface TypewriterProps {
  lines: TypewriterLine[];
  /** 한 글자가 나타나는 간격(ms) */
  speed?: number;
  /** 문장이 완성된 뒤 다시 시작하기까지 기다리는 시간(ms) */
  holdMs?: number;
  caretClassName?: string;
}

/**
 * 한 글자씩 타자 치듯 나타나고, 완성 후 holdMs 뒤 처음부터 반복.
 * 아직 안 나온 글자도 visibility:hidden 으로 자리를 차지해 레이아웃이 흔들리지 않음.
 */
export function Typewriter({ lines, speed = 110, holdMs = 3000, caretClassName = 'bg-emerald-500' }: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const total = lines.reduce((n, l) => n + [...l.text].length, 0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setCount(total);
      return;
    }
    const timer = setTimeout(
      () => setCount((c) => (c < total ? c + 1 : 0)),
      count < total ? speed : holdMs,
    );
    return () => clearTimeout(timer);
  }, [count, total, speed, holdMs, reduceMotion]);

  const caret = (
    <span aria-hidden className="relative inline-block w-0 h-[1em] align-[-0.12em]">
      <motion.span
        className={`absolute inset-y-0 left-[2px] w-[3px] rounded-full ${caretClassName}`}
        animate={{ opacity: count < total ? 1 : [1, 1, 0, 0] }}
        transition={count < total ? { duration: 0 } : { duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      />
    </span>
  );

  let index = 0;
  return (
    <span aria-hidden>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          <span className={line.className}>
            {[...line.text].map((ch, ci) => {
              const i = index++;
              return (
                <Fragment key={ci}>
                  {!reduceMotion && i === count && caret}
                  <span style={{ visibility: i < count ? 'visible' : 'hidden' }}>{ch}</span>
                </Fragment>
              );
            })}
            {!reduceMotion && li === lines.length - 1 && count === total && caret}
          </span>
        </Fragment>
      ))}
    </span>
  );
}
