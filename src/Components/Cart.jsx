import { useContext } from "react";
import Modal from "../UI/Modal.jsx";
import Button from "../UI/Button.jsx";
import CartContext from "../Store/CreateContext";
import { formatCurrencyINR } from "../util/CurrencyFormatting";
import UserCartProgressContext from "../Store/UserCartProgressContext.jsx";

export default function Cart() {
  const cartContx = useContext(CartContext);
  const userCartProgressCntx = useContext(UserCartProgressContext);

  const totalCartPrice = cartContx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userCartProgressCntx.hideCart();
  }
  function handleOpenCheckout() {
    userCartProgressCntx.showCheckout();
  }
  return (
    <Modal className="cart" open={userCartProgressCntx.progress === "cart"} onClose={userCartProgressCntx.progress === "cart" ? handleCloseCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartContx.items.map((item) => (
          <li className="cart-item" key={item.id}>
            <p>
              {item.name} - {item.quantity} x {formatCurrencyINR.format(item.price)}
            </p>
            <p className="cart-item-actions">
              <button onClick={()=>cartContx.removeItem(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={()=>cartContx.addItem(item)}>+</button>
            </p>
          </li>
        ))}
      </ul>
      <p className="cart-total">{formatCurrencyINR.format(totalCartPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartContx.items.length > 0 && <Button onClick={handleOpenCheckout}>Buy Now</Button>}
      </p>
    </Modal>
  );
}
