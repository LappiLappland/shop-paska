import { useState } from 'react';
import ButtonToggle from '../../ButtonToggle';
import SettingsIcon from '../../icons/SettingsIcon';
import ProfileNavModal from './ProfileNavModal';

interface ProfileNavButtonProps {
  currentPath: string;
}

export default function ProfileNavButton({
  currentPath,
}: ProfileNavButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ButtonToggle active={showModal} onClick={() => setShowModal(true)}>
        <SettingsIcon className="h-10 w-10" />
      </ButtonToggle>
      <ProfileNavModal
        isOpened={showModal}
        onClosedWindow={() => setShowModal(false)}
        closeWindow={() => setShowModal(false)}
        currentPath={currentPath}
      />
    </>
  );
}
