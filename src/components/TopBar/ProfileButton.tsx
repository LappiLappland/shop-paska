import { Link } from '@tanstack/react-router';
import { useContext } from 'react';
import ButtonIcon from '../ButtonIcon';
import { UserContext } from '../contexts/UserContext';
import ProfileIcon from '../icons/ProfileIcon';

export default function ProfileButton() {
  const { token } = useContext(UserContext);

  return (
    <Link
      className="top-bar-button flex flex-col items-center"
      to={token ? '/profile/account' : '/signin'}
    >
      <ButtonIcon dataTestid="nav-profile-button" ariaLabel='Profile page'>
        <ProfileIcon className="h-full w-full" />
      </ButtonIcon>
    </Link>
  );
}
