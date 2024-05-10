import { ReactNode, createContext, useState } from 'react';
import { ProductFavourite } from '../../types/ProductFavourite';

export interface ProductFavouriteContext {
  favourite: ProductFavourite[];
  setFavourite: (cart: ProductFavourite[]) => void;
  addFavourite: (id: string) => void;
  removeFavourite: (id: string) => void;
  getFavourite: (id: string) => ProductFavourite | null;
  getOverallAmount: () => number;
}

const defaultCart = {
  favourite: [],
  setFavourite: () => null,
  addFavourite: () => null,
  removeFavourite: () => null,
  getFavourite: () => null,
  getOverallAmount: () => 0,
};

export const FavouriteContext =
  createContext<ProductFavouriteContext>(defaultCart);

interface FavouriteProviderProps {
  children?: ReactNode;
}

export default function FavouriteProvider({
  children,
}: FavouriteProviderProps) {
  const [favourite, setFavourite] = useState<ProductFavourite[]>([]);

  function addFavourite(id: string) {
    const fav = favourite.find((e) => e === id);
    if (!fav) {
      setFavourite([...favourite, id]);
    }
  }

  function removeFavourite(id: string) {
    const favIndex = favourite.findIndex((e) => e === id);
    if (favIndex !== -1) {
      setFavourite([
        ...favourite.slice(0, favIndex),
        ...favourite.slice(favIndex + 1),
      ]);
    }
  }

  function getOverallAmount() {
    return favourite.length;
  }

  function getFavourite(id: string) {
    return favourite.find((e) => e === id) || null;
  }

  const cartObject: ProductFavouriteContext = {
    favourite,
    setFavourite: (favourite: ProductFavourite[]) => setFavourite(favourite),
    addFavourite,
    removeFavourite,
    getFavourite,
    getOverallAmount,
  };

  return (
    <FavouriteContext.Provider value={cartObject}>
      {children}
    </FavouriteContext.Provider>
  );
}
