import { useState } from 'react';
import ButtonToggle from '../ButtonToggle';
import SearchIcon from '../icons/SearchIcon';
import SearchModal from './SearchModal';

interface SearchButtonProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchButton({ search, setSearch }: SearchButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ButtonToggle
        className="rounded-lg"
        rippleClassName="rounded-lg"
        active={showModal}
        onClick={() => setShowModal(true)}
      >
        <SearchIcon className="h-9 w-9 stroke-on-surface p-1 group-hover:stroke-primary" />
      </ButtonToggle>
      <SearchModal
        isOpened={showModal}
        onClosedWindow={() => setShowModal(false)}
        search={search}
        setSearch={setSearch}
      />
    </>
  );
}
