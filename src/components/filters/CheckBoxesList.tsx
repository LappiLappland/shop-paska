import { useState } from 'react';
import { CheckBoxOption } from '../../types/CheckBoxOption';
import CheckBox from '../forms/CheckBox';

interface CheckBoxesListProps {
  id: string;
  options: CheckBoxOption[];
  states: boolean[];
  maxLimit?: number;
  onChange: (id: number, checked: boolean) => void;
}

export default function CheckBoxesList({
  id,
  options,
  states,
  maxLimit = 4,
  onChange,
}: CheckBoxesListProps) {
  const [isOpened, setIsOpened] = useState(false);

  const optionsMapped = options.map((e, i) => {
    return {
      option: e,
      stateId: i,
      state: states[i],
    };
  });

  const optionsEl = optionsMapped.sort((a, b) => {
    return +b.state - +a.state;
  }).map((e) => {
    return (
      <li key={e.option.value}>
        <CheckBox
          id={id + '_' + e.option.value}
          text={e.option.name}
          checked={e.state}
          onChange={() => onChange(e.stateId, !e.state)}
        />
      </li>
    );
  });

  return (
    <div className="mb-3">
      <ul className="mb-1 grid grid-cols-2 md:block">
        {isOpened ? optionsEl : optionsEl.slice(0, maxLimit)}
      </ul>
      <button
        className="font-medium text-sky-700 hover:text-sky-500"
        onClick={() => setIsOpened((state) => !state)}
      >
        {isOpened ? 'Hide' : 'Show all'}
      </button>
    </div>
  );
}
