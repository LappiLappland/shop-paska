import FormInputText from '../forms/InputText';

interface PricesProps {
  from: number | null;
  to: number | null;
  onChange: (which: 'from' | 'to', value: number | null) => void;
}

export default function Prices({ from, to, onChange }: PricesProps) {
  function changeHandler(which: 'from' | 'to', value: string) {
    onChange(which, value !== '' ? +value : null);
  }

  return (
    <div className="flex gap-1">
      <PricesInput
        type="From"
        value={from ? from + '' : ''}
        onChange={(text) => changeHandler('from', text)}
      />
      <PricesInput
        type="To"
        value={to ? to + '' : ''}
        onChange={(text) => changeHandler('to', text)}
      />
    </div>
  );
}

interface PricesInputProps {
  type: 'From' | 'To';
  value: string;
  onChange: (text: string) => void;
}

function PricesInput({ type, value, onChange }: PricesInputProps) {
  return (
    <div className="mb-3 flex grow basis-1/2">
      <FormInputText
        className="w-full"
        id={'filter' + type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={type}
      />
    </div>
  );
}
