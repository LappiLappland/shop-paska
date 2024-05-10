import { ReactNode, useState } from 'react';

interface FormInputText {
  className?: string;
  inputClassName?: string;
  id: string;
  placeholder?: string;
  value: string;
  required?: boolean;
  min?: number;
  max?: number;
  type?: 'text' | 'numeric' | 'date' | 'password' | 'email' | 'phone';
  inputmode?: 'text' | 'numeric';
  error?: string;
  label?: string;
  iconLeft?: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

export default function FormInputText({
  className = '',
  inputClassName = '',
  id,
  placeholder = '',
  value,
  required = false,
  min,
  max,
  type = 'text',
  inputmode,
  error = '',
  onChange,
  onBlur,
  label = '',
  iconLeft,
}: FormInputText) {
  const [focused, setFocused] = useState(false);

  let inputType: string = type;
  switch (type) {
    case 'phone':
      inputType = 'tel';
      break;
    case 'numeric':
      inputType = 'text';
      break;
    default:
      break;
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let newValue = e.currentTarget.value;
    switch (type) {
      case 'phone':
        //Obviously this is not how it should work in reality
        if (!/^\+?\d*$/.test(newValue)) {
          newValue = value;
        }
        break;
      case 'numeric':
        if (!/^\d*$/.test(newValue)) {
          newValue = value;
        }
        break;
      default:
        break;
    }
    e.currentTarget.value = newValue;
    onChange(e);
  }

  const moveLabel = focused || value;

  const labelOffsetX = iconLeft ? 'translate-x-[46px]' : 'translate-x-[14px]';

  return (
    <div className={`${className}`}>
      <div className={`group relative w-full`}>
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
          ${moveLabel ? 'translate-x-[14px] translate-y-0 text-body-medium' : `${labelOffsetX} translate-y-[20px]`}
          `}
          htmlFor={id}
        >
          {label}
        </label>
        <div className="relative flex justify-center rounded">
          {!iconLeft ? (
            ''
          ) : (
            <div className="ml-3 stroke-on-surface-variant pt-6 group-hover:stroke-on-surface group-has-[:focus]:stroke-primary">
              {iconLeft}
            </div>
          )}
          <input
            className={`peer w-full
            bg-transparent px-4 pb-2.5
            pt-5 text-body-large text-on-surface
            caret-primary
            outline-none
            ${inputClassName}`}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={changeHandler}
            onBlur={onBlur}
            required={required}
            type={inputType}
            inputMode={inputmode}
            minLength={min}
            maxLength={max}
            onFocus={() => setFocused(true)}
            onBlurCapture={() => setFocused(false)}
          />
          <fieldset
            className={`
            transition-d pointer-events-none absolute
            h-full
            w-full border
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
