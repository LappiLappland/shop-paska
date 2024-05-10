import { ReactNode } from 'react';
import ButtonToggle from '../../ButtonToggle';
import ArrowIcon from '../../icons/ArrowIcon';

interface MethodBlockProps {
  text: string;
  icon: ReactNode;
  iconRight?: ReactNode;
  selected: boolean;
  extraText?: string;
  contentBottom?: ReactNode;
  onClick: () => void;
}

export default function MethodBlock({
  text,
  icon,
  iconRight,
  selected,
  contentBottom,
  extraText = '',
  onClick,
}: MethodBlockProps) {
  return (
    <ButtonToggle
      active={selected}
      className={`mb-3 px-3`}
      rippleClassName="rounded-button"
      onClick={onClick}
    >
      <div className="flex w-full items-center justify-between">
        <div className="mr-5 flex py-4">
          <span className="mr-3 h-8 w-8 self-center">{icon}</span>
          <div className="flex flex-col py-0.5 text-left">
            <span className="text-title-medium font-bold">{text}</span>
            {!extraText ? (
              ''
            ) : (
              <span className="ml-0.5 text-on-surface-variant">
                {extraText}
              </span>
            )}
          </div>
        </div>
        {iconRight ? (
          iconRight
        ) : (
          <ArrowIcon className="h-6 w-6" direction="right" />
        )}
      </div>
      {!contentBottom ? '' : contentBottom}
    </ButtonToggle>
  );
}
