import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router';
import React, { useContext } from 'react';
import { createRoot } from 'react-dom/client';
import npmPackage from '../package.json';
import CartProvider, { CartContext } from './components/contexts/CartContext';
import FavouriteProvider, { FavouriteContext } from './components/contexts/FavouriteContext';
import UserProvider, { UserContext } from './components/contexts/UserContext';
import { routeTree } from './routeTree.gen';
import './style.css';

const router = createRouter({
  routeTree: routeTree,
  basepath: npmPackage.homepage + '/',
  history: createHashHistory(),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const queryClient = new QueryClient();

async function enableMocking() {
  // if (process.env.NODE_ENV !== 'development') {
  //   return;
  // }

  const { worker } = await import('./mocks/browser');

  return worker.start({
    serviceWorker: {
      url: npmPackage.homepage + '/mockServiceWorker.js',
    },
  });
}

const container = document.getElementById('root');
const root = createRoot(container!);

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CartProvider>
            <FavouriteProvider>
              <Root />
            </FavouriteProvider>
          </CartProvider>
        </UserProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
});

function Root() {

  const cart = useContext(CartContext);
  const favourite = useContext(FavouriteContext);
  const user = useContext(UserContext);

  return (
    <RouterProvider
      router={router}
      context={{cart, favourite, user}}
    />
  )
}