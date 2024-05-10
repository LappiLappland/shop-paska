interface FillingBarProps {
  filledFor: number;
}

export default function FillingBar({ filledFor }: FillingBarProps) {
  return (
    <div className="relative h-1/3 w-full rounded-2xl bg-outline-variant">
      <div
        className="absolute h-full rounded-2xl bg-amber-400"
        style={{ width: Math.round(filledFor * 100) + '%' }}
      />
    </div>
  );
}
