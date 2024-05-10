import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import BottomBar from '../components/BottomBar/BottomBar';
import TopBar from '../components/TopBar/TopBar';
import { ProductCartContext } from '../components/contexts/CartContext';
import { ProductFavouriteContext } from '../components/contexts/FavouriteContext';
import { UserContext } from '../components/contexts/UserContext';

interface RootRouterContext {
  cart?: ProductCartContext,
  favourite?: ProductFavouriteContext,
  user?: UserContext,
}

export const Route = createRootRouteWithContext<RootRouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <>
      <TopBar />
      <main className="grow px-3 md:px-11">
        <Outlet />
      </main>
      <BottomBar />
    </>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex h-72 w-full flex-col items-center justify-center">
      <span className="text-display-large text-on-surface">404</span>
      <span className="text-display-small text-on-surface">
        This page does not exist!
      </span>
    </div>
  );
}
