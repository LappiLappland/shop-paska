import ModalWindow from '../ModalWindow';
import NavMenu from './NavMenu';

interface NavModalProps {
  onClosedWindow?: () => void;
  closeWindow: () => void;
  isOpened: boolean;
}

export default function NavModal({
  isOpened,
  closeWindow,
  onClosedWindow,
}: NavModalProps) {
  return (
    <ModalWindow
      id="nav-menu"
      bgClassName="flex"
      windowClassName={`
      duration-200
      max-h-0
      w-full h-full
      md:w-auto md:max-w-[50%]
      bg-surface-container-high
      overflow-hidden
      ease-standart-acclerate
      `}
      addButton
      isOpened={isOpened}
      onClosedWindow={onClosedWindow}
      onBeginClosing={(node, setStyle) => {
        setStyle({
          maxHeight: '0',
        });
      }}
      onBeginOpening={(node, setStyle) => {
        setStyle({
          maxHeight: '100%',
        });
      }}
    >
      <NavMenu closeWindow={closeWindow} />
    </ModalWindow>
  );
}
