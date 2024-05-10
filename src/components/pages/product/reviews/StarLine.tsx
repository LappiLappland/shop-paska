import FillingBar from './FillingBar';

interface StarLineProps {
  text: string;
  value: number;
  limit: number;
}

export default function StarLine({ text, value, limit }: StarLineProps) {
  return (
    <div className="flex h-fit w-full">
      <span className="w-1/6 text-label-large text-on-surface">
        {text + ' stars'}
      </span>
      <span className="mx-2 flex grow items-center">
        <FillingBar filledFor={value / limit} />
      </span>
      <span className="w-1/6 text-label-large text-on-surface">{value}</span>
    </div>
  );
}
