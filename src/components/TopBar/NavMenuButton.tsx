import { useState } from 'react';
import ButtonToggle from '../ButtonToggle';
import MenuIcon from '../icons/MenuIcon';
import NavModal from './NavModal';

export default function NavMenuButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ButtonToggle
        className="mr-3 rounded-lg md:mr-6 ml-0 md:ml-6"
        rippleClassName="rounded-lg"
        active={showModal}
        onClick={() => setShowModal(true)}
      >
        <MenuIcon className="h-9 w-9 p-1" />
      </ButtonToggle>
      <NavModal
        isOpened={showModal}
        closeWindow={() => setShowModal(false)}
        onClosedWindow={() => setShowModal(false)}
      />
    </>
  );
}
