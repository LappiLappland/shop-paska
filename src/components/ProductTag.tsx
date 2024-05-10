import { ProductTagType } from '../types/ProductTag';

interface ProductTagProps {
  type: ProductTagType;
}

export default function ProductTag({ type }: ProductTagProps) {
  let colorBG;
  let colorText;
  let text;
  switch (type) {
    case 'popular':
      colorBG = 'bg-stone-500';
      colorText = 'text-slate-100';
      text = 'Popular';
      break;
    case 'new':
      colorBG = 'bg-slate-500';
      colorText = 'text-white';
      text = 'New';
      break;
    default:
      return <></>;
  }

  return (
    <div
      className={
        'w-min overflow-ellipsis rounded-lg px-1.5 text-xs uppercase leading-5 tracking-wide antialiased ' +
        colorBG +
        ' ' +
        colorText
      }
    >
      {text}
    </div>
  );
}
