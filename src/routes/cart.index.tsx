import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import request from 'graphql-request';
import { useContext } from 'react';
import { queryClient } from '..';
import { CartContext } from '../components/contexts/CartContext';
import CartItem from '../components/pages/cart/CartItem';
import OrderContainer from '../components/pages/cart/OrderContainer';
import { getDiscounted } from '../helpers/getDiscounted';
import getProductsCartQuery from '../queries/getCartProducts';

export const Route = createFileRoute('/cart/')({
  component: CartComponent,
  loader: (context) => {
    const cart = context.context.cart?.cart ?? [];
    queryClient.prefetchQuery({
      queryKey: ['cart', 'products', cart.map(e => {return {color: e.color, id: e.id, size: e.size}})],
      queryFn: async () =>
        request('http://localhost:8080/', getProductsCartQuery, {
          products: cart,
        }),
    })
  }
});

function CartComponent() {
  const { cart, addCart, removeCart, getOverallAmount } =
    useContext(CartContext);

  const { data, isSuccess } = useQuery({
    queryKey: ['cart', 'products', cart.map(e => {return {color: e.color, id: e.id, size: e.size}})],
    queryFn: async () =>
      request('http://localhost:8080/', getProductsCartQuery, {
        products: cart,
      }),
    placeholderData: keepPreviousData,
  });

  const wasFailure = !isSuccess;

  //TODO: unite all iterators for better perfomance

  const mappedCart = wasFailure
    ? []
    : data!.productsCart
        .map((e) => {
          const insideCart = cart.find((inner) => {
            return (
              inner.id === e.product.id &&
              inner.color === e.selectedColor.id &&
              inner.size === e.selectedSize.id
            );
          })!;

          const price = e.product.prices.find(
            (price) =>
              price.colorId === e.selectedColor.id &&
              price.sizeId === e.selectedSize.id,
          ) || {
            price: e.product.price,
            discount: e.product.discount,
          };

          return {
            ...insideCart,
            productFetched: e,
            price,
          };
        })
        .filter((e) => e);

  const itemsEl = mappedCart.map((e) => {
    const insideCart = e;
    const fetchedCart = e.productFetched;
    const product = fetchedCart.product;

    return (
      <li
        className="mb-2 w-full"
        key={[
          product.id,
          fetchedCart.selectedSize.id,
          fetchedCart.selectedColor.id,
        ].join('_')}
      >
        <CartItem
          id={product.id}
          color={fetchedCart.selectedColor.hex}
          size={fetchedCart.selectedSize.value}
          amount={insideCart.amount}
          image={product.gallery[0]}
          brand={product.brand}
          name={product.name}
          price={e.price.price}
          discount={e.price.discount}
          onAdd={() =>
            addCart(insideCart.id, insideCart.size, insideCart.color)
          }
          onRemove={() =>
            removeCart(insideCart.id, insideCart.size, insideCart.color)
          }
          onRemoveFull={() =>
            removeCart(insideCart.id, insideCart.size, insideCart.color, true)
          }
        />
      </li>
    );
  });

  // wconsole.log(mappedCart);

  const priceCalculated = wasFailure
    ? [0, 0]
    : mappedCart.reduce(
        (prev, curr) => {
          return [
            prev[0] + curr.price.price * curr.amount,
            prev[1] +
              getDiscounted(curr.price.price, curr.price.discount) *
                curr.amount,
          ];
        },
        [0, 0],
      );

  return (
    <>
      <h1 className="mb-8 mt-4 text-center text-display-small font-bold antialiased">
        Cart
      </h1>
      {cart.length > 0 ? (
        <div className="mb-3 flex flex-col-reverse items-center justify-center lg:flex-row lg:items-start">
          <ul className="mr-0 w-full grow md:mr-8 lg:w-auto">{itemsEl}</ul>
          <OrderContainer
            productsAmount={getOverallAmount()}
            fullPrice={priceCalculated[0]}
            discountedPrice={priceCalculated[1]}
          />
        </div>
      ) : (
        <div className="mb-6 text-title-large">
          <span>Your cart is empty</span>
        </div>
      )}
    </>
  );
}
