import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import logo from '../../assets/img/logo.svg';
import useResize from '../../hooks/useResize';
import CartButton from './CartButton';
import FavouriteButton from './FavouriteButton';
import NavDesktop from './NavDesktop';
import NavMenuButton from './NavMenuButton';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';
import SearchButton from './SearchButton';

export default function TopBar() {
  const [search, setSearch] = useState('');
  const breakpoint = useResize();

  return (
    <header className="flex h-20 items-center justify-between bg-surface-container py-2 px-2 md:px-11">
      <div className="mr-0 flex grow justify-between md:mr-4">
        <Link className="mr-5 flex items-end md:mr-4" to="/" data-testid="nav-logo">
          <img className="h-14 md:h-16" src={logo} height={64} alt="" />
          <span className="hidden md:inline text-headline-small ml-1 my-auto md:text-headline-large">
            DrillDrip
          </span>
        </Link>
        <nav className="mx-0 flex grow items-center justify-start md:mx-3 lg:justify-between">
          {breakpoint === 'sm' || breakpoint === 'md' ? (
            <NavMenuButton />
          ) : (
            <NavDesktop />
          )}
          {breakpoint === 'sm' || breakpoint === 'md' ? (
            <SearchButton search={search} setSearch={(v) => setSearch(v)} />
          ) : (
            <SearchBar
              className="grow"
              id="main-search-bar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch('')}
            />
          )}
        </nav>
      </div>
      <div className="flex h-full items-center gap-2 md:gap-6 lg:gap-8">
        <FavouriteButton />
        <CartButton />
        <ProfileButton />
      </div>
    </header>
  );
}
