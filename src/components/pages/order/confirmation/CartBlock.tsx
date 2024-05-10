import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import request from 'graphql-request';
import { useContext } from 'react';
import { CartContext } from '../../../../components/contexts/CartContext';
import CartIcon from '../../../../components/icons/CartIcon';
import EditIcon from '../../../../components/icons/EditIcon';
import imageResolve from '../../../../helpers/imageResolve';
import { pageURL } from '../../../../mocks/browser';
import getProductsCartQuery from '../../../../queries/getCartProducts';
import MethodBlock from '../MethodBlock';

export default function CartBlock() {
  const { getOverallAmount } = useContext(CartContext);

  const navigate = useNavigate();

  return (
    <MethodBlock
      icon={<CartIcon className="h-full w-full" />}
      iconRight={<EditIcon className="h-6 w-6" />}
      text="Cart"
      extraText={`${getOverallAmount()} products`}
      selected={false}
      onClick={() => {navigate({to: '/cart'})}}
      contentBottom={<ContentBottom />}
    />
  );
}

function ContentBottom() {
  const { cart } = useContext(CartContext);

  const { data } = useQuery({
    queryKey: ['cart', 'products'],
    queryFn: async () =>
      request(pageURL, getProductsCartQuery, {
        products: cart,
      }),
  });

  const mappedCart = !data
    ? []
    : data.productsCart
        .map((e) => {
          return cart.find((inner) => {
            return (
              inner.id === e.product.id &&
              inner.color === e.selectedColor.id &&
              inner.size === e.selectedSize.id
            );
          })!;
        })
        .filter((e) => e);

  const itemsEl = mappedCart.map((e, i) => {
    const fetchedCart = data!.productsCart[i]!;
    const product = fetchedCart.product;

    return (
      <ProductShortCard
        key={[e.id, e.color, e.size].join('_')}
        color={fetchedCart.selectedColor.hex}
        size={fetchedCart.selectedSize.value}
        image={product.gallery[0]}
        amount={e.amount}
      />
    );
  });

  return (
    <div className="border-t border-outline-variant py-2">
      <ul className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1">{itemsEl}</ul>
    </div>
  );
}

interface ProductShortCardProps {
  color: string;
  size: string;
  image: string;
  amount: number;
}

function ProductShortCard({
  color,
  size,
  image,
  amount,
}: ProductShortCardProps) {
  return (
    <li>
      <img src={imageResolve(image)} alt="" />
      <div className="flex items-center justify-center">
        <span
          className="block h-4 w-4 rounded-full"
          style={{ backgroundColor: '#' + color }}
        />
        <span className="text-label-large before:mx-1.5 before:content-['•']">
          {size}
        </span>
        <span className="text-label-large before:mx-1.5 before:content-['•']">
          {amount}
        </span>
      </div>
    </li>
  );
}
