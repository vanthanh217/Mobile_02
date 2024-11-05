import { createContext, useContext, useState } from "react";

type CartContextType = {
  refreshCart: boolean;
  triggerRefreshCart: () => void;
  userId: number | null;
  setUserId: (id: number | null) => void;
};

const CartContext = createContext<CartContextType>({
  refreshCart: false,
  triggerRefreshCart: () => {},
  userId: null,
  setUserId: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [refreshCart, setRefreshCart] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const triggerRefreshCart = () => {
    setRefreshCart((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{ refreshCart, triggerRefreshCart, userId, setUserId }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
