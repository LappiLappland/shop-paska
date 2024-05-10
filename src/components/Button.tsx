import { ReactNode, useRef } from 'react';
import useRipple from '../hooks/useRipple';

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  rippleClassName?: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  dataTestid?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button({
  children,
  className = '',
  color = 'primary',
  rippleClassName = '',
  type,
  dataTestid,
  disabled,
  onClick,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const ripple = useRipple(buttonRef, {
    color: 'bg-on-primary/focused',
    className: rippleClassName,
  });

  function getColors() {
    switch (color) {
      case 'tertiary':
        return `
        bg-tertiary text-on-tertiary
        hover:bg-tertiary/hovered
        focus-visible:bg-tertiary/focused
        active:bg-tertiary/pressed
        `;
      case 'secondary':
        return `
        bg-secondary text-on-secondary 
        hover:bg-secondary/hovered
        focus-visible:bg-secondary/focused
        active:bg-secondary/pressed
        `;
      default:
        return `
        bg-primary text-on-primary 
        hover:bg-primary/hovered
        focus-visible:bg-primary/focused
        active:bg-primary/pressed
        `;
    }
  }

  return (
    <button
      ref={buttonRef}
      data-testid={dataTestid}
      className={`
      relative flex h-10 items-center justify-center rounded-button
      px-3
      transition-colors
      ${getColors()}
      disabled:bg-on-surface/disabled-r disabled:text-on-surface
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
