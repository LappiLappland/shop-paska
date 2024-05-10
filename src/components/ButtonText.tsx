import { ReactNode, useRef } from 'react';
import useRipple from '../hooks/useRipple';

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  rippleClassName?: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ButtonText({
  children,
  className = '',
  color = 'primary',
  rippleClassName = '',
  type,
  disabled,
  onClick,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function getColors() {
    switch (color) {
      case 'tertiary':
        return `
        text-tertiary fill-tertiary stroke-tertiary
        hover:bg-tertiary/hovered-r
        focus-visible:bg-tertiary/focused-r
        active:bg-tertiary/pressed-r
        `;
      case 'secondary':
        return `
        text-secondary fill-secondary stroke-secondary
        hover:bg-secondary/hovered-r
        focus-visible:bg-secondary/focused-r
        active:bg-secondary/pressed-r
        `;
      default:
        return `
        text-primary fill-primary stroke-primary
        hover:bg-primary/hovered-r
        focus-visible:bg-primary/focused-r
        active:bg-primary/pressed-r
        `;
    }
  }

  const ripple = useRipple(buttonRef, {
    color: 'bg-primary/focused',
    className: rippleClassName,
  });

  return (
    <button
      ref={buttonRef}
      className={`
      relative flex h-10 items-center justify-center
      px-3
      transition-colors
      ${getColors()}
      bg-transparent
      disabled:fill-on-surface disabled:stroke-on-surface disabled:text-on-surface
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
