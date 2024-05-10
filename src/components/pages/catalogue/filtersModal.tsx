import { Sex } from '../../../gql/graphql';
import useResize from '../../../hooks/useResize';
import ModalWindow from '../../ModalWindow';
import FiltersList from './filtersList';

interface FiltersModalProps {
  onClosedWindow?: () => void;
  isOpened: boolean;
  path: string;
  sex: Sex;
}

export default function FiltersModal({
  path,
  sex,
  isOpened,
  onClosedWindow,
}: FiltersModalProps) {
  const breakpoint = useResize();

  return (
    <ModalWindow
      id="sizes-chart"
      bgClassName="flex"
      windowClassName={`
      origin-left duration-300 scale-x-[0.01]
      ${breakpoint === 'sm' ? 'w-full' : ''}
      max-h-screen 
      bg-surface-container-high
      shadow-level-3
      py-10 px-6
      rounded
      `}
      addButton
      isOpened={isOpened}
      onClosedWindow={onClosedWindow}
      onBeginClosing={(node, setStyle) => {
        setStyle({
          transform: 'scaleX(0)',
        });
      }}
      onBeginOpening={(node, setStyle) => {
        setStyle({
          transform: 'scaleX(1)',
        });
      }}
    >
      <FiltersList path={path} sex={sex} />
    </ModalWindow>
  );
}
