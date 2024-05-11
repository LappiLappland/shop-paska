import { Link } from '@tanstack/react-router';
import { useContext } from 'react';
import ButtonIcon from '../ButtonIcon';
import { FavouriteContext } from '../contexts/FavouriteContext';
import HeartIcon from '../icons/HeartIcon';

export default function FavouriteButton() {
  const { getOverallAmount } = useContext(FavouriteContext);

  const amount = getOverallAmount();

  return (
    <Link
      className="top-bar-button relative flex flex-col items-center"
      to="/favourite"
      preload="intent"
    >
      <ButtonIcon text="" number={amount} ariaLabel='Favourite page'>
        <HeartIcon className="h-full w-full stroke-2" />
      </ButtonIcon>
    </Link>
  );
}
