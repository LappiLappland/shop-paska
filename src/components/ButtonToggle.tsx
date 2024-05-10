import { ReactNode, useRef } from 'react';
import useRipple from '../hooks/useRipple';

interface ButtonToggleProps {
  children?: ReactNode;
  className?: string;
  rippleClassName?: string;
  type?: 'submit' | 'reset' | 'button';
  active?: boolean;
  disabled?: boolean;
  dataTestid?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ButtonToggle({
  children,
  className = '',
  rippleClassName = '',
  type,
  active = false,
  disabled,
  dataTestid,
  onClick,
}: ButtonToggleProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const ripple = useRipple(buttonRef, {
    color: 'bg-primary/focused',
    className: rippleClassName,
  });

  const colorsClassName = !active
    ? `
    border-outline text-on-surface
    hover:bg-secondary/hovered-r
    focus-visible:bg-secondary/focused-r
    active:bg-secondary/pressed-r
  `
    : `
    border-outline 
    text-on-secondary-container fill-on-secondary-container stroke-on-secondary-container
    bg-secondary-container
  `;

  return (
    <button
      ref={buttonRef}
      data-testid={dataTestid}
      className={`
      relative border
      transition-colors
      ${colorsClassName}
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
