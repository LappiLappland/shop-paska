import { useNavigate } from '@tanstack/react-router';
import { useContext, useEffect, useState } from 'react';
import Button from '../../Button';
import ButtonOutlined from '../../ButtonOutlined';
import { CartContext } from '../../contexts/CartContext';
import { FavouriteContext } from '../../contexts/FavouriteContext';
import HeartIcon from '../../icons/HeartIcon';

interface AddButtonProps {
  productId: string;
  size: string;
  color: string;
}

export default function AddButton({ productId, size, color }: AddButtonProps) {
  const { getCart, addCart } = useContext(CartContext);
  const { getFavourite, addFavourite, removeFavourite } =
    useContext(FavouriteContext);

  const navgiate = useNavigate();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(false);
  }, [size, color]);

  const product = getCart(productId, size, color);
  const favourite = getFavourite(productId);

  return (
    <div className="mb-2">
      <div className="flex">
        <Button
          className="mr-2 h-max grow rounded-lg px-16 py-3  text-label-large duration-300"
          color={!product ? 'primary' : 'tertiary'}
          dataTestid="product-add-button"
          onClick={() => {
            if (!product) {
              if (size && color) {
                addCart(productId, size, color);
              } else {
                setShowError(true);
              }
            } else {
              navgiate({ to: '/cart' });
            }
          }}
        >
          {!product ? 'Add to cart' : 'Inside cart'}
        </Button>
        <ButtonOutlined
          className="buy-button group h-12 rounded-lg px-2 py-2"
          rippleClassName="rounded-lg"
          onClick={() =>
            favourite === null
              ? addFavourite(productId)
              : removeFavourite(productId)
          }
        >
          <HeartIcon
            className={`h-full w-full transition-transform ease-emphasized-acclerate group-hover:scale-90 ${favourite !== null ? 'fill-error stroke-error' : 'fill-transparent stroke-on-surface'}`}
          />
        </ButtonOutlined>
      </div>
      {!showError ? (
        ''
      ) : (
        <span className="mb-2 mt-1 block text-red-500">
          You have to choose color and size
        </span>
      )}
    </div>
  );
}
