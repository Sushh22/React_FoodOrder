import Header from "./Components/Header.jsx";
import Meals from "./Components/Meals.jsx";
import Cart from "./Components/Cart.jsx";
import Checkout from "./Components/Checkout.jsx";
import { CartContextProvider } from "./Store/CreateContext.jsx";
import { UserCartProgressContextProvider } from "./Store/UserCartProgressContext.jsx";

function App() {
  return (
    <>
      <UserCartProgressContextProvider>
        <CartContextProvider>
          <Header />
          <Meals />
          <Cart/>
          <Checkout/>
        </CartContextProvider>
      </UserCartProgressContextProvider>
    </>
  );
}

export default App;
