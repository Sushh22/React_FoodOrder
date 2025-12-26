import { createContext, useState } from "react";

const UserCartProgressContext = createContext({
  progress: "", // 'cart', 'checkout',
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserCartProgressContextProvider({ children }) {
  const [cartProgress, setCartProgress] = useState("");

  function showCart() {
    setCartProgress("cart");
  }
  function hideCart() {
    setCartProgress("");
  }
  function showCheckout() {
    setCartProgress("checkout");
  }
  function hideCheckout() {
    setCartProgress("");
  }

  const userCartProgressCntx = {
    progress: cartProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };
  return (
    <UserCartProgressContext.Provider value={userCartProgressCntx}>
      {children}
    </UserCartProgressContext.Provider>
  );
}

export default UserCartProgressContext;
