import { Link } from '@tanstack/react-router';
import { useContext } from 'react';
import ButtonIcon from '../ButtonIcon';
import { CartContext } from '../contexts/CartContext';
import CartIcon from '../icons/CartIcon';

export default function CartButton() {
  const { getOverallAmount } = useContext(CartContext);

  const amount = getOverallAmount();

  return (
    <Link preload="intent" className="relative flex flex-col items-center" to="/cart">
      <ButtonIcon number={amount} dataTestid='nav-cart-button' ariaLabel='Cart page'>
        <CartIcon className="h-full w-full" />
      </ButtonIcon>
    </Link>
  );
}
