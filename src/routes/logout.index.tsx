import { Navigate, createFileRoute } from '@tanstack/react-router';
import { useContext, useEffect } from 'react';
import { UserContext } from '../components/contexts/UserContext';

export const Route = createFileRoute('/logout/')({
  component: LogoutComponent,
});

function LogoutComponent() {
  const { logout } = useContext(UserContext);

  useEffect(() => {
    logout();
  }, []);

  return <Navigate to="/signin" />;
}
