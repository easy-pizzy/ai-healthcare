import { motion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale';

const EASE = [0.22, 1, 0.36, 1] as const; // easeOutQuint 느낌의 부드러운 감속

const hidden: Record<Direction, Record<string, number>> = {
  up: { opacity: 0, y: 60 },
  down: { opacity: 0, y: -60 },
  left: { opacity: 0, x: -80 },
  right: { opacity: 0, x: 80 },
  scale: { opacity: 0, scale: 0.85, y: 30 },
};

const shown = { opacity: 1, x: 0, y: 0, scale: 1 };

const VIEWPORT = { once: true, amount: 0.2 } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
}

/** 화면에 들어올 때 한 번 나타나는 요소 */
export function Reveal({ children, className, direction = 'up', delay = 0, duration = 0.8 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={hidden[direction]}
      whileInView={shown}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

/** 자식 RevealItem들을 순차적으로(계단식) 등장시키는 컨테이너 */
export function RevealGroup({ children, className, stagger = 0.12, delay = 0 }: RevealGroupProps) {
  const variants: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  return (
    <motion.div className={className} variants={variants} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}

export function RevealItem({ children, className, direction = 'up' }: RevealItemProps) {
  const variants: Variants = {
    hidden: hidden[direction],
    shown: { ...shown, transition: { duration: 0.7, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
