import {
  Outlet,
  createFileRoute,
  useRouterState,
} from '@tanstack/react-router';
import ProfileNav from '../components/pages/profile/ProfileNav';
import ProfileNavButton from '../components/pages/profile/ProfileNavButton';
import { stringUpperStart } from '../helpers/string';
import useResize from '../hooks/useResize';

export const Route = createFileRoute('/profile')({
  component: ProfileLayoutComponent,
});

function ProfileLayoutComponent() {
  const breakpoint = useResize();
  const children = useRouterState({ select: (s) => s.location });
  const splitted = children.pathname.split('/');
  const currentChild = splitted[splitted.length - 1];

  if (!currentChild) return null;

  return (
    <div className="grid grow grid-cols-1 md:grid-cols-[max-content_auto] grid-rows-[max-content]">
      <span />

      <h1 className="w-full md:border-b border-outline-variant py-4 text-center text-display-small font-bold text-on-surface">
        {stringUpperStart(currentChild) + ' settings'}
      </h1>
      {breakpoint === 'sm' ? (
        <aside className="border-b border-outline-variant">
          <ProfileNavButton currentPath={currentChild} />
        </aside>
      ) : (
        <aside className="border-r border-t border-outline-variant">
          <ProfileNav selected={currentChild} />
        </aside>
      )}
      <Outlet />
    </div>
  );
}
