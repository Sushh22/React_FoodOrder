import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

function cartReducer(state, action) {
  if (action.type === "Add_Item") {
    //..update state to add meal item
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];

    if (existingItemIndex > -1) {
      const existingItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "Remove_Item") {
    //..remove item
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const updatedItems = [...state.items];
    const existingItem = state.items[existingItemIndex];
    if (existingItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
  if(action.type == 'Close_Cart'){
    return( {...state, items : []})
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cartState , dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addCartItem(item){
    dispatchCartAction({ type : "Add_Item", item});
  }
  function removeCartItem(id){
    dispatchCartAction({ type : "Remove_Item", id});
  }
  function clearCart(){
    dispatchCartAction({ type : "Close_Cart"});
  }

  const cartContext = {
    items : cartState.items,
    addItem : addCartItem,
    removeItem : removeCartItem,
    clearCart
  };

  console.log(cartContext);

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartContext;
