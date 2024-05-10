interface SearchIconProps {
  className?: string;
}

export default function SearchIcon({ className = '' }: SearchIconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32">
      <circle
        cx="14"
        cy="14"
        r="9"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <line
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        x1="27"
        x2="20.366"
        y1="27"
        y2="20.366"
      />
    </svg>
  );
}
