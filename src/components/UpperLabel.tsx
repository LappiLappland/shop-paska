interface UpperLabelProps {
  children: string;
  className?: string;
  required?: boolean;
}

export default function UpperLabel({
  children,
  className = '',
  required,
}: UpperLabelProps) {
  if (required) {
    return (
      <span className={'star-required mb-0.5 text-black ' + className}>
        {children}
      </span>
    );
  }

  return <span className={'mb-0.5 text-black ' + className}>{children}</span>;
}
