import { ReactNode, useRef } from 'react';
import useRipple from '../../hooks/useRipple';
import TickIcon from '../icons/TickIcon';

interface CheckBoxProps {
  className?: string;
  id: string;
  text: string;
  error?: string;
  extraElement?: ReactNode;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckBox({
  className = '',
  text,
  error = '',
  extraElement,
  id,
  checked,
  onChange,
}: CheckBoxProps) {
  const containerEl = useRef<HTMLSpanElement>(null);
  const labelEl = useRef<HTMLLabelElement>(null);

  const ripple = useRipple(containerEl, {
    clickRef: labelEl,
    static: true,
    color: 'bg-primary/pressed',
    diameter: 10,
  });

  return (
    <div className={`group ${className}`}>
      <label
        className="flex cursor-pointer items-center"
        htmlFor={id}
        ref={labelEl}
      >
        <span
          ref={containerEl}
          className={`
				relative flex items-center justify-center p-2
				`}
        >
          <input
            className="invisible absolute h-full w-full"
            type="checkbox"
            onChange={onChange}
            id={id}
          />
          <span
            className={`h-4 w-4 border-2
						${checked ? 'border-primary bg-primary' : 'border-on-surface-variant'}
					`}
          >
            <TickIcon
              className={`
							h-3 w-3 fill-on-primary
							${checked ? 'visible' : 'invisible'}
							`}
            />
          </span>
          <span
            className={`
						absolute h-full w-full rounded-full
						${checked ? 'group-hover:bg-primary/hovered-r' : 'group-hover:bg-primary/focused-r'}
						`}
          >
            {ripple}
          </span>
        </span>
        {extraElement}
        <span>{text}</span>
      </label>
      {!error ? '' : <span className="mt-1 text-red-500">{error}</span>}
    </div>
  );
}
