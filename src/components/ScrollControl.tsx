import { useRef } from 'react';
import useRipple from '../hooks/useRipple';
import ArrowIcon from './icons/ArrowIcon';

interface ScrollControlProps {
  className?: string;
  direction?: 'left' | 'right';
  position?: 'absolute' | 'relative';
  colors?: 'primary' | 'secondary';
  onClick: () => void;
}

export default function ScrollControl({
  className = '',
  direction = 'left',
  position = 'relative',
  colors = 'primary',
  onClick,
}: ScrollControlProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const ripple = useRipple(buttonRef, {
    color: 'bg-primary/focused',
    className: 'rounded-full',
  });

  const colorsClassname = colors === 'primary' ? `
    fill-on-surface-variant
    hover:bg-on-surface-variant/hovered-r
    focus-visible:bg-on-surface-variant/focused-r
    active:bg-on-surface-variant/pressed-r
    disabled:bg-transparent disabled:fill-on-surface-variant/disabled-r
  ` : `
    bg-surface-container-low
    fill-on-surface
    hover:bg-surface-container-high/hovered
    focus-visible:bg-surface-container-high/focused
    active:bg-surface-container-high/pressed
  `;

  return (
    <button
      className={`
      flex h-min rounded-full p-1 ${position}
      transition-colors
      ${colorsClassname}
      ${className}
      `}
      aria-label={"Scroll to the " + direction}
      onClick={() => onClick()}
      ref={buttonRef}
    >
      <ArrowIcon direction={direction} />
      {ripple}
    </button>
  );
}
