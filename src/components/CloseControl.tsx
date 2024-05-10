import CloseIcon from './icons/CloseIcon';

interface CloseControlProps {
  className?: string;
  onClick: () => void;
}

export default function CloseControl({
  className,
  onClick,
}: CloseControlProps) {
  return (
    <button
      className={`
      flex rounded-full fill-on-surface-variant
      p-1 
      transition-colors
      hover:bg-on-surface-variant/hovered-r
      focus:bg-on-surface-variant/focused-r
      active:bg-on-surface-variant/pressed-r
      disabled:bg-transparent disabled:fill-on-surface-variant/disabled-r
      ${className}`}
      onClick={() => onClick()}
    >
      <CloseIcon className="h-full w-full" />
    </button>
  );
}
