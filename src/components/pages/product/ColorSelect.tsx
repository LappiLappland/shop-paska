import { ProductColorType } from '../../../types/ProductColor';

interface ColorSelectProps {
  colors: ProductColorType[];
  curColor: string;
  setCurColor: (color: string) => void;
}

export default function ColorSelect({
  colors,
  curColor,
  setCurColor,
}: ColorSelectProps) {
  const itemsEl = colors.map((e) => {
    return (
      <ColorItem
        key={e.id}
        color={e}
        onClick={() => setCurColor(e.id)}
        selected={curColor === e.id}
      />
    );
  });

  return (
    <div className="mb-2">
      <ul className="mb-2 flex gap-3.5">{itemsEl}</ul>
      <span>
        <span className="mr-2 text-label-large text-on-surface-variant">
          Color:
        </span>
        <span>{colors.find((e) => e.id === curColor)?.name}</span>
      </span>
    </div>
  );
}

interface ColorItemProps {
  color: ProductColorType;
  selected: boolean;
  onClick: () => void;
}

function ColorItem({ color, selected, onClick }: ColorItemProps) {
  return (
    <li className="form-color-select relative">
      <input
        className="sr-only"
        type="radio"
        id={'cp-' + color.hex}
        name="cp"
        checked={selected}
        onChange={() => onClick()}
        data-testid="color-select"
      />
      <label
        className="block h-6 w-6 cursor-pointer rounded-full"
        htmlFor={'cp-' + color.hex}
        style={{ backgroundColor: '#' + color.hex }}
      />
      <span className="absolute -left-1.5 -top-1.5 -z-10 h-9 w-9 rounded-full border-primary/hovered" />
    </li>
  );
}
