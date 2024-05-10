interface ProductProperty {
  className?: string;
  type: string;
  value: string;
}

export default function ProductProperty({
  type,
  value,
  className = '',
}: ProductProperty) {
  return (
    <div className={`${className} relative flex justify-between`}>
      <dt className="text-on-surface-variant">{type}</dt>
      <span className="relative bottom-1 mx-0.5 grow border-b border-dotted border-gray-500" />
      <dd className="w-1/2">{value}</dd>
    </div>
  );
}
