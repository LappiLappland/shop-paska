interface CloseIconProps {
  className?: string;
}

export default function CardIcon({ className = '' }: CloseIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M26,26H6a3,3,0,0,1-3-3V9A3,3,0,0,1,6,6H26a3,3,0,0,1,3,3V23A3,3,0,0,1,26,26ZM6,8A1,1,0,0,0,5,9V23a1,1,0,0,0,1,1H26a1,1,0,0,0,1-1V9a1,1,0,0,0-1-1Z" />
      <path d="M14,22H8a1,1,0,0,1,0-2h6a1,1,0,0,1,0,2Z" />
      <path d="M28,13H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
    </svg>
  );
}
