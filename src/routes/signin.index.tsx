import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import SignInConfirm from '../components/pages/profile/signin/SignInConfirm';
import SignInEmail from '../components/pages/profile/signin/signInEmail';
import SignInPhone from '../components/pages/profile/signin/signInPhone';

export const Route = createFileRoute('/signin/')({
  component: SigninComponent,
});

const enum SignMode {
  'phone' = 0,
  'email' = 1,
  'phoneConfirm' = 2,
}

function SigninComponent() {
  const navigate = useNavigate();
  const [currentMode, setCurrentMode] = useState(SignMode.phone);
  const [phone, setPhone] = useState('');

  let showElement;
  switch (currentMode) {
    case SignMode.phone:
      showElement = (
        <SignInPhone
          onSubmit={(phone: string) => {
            setPhone(phone);
            setCurrentMode(SignMode.phoneConfirm);
          }}
          onSwap={() => setCurrentMode(SignMode.email)}
        />
      );
      break;
    case SignMode.email:
      showElement = (
        <SignInEmail
          onSubmit={() => {
            navigate({ to: '/profile/account' });
          }}
          onSwap={() => setCurrentMode(SignMode.phone)}
        />
      );
      break;
    case SignMode.phoneConfirm:
      showElement = (
        <SignInConfirm
          phone={phone}
          onSubmit={() => {
            navigate({ to: '/profile/account' });
          }}
        />
      );
      break;
    default:
      break;
  }

  return (
    <>
      <div className="my-28 flex flex-col items-center justify-center">
        {showElement}
      </div>
    </>
  );
}
