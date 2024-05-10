/* eslint-disable react/jsx-closing-tag-location */
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { CheckBoxOption } from '../../types/CheckBoxOption';
import CheckBox from '../forms/CheckBox';
import FormInputText from '../forms/InputText';
import SearchIcon from '../icons/SearchIcon';

const maxLimit = 6;

interface CheckBoxesBigListProps {
  id: string;
  options: CheckBoxOption[];
  states: boolean[];
  onChange: (id: number, checked: boolean) => void;
  AddWrapper?: (value: string) => ReactNode;
  shouldLabelLetter?: boolean;
}

export default function CheckBoxesBigList({
  id,
  options,
  states,
  onChange,
  AddWrapper = () => null,
  shouldLabelLetter = false,
}: CheckBoxesBigListProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [searchText, setSearchText] = useState('');

  const optionsMapped = options.map((e, i) => {
    return {
      option: e,
      stateId: i,
      state: states[i],
    };
  });

  useEffect(() => {
    if (!isOpened) setSearchText('');
  }, [isOpened]);

  const optionsEl = useMemo(
    () => {
      const sorted = [...optionsMapped].sort((a, b) => {
        return +b.state - +a.state;
      });
      return sorted.map((e, i) => {
        return (
          <li key={e.option.value}>
            <CheckBox
              id={id + '_' + e.option.value}
              text={e.option.name}
              checked={e.state}
              extraElement={AddWrapper(e.option.value)}
              onChange={() => onChange(e.stateId, !e.state)}
            />
          </li>
        );
      })
    },
    [options, states],
  );

  const sortedOptionsEl = useMemo(() => {
    if (!shouldLabelLetter) return optionsEl;
    const sortedOptionsEl: ReactNode[] = [];
    let previousLetter = options[0].name[0];
    let currentLetterList: ReactNode[] = [];
    optionsMapped.forEach((option) => {
      if (option.option.name[0] !== previousLetter) {
        sortedOptionsEl.push(
          <div key={previousLetter}>
            <span>{previousLetter}</span>
            <ul className="pl-3">{currentLetterList}</ul>
          </div>,
        );
        previousLetter = option.option.name[0];
        currentLetterList = [];
      }
      currentLetterList.push(
        <li key={option.option.value}>
          <CheckBox
            id={id + '_' + option.option.value}
            text={option.option.name}
            checked={option.state}
            extraElement={AddWrapper(option.option.value)}
            onChange={() => onChange(option.stateId, !option.state)}
          />
        </li>,
      );
    });
    sortedOptionsEl.push(
      <div key={options.length}>
        <span>{previousLetter}</span>
        <ul className="pl-3">{currentLetterList}</ul>
      </div>,
    );
    return sortedOptionsEl;
  }, [options, states]);
  
  const searchingOptionsEl = useMemo(() => {
    if (searchText === '') return [];

    const sortedOptions = optionsMapped.filter((e) =>
      e.option.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    if (!sortedOptions.length) {
      return <span>Nothing was found.</span>;
    }

    return sortedOptions.map((e) => {
      return (
        <li key={e.stateId}>
          <CheckBox
            id={id + '_' + e.option.value}
            text={e.option.name}
            checked={e.state}
            extraElement={AddWrapper(e.option.value)}
            onChange={() => onChange(e.stateId, !e.state)}
          />
        </li>
      );
    });
  }, [shouldLabelLetter, options, states, searchText]);

  return (
    <div className="mb-3">
      {!isOpened ? (
        ''
      ) : (
        <FormInputText
          className="relative w-full mb-1 flex grow border-b border-slate-700 pb-2"
          id="brands"
          label="Search"
          iconLeft={<SearchIcon className="h-4 w-4" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      )}

      <ul className="mb-1 max-h-56 overflow-auto grid grid-cols-2 md:block">
        {!isOpened
          ? optionsEl.slice(0, maxLimit)
          : searchText
            ? searchingOptionsEl
            : sortedOptionsEl}
      </ul>
      <button
        className={`w-full border-slate-700 text-left font-medium text-sky-700 hover:text-sky-500 ${!isOpened ? '' : 'mt-1 border-t pt-2'}`}
        onClick={() => setIsOpened((state) => !state)}
      >
        {isOpened ? 'Hide' : 'Show all'}
      </button>
    </div>
  );
}
