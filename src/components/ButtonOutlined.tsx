import { ReactNode, useRef } from 'react';
import useRipple from '../hooks/useRipple';

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  rippleClassName?: string;
  addPadding?: boolean;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  dataTestid?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ButtonOutlined({
  children,
  className = '',
  rippleClassName = '',
  addPadding = true,
  type,
  disabled,
  dataTestid,
  onClick,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const ripple = useRipple(buttonRef, {
    color: 'bg-primary/focused',
    className: rippleClassName,
  });

  return (
    <button
      ref={buttonRef}
      data-testid={dataTestid}
      className={`
      h-10 ${addPadding ? 'px-3' : ''} hover:bg-border-primary/hovered disabled:text-on-surface-r relative
      flex items-center
      justify-center
      border border-outline bg-transparent fill-primary stroke-primary
      text-primary transition-colors
      hover:bg-primary/hovered-r focus-visible:border-primary/focused
      focus-visible:bg-primary/focused-r
      active:bg-primary/pressed-r disabled:border-on-surface/disabled-r disabled:fill-on-surface/disabled-r disabled:stroke-on-surface/disabled-r
      ${className}`}
      type={type}
      disabled={disabled}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
    >
      {children}
      {ripple}
    </button>
  );
}
