import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../Store/CreateContext";
import UserCartProgressContext from "../Store/UserCartProgressContext";
import { formatCurrencyINR } from "../util/CurrencyFormatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import useFetch from "../hooks/useFetch";
import Error from "../UI/Error";

const fetchConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Checkout() {
  const { data, isLoading , error, sendRequest ,clearData} = useFetch(
    "http://localhost:3000/orders",
    fetchConfig
  );
  
  const cartContx = useContext(CartContext);
  const userCartProgressCntx = useContext(UserCartProgressContext);
  const totalCartPrice = cartContx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCheckout() {
    userCartProgressCntx.hideCheckout();
  }

  function handleFinish(){
    userCartProgressCntx.hideCheckout();
    cartContx.clearCart();
    clearData();

  }

  function checkoutAction(fd) {
    // e.preventDefault();
    // const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());

   sendRequest(
    JSON.stringify({
      order: {
        items: cartContx.items,
        customer: customerData,
      },
    })
  );
  }
  if(data && !error){
    return(
      <Modal open={userCartProgressCntx.progress === "checkout"}
      onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was sucessfully placed.</p>
        <p>We will get back with more details over mail within few minutes.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    )
  }

  return (
    <Modal
      open={userCartProgressCntx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form action={checkoutAction}>
        <h2>Checkout</h2>
        <p>Total Amount : {formatCurrencyINR.format(totalCartPrice)}</p>
        <Input label="Full Name" id="name" type="text"></Input>
        <Input label="E-mail" id="email" type="email"></Input>
        <Input label="Address" id="street" type="text"></Input>
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text"></Input>
          <Input label="City" id="city" type="text"></Input>
        </div>
        {error && <Error title="Failed to submit order" errorMsg={error}/>}
        <p className="modal-actions">
          {isLoading ? <span>Sending order data...</span> : <><Button textOnly type="button" onClick={handleCloseCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button></>}
        </p>
      </form>
    </Modal>
  );
}
