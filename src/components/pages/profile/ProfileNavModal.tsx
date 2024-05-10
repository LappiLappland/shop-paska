import ModalWindow from '../../ModalWindow';
import ProfileNav from './ProfileNav';

interface ProfileNavModalProps {
  onClosedWindow?: () => void;
  closeWindow: () => void;
  isOpened: boolean;
  currentPath: string;
}

export default function ProfileNavModal({
  currentPath,
  isOpened,
  closeWindow,
  onClosedWindow,
}: ProfileNavModalProps) {
  return (
    <ModalWindow
      id="profile-nav"
      bgClassName="flex"
      windowClassName={`
      origin-left duration-300 scale-x-[0.01]
      w-full
      max-h-screen 
      bg-surface-container-high
      shadow-level-3
      py-12 px-6
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
      <ProfileNav selected={currentPath} extraCallback={() => closeWindow()} />
    </ModalWindow>
  );
}
