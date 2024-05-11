import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import request from 'graphql-request';
import { useContext } from 'react';
import BreadCrumbs from '../../components/BreadCrumbs';
import { CartContext } from '../../components/contexts/CartContext';
import CardIcon from '../../components/icons/CardIcon';
import EditIcon from '../../components/icons/EditIcon';
import TruckIcon from '../../components/icons/TruckIcon';
import OrderContainer from '../../components/pages/cart/OrderContainer';
import MethodBlock from '../../components/pages/order/MethodBlock';
import CartBlock from '../../components/pages/order/confirmation/CartBlock';
import { getDiscounted } from '../../helpers/getDiscounted';
import { pageURL } from '../../mocks/browser';
import getProductsCartQuery from '../../queries/getCartProducts';
import { queryClient } from '../..';

export const Route = createFileRoute('/order/confirmation/')({
  component: ConfirmationComponent,
  loader: (match) => {

    queryClient.prefetchQuery({
      queryKey: ['cart', 'products'],
      queryFn: async () =>
        request(pageURL, getProductsCartQuery, {
          products: match.context.cart?.cart ?? [],
        }),
    })
  }
});

function ConfirmationComponent() {
  const { cart, getOverallAmount } = useContext(CartContext);

  const navigate = useNavigate();

  const { data, isSuccess } = useQuery({
    queryKey: ['cart', 'products', cart.map(e => {return {color: e.color, id: e.id, size: e.size}})],
    queryFn: async () =>
      request(pageURL, getProductsCartQuery, {
        products: cart,
      }),
    placeholderData: keepPreviousData,
  });

  const wasFailure = !isSuccess;

  const priceCalculated = wasFailure
    ? [0, 0]
    : cart.reduce(
        (prev, curr, i) => {
          const fetchedCart = data!.productsCart[i]!;
          const product = fetchedCart.product;

          const specialPrice = product.prices.find(
            (price) =>
              price.colorId === curr.color && price.sizeId === curr.size,
          );
          const price = specialPrice ? specialPrice.price : product.price;
          const discount = specialPrice
            ? specialPrice.discount
            : product.discount;

          return [
            prev[0] + price * curr.amount,
            prev[1] + getDiscounted(price, discount) * curr.amount,
          ];
        },
        [0, 0],
      );

  return (
    <div className="flex w-full grow flex-col items-center justify-center">
      <BreadCrumbs
        className="py-2.5"
        links={[
          { name: 'Cart', to: '/cart' },
          { name: 'Delivery', to: '/order/delivery' },
          { name: 'Payment', to: '/order/payment' },
          { name: 'Confirmation', to: '/order/confirmation' },
        ]}
        current={3}
      />
      <div className="mb-8 flex w-3/4 flex-col-reverse mt-0 lg:mt-14 lg:items-start items-center justify-center lg:flex-row">
        <div className="flex w-full grow flex-col border-t px-0 md:px-8 pt-2 lg:w-auto">
          <h2 className="mb-0.5 text-headline-medium font-bold text-on-surface">
            Method of obtaining
          </h2>
          <span className="mb-4 text-title-small text-on-surface-variant">
            Select your location and method of receiving your order
          </span>
          <CartBlock />
          <MethodBlock
            icon={<TruckIcon className="h-full w-full" />}
            iconRight={<EditIcon className="h-6 w-6" />}
            text="Courier delivery"
            extraText="Montignac, 09 March 2024, 10:00-18:00"
            selected={false}
            onClick={() => {navigate({to: '/order/delivery'})}}
          />
          <MethodBlock
            icon={<CardIcon className="h-full w-full" />}
            iconRight={<EditIcon className="h-6 w-6" />}
            text="Payment"
            extraText="Online by card"
            selected={false}
            onClick={() => {navigate({to: '/order/payment'})}}
          />
        </div>
        <div className="border-t pt-4">
          <OrderContainer
            productsAmount={getOverallAmount()}
            fullPrice={priceCalculated[0]}
            discountedPrice={priceCalculated[1]}
          />
        </div>
      </div>
    </div>
  );
}
