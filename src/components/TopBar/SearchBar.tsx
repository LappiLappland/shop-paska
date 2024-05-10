import CloseIcon from '../icons/CloseIcon';
import SearchIcon from '../icons/SearchIcon';

interface SearchInputProps {
  className?: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  isInModal?: boolean;
}

export default function SearchBar({
  className,
  id,
  value,
  onChange,
  onClear,
  isInModal = false,
}: SearchInputProps) {
  return (
    <label
      className={`
      flex items-center
      ${!isInModal ? 'h-14 ring-1' : 'h-16 w-full ring-2'}
      cursor-pointer
      rounded-xl
      bg-surface-container-highest
      text-on-surface
      ring-outline
      transition-all
      duration-50
      ease-standart-acclerate
      hover:ring-2 has-[:focus]:bg-surface-container-highest
      has-[:focus]:ring-2
      ${className}`}
    >
      <SearchIcon className="mx-4 h-6 w-6 fill-on-surface-variant stroke-on-surface-variant" />
      <input
        className="w-full bg-transparent text-body-large text-on-surface caret-primary outline-none placeholder:text-on-surface-variant"
        type="search"
        id={id}
        value={value}
        onChange={onChange}
      />
      <button
        className={`${value ? 'visible' : 'invisible'}`}
        onClick={onClear}
      >
        <CloseIcon className="mx-4 h-4 w-4 fill-on-surface-variant hover:fill-on-surface" />
      </button>
    </label>
  );
}
