import { ProductPropertyType } from '../../../types/ProductProperty';
import ProductProperty from './ProductProperty';

interface FullPropertiesListProps {
  properties: ProductPropertyType[];
}

export default function PropertiesList({
  properties,
}: FullPropertiesListProps) {
  const itemsEl = properties.map((e) => {
    return (
      <ProductProperty
        className="mb-2 w-1/2"
        key={e.name}
        type={e.name}
        value={e.value}
      />
    );
  });

  return (
    <div className="mb-5">
      <h1 className="mb-2.5 text-4xl">Properties</h1>
      <dl className="flew-row flex flex-wrap">{itemsEl}</dl>
    </div>
  );
}
