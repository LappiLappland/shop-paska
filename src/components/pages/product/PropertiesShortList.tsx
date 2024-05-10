import { ProductPropertyType } from '../../../types/ProductProperty';
import ProductProperty from './ProductProperty';

interface PropertiesShortListProps {
  className?: string;
  properties: ProductPropertyType[];
}

export default function PropertiesShortList({
  className = '',
  properties,
}: PropertiesShortListProps) {
  const itemsEl = properties.map((e) => {
    return (
      <ProductProperty
        className="mb-2"
        key={e.name}
        type={e.name}
        value={e.value}
      />
    );
  });

  return <ul className={className}>{itemsEl}</ul>;
}
