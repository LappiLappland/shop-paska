import MinusIcon from '../../../components/icons/MinusIcon';
import PlusIcon from '../../../components/icons/PlusIcon';
import ButtonOutlined from '../../ButtonOutlined';

interface AmountControlsProps {
  value: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function AmountControls({
  value,
  onAdd,
  onRemove,
}: AmountControlsProps) {
  return (
    <div className="flex h-10 items-center lg:items-start">
      <ButtonOutlined
        className="rounded-button rounded-r-none"
        rippleClassName="rounded-button rounded-r-none"
        onClick={() => onRemove()}
        dataTestid='control-remove'
      >
        <MinusIcon />
      </ButtonOutlined>
      <span
      className="flex h-full w-9 grow items-center justify-center border-y border-outline text-label-large"
      >
        {value}
      </span>
      <ButtonOutlined
        className="rounded-button rounded-l-none"
        rippleClassName="rounded-button rounded-l-none"
        onClick={() => onAdd()}
        dataTestid='control-add'
      >
        <PlusIcon />
      </ButtonOutlined>
    </div>
  );
}
