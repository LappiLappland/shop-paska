import { useNavigate } from '@tanstack/react-router';
import ButtonToggle from '../../ButtonToggle';

interface ProfileNavProps {
  selected: 'account' | 'email' | 'password' | string;
  extraCallback?: () => void;
}

export default function ProfileNav({
  selected,
  extraCallback,
}: ProfileNavProps) {
  return (
    <nav>
      <ul>
        <ProfileNavItem
          selected={selected === 'account'}
          href="/profile/account"
          text="Account settings"
          extraCallback={extraCallback}
        />
        <ProfileNavItem
          selected={selected === 'email'}
          href="/profile/email"
          text="Email settings"
          extraCallback={extraCallback}
        />
        <ProfileNavItem
          selected={selected === 'password'}
          href="/profile/password"
          text="Password settings"
          extraCallback={extraCallback}
        />
        <ProfileNavItem
          selected={false}
          href="/logout"
          text="Log out"
          extraCallback={extraCallback}
        />
      </ul>
    </nav>
  );
}

interface ProfileNavItemProps {
  href: string;
  text: string;
  selected: boolean;
  extraCallback?: () => void;
}

function ProfileNavItem({
  href,
  text,
  selected,
  extraCallback,
}: ProfileNavItemProps) {
  const navigate = useNavigate();

  return (
    <li>
      <ButtonToggle
        className="h-12 w-full px-3 text-body-large"
        active={selected}
        onClick={() => {
          navigate({ to: href });
          if (extraCallback) extraCallback();
        }}
      >
        {text}
      </ButtonToggle>
    </li>
  );
}
