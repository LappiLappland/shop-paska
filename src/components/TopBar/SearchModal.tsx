import ModalWindow from '../ModalWindow';
import SearchBar from './SearchBar';

interface SearchModalProps {
  onClosedWindow?: () => void;
  isOpened: boolean;
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchModal({
  isOpened,
  search,
  setSearch,
  onClosedWindow,
}: SearchModalProps) {
  return (
    <ModalWindow
      id="nav-menu"
      bgClassName="flex"
      windowClassName={`
      duration-200
      px-3
      transition-opacity
      opacity-1
      w-full h-20
      flex items-center
      overflow-hidden
      ease-standart-acclerate
      `}
      isOpened={isOpened}
      onClosedWindow={onClosedWindow}
      onBeginClosing={(node, setStyle) => {
        setStyle({
          opacity: '0',
        });
      }}
      onBeginOpening={(node, setStyle) => {
        setStyle({
          opacity: '1',
        });
      }}
    >
      <SearchBar
        id="search-modal"
        isInModal
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch('')}
      />
    </ModalWindow>
  );
}
