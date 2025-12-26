import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button.jsx";
import CartContext from "../Store/CreateContext.jsx"
import UserCartProgressContext from "../Store/UserCartProgressContext.jsx"
import { useContext } from "react";

export default function Header() {
  const cartContx = useContext(CartContext);
  const userCartProgressCntx = useContext(UserCartProgressContext);

  const totalCartItems = cartContx.items.reduce((totalNumberOfCartItems ,item)=>{
    return totalNumberOfCartItems + item.quantity;
  } , 0)

  function handleShowCart(){
    userCartProgressCntx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="a restaurant" />
        <h1>Foodie Express</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
