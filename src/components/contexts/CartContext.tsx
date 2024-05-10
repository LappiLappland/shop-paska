import { ReactNode, createContext, useState } from 'react';
import { ProductCart } from '../../types/ProductCart';

export interface ProductCartContext {
  cart: ProductCart[];
  setCart: (cart: ProductCart[]) => void;
  addCart: (id: string, size: string, color: string) => void;
  removeCart: (id: string, size: string, color: string, full?: boolean) => void;
  getCart: (id: string, size: string, color: string) => ProductCart | null;
  getOverallAmount: () => number;
}

const defaultCart = {
  cart: [],
  setCart: () => null,
  addCart: () => null,
  removeCart: () => null,
  getCart: () => null,
  getOverallAmount: () => 0,
};

export const CartContext = createContext<ProductCartContext>(defaultCart);

interface CartProviderProps {
  children?: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<ProductCart[]>([]);

  function equalCart(
    obj: ProductCart,
    id: string,
    size: string,
    color: string,
  ) {
    return obj.id === id && obj.size === size && obj.color === color;
  }

  function addCart(id: string, size: string, color: string) {
    const productIndex = cart.findIndex((e) => equalCart(e, id, size, color));
    if (productIndex !== -1) {
      const clone = [...cart];
      clone[productIndex].amount++;
      setCart(clone);
    } else {
      setCart([
        ...cart,
        {
          id,
          size,
          color,
          amount: 1,
        },
      ]);
    }
  }

  function removeCart(id: string, size: string, color: string, full = false) {
    const productIndex = cart.findIndex((e) => equalCart(e, id, size, color));
    if (productIndex !== -1) {
      cart[productIndex].amount--;
      if (cart[productIndex].amount <= 0 || full) {
        setCart([
          ...cart.slice(0, productIndex),
          ...cart.slice(productIndex + 1),
        ]);
      } else {
        setCart([...cart]);
      }
    }
  }

  function getOverallAmount() {
    return cart.reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);
  }

  function getCart(id: string, size: string, color: string) {
    return cart.find((e) => equalCart(e, id, size, color)) || null;
  }

  const cartObject: ProductCartContext = {
    cart,
    setCart: (cart: ProductCart[]) => setCart(cart),
    addCart,
    removeCart,
    getCart,
    getOverallAmount,
  };

  return (
    <CartContext.Provider value={cartObject}>{children}</CartContext.Provider>
  );
}
