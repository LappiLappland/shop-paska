interface InformationIconProps {
  className?: string;
}

export default function InformationIcon({ className }: InformationIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M64,32A32,32,0,1,0,32,64,32,32,0,0,0,64,32Zm-5.57,0A26.43,26.43,0,1,1,32,5.57,26.45,26.45,0,0,1,58.43,32Z" />
      <rect height="6.96" width="6.96" x="28.52" y="12.19" />
      <polygon points="35.48 44.39 35.48 30.85 35.48 23.89 28.88 23.89 25.65 23.89 25.65 30.85 28.88 30.85 28.88 44.39 25.65 44.39 25.65 51.35 28.88 51.35 35.48 51.35 38.35 51.35 38.35 44.39 35.48 44.39" />
    </svg>
  );
}
