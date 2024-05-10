import { ReactNode, useRef } from 'react';
import useRipple from '../hooks/useRipple';

interface ButtonIconProps {
  children: ReactNode;
  text?: string;
  number?: number;
  size?: 'normal' | 'small';
  dataTestid?: string;
  ariaLabel?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ButtonIcon({
  children,
  text,
  number,
  size = 'normal',
  dataTestid,
  ariaLabel,
  onClick,
}: ButtonIconProps) {
  const containerEl = useRef<HTMLSpanElement>(null);
  const clickedEl = useRef<HTMLDivElement>(null);

  const shownNumber =
    !number || number < 1000
      ? number + ''
      : number.toString().slice(0, 3) + '+';

  const ripple = useRipple(containerEl, {
    clickRef: clickedEl,
    color: 'bg-primary/pressed',
    className: 'rounded-full',
  });

  const sizeClass =
    size === 'normal'
      ? ['w-10 h-10 md:w-12 md:h-12', 'w-6 h-6 md:w-8 md:h-8']
      : ['w-8 h-8', 'w-6 h-6'];

  return (
    <button
      className="group flex flex-col items-center justify-center"
      onClick={onClick}
      data-testid={dataTestid}
      aria-label={ariaLabel}
    >
      <div
        className={`relative ${sizeClass[0]} flex items-center justify-center`}
        ref={clickedEl}
      >
        <div
          className={`flex items-center justify-center ${sizeClass[1]} fill-on-surface-variant stroke-on-surface-variant group-hover:fill-primary group-hover:stroke-primary group-active:fill-primary/pressed group-active:stroke-primary/pressed`}
        >
          {children}
        </div>
        <span
          className={`
          absolute h-full w-full rounded-full
          group-hover:bg-primary/hovered-r
          group-active:bg-primary/pressed-r
          `}
          ref={containerEl}
        >
          {ripple}
        </span>
        <span
          className={`
        absolute -right-1.5 -top-1.5
        flex h-5 origin-center items-center justify-center rounded-full bg-error
        px-1.5 text-body-small
        font-medium
        text-on-error
        transition-transform
        duration-100
        ease-standart-acclerate
        ${number ? 'scale-100 text-on-error' : 'scale-0 text-on-error/0 delay-50'}
        `}
        >
          {shownNumber}
        </span>
      </div>
      <span className="text-label-large text-on-surface-variant group-hover:text-on-surface">
        {text}
      </span>
    </button>
  );
}
