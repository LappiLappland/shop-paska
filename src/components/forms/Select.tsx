import { useCallback, useEffect, useRef, useState } from 'react';
import TickIcon from '../icons/TickIcon';

export interface FormSelectOption {
  text: string;
  value: string;
}

interface FormSelectProps {
  className?: string;
  id: string;
  options: FormSelectOption[];
  required?: boolean;
  selected?: string;
  error?: string;
  label?: string;
  onChange?: (option: string) => void;
}

export default function FormSelect({
  id,
  className = '',
  options,
  required,
  selected,
  label,
  error,
  onChange,
}: FormSelectProps) {
  const [isOpened, setIsOpened] = useState(false);

  const moveLabel = isOpened || selected !== '';
  const currentOption = options.find((e) => e.value === selected)?.text;

  const mainContainerEl = useRef<HTMLDivElement>(null);
  const closeHandler = useCallback((e: MouseEvent) => {
    if (
      e.target &&
      !mainContainerEl.current!.contains(e.target as HTMLElement)
    ) {
      setIsOpened(false);
    }
  }, []);

  useEffect(() => {
    if (!closeHandler) return;

    if (isOpened) {
      document.addEventListener('click', closeHandler);
    } else {
      document.removeEventListener('click', closeHandler);
    }

    return () => {
      document.removeEventListener('click', closeHandler);
    };
  }, [isOpened, closeHandler]);

  const optionsEl = options.map((e) => {
    return (
      <FormSelectItem
        key={e.value}
        name={e.text}
        selected={selected === e.value}
        onClick={() => {
          if (isOpened) {
            setIsOpened(false);
            if (onChange) onChange(e.value);
          }
        }}
      />
    );
  });

  return (
    <div>
      <div className={`group relative ${className}`} id={id}>
        <label
          className={`absolute left-0 top-0
          origin-top-left
          ${
            error
              ? 'text-error group-hover:text-on-error-container'
              : `
            text-body-large text-on-surface-variant
            group-hover:text-on-surface
            group-has-[:focus]:text-primary
          `
          }
          ${required ? 'star-required' : ''}
          ease-acclerate duration-200
          ${moveLabel ? 'translate-x-[14px] translate-y-0 text-body-medium' : `translate-x-[14px] translate-y-[20px]`}
          `}
          htmlFor={id}
        >
          {label}
        </label>
        <div ref={mainContainerEl}>
          <button
            className={`peer w-full
            bg-transparent px-4 pb-2.5
            pt-5 text-left text-body-large
            text-on-surface
            outline-none
            ${currentOption ? '' : 'opacity-0'}
            `}
            type="button"
            onClick={() => setIsOpened((state) => !state)}
          >
            {currentOption || label}
          </button>
          <ul
            className={`
          absolute z-10 mt-0.5 
          w-full 
          origin-top 
          rounded-bl-md
          rounded-br-md bg-surface-container-high
          shadow-level-1
          transition-appear
          ease-standart-acclerate
          ${isOpened ? 'pointer-events-auto scale-100 opacity-100 duration-150' : 'duration-250 pointer-events-none scale-50 opacity-0'}
          `}
          >
            {optionsEl}
          </ul>
          <fieldset
            className={`
            transition-d pointer-events-none absolute
            inset-0
            h-full w-full
            border
            pl-2.5
            ${
              error
                ? 'border-error group-hover:border-on-error-container'
                : `
            border-outline
            group-hover:border-on-surface
            peer-focus:border-primary
            `
            }
            peer-focus:border-2 
          `}
          >
            <legend
              className={`
            invisible whitespace-nowrap text-body-medium
            ${required ? 'star-required' : ''}
            ${moveLabel ? 'max-w-full px-1 duration-100' : 'max-w-0 delay-50 duration-50'}
            `}
            >
              {label}
            </legend>
          </fieldset>
        </div>
      </div>
      {!error ? (
        ''
      ) : (
        <span className="px-4 text-body-small text-error">{error}</span>
      )}
    </div>
  );
}

interface FormSelectItemProps {
  className?: string;
  name: string;
  selected: boolean;
  onClick: () => void;
}

function FormSelectItem({
  className = '',
  name,
  selected,
  onClick,
}: FormSelectItemProps) {
  return (
    <li
      className={`
      flex cursor-pointer 
      justify-between border-t 
      border-outline-variant
      px-2 py-1.5 
      text-body-large text-on-surface
      first:rounded-t-lg
      first:border-t-0
      last:rounded-b-lg 
      hover:bg-primary/hovered-r 
      ${className}`}
      onClick={() => onClick()}
      aria-selected={selected ? 'true' : 'false'}
    >
      <span>{name}</span>
      {!selected ? '' : <TickIcon className="h-5 w-5 fill-primary" />}
    </li>
  );
}
