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
      <ButtonToggle className='flex items-center px-2 py-0.5' active={showModal} onClick={() => setShowModal(true)}>
        <SettingsIcon className="h-8 w-8" />
        More settings
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
