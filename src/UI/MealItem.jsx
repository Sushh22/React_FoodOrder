import { formatCurrencyINR } from "../util/CurrencyFormatting.js";
import Button from "./Button.jsx";
import CartContext from "../Store/CreateContext.jsx";
import { useContext } from "react";

export default function MealItem({ mealItem }) {
  const cartContx = useContext(CartContext);

  function handleAddToCart() {
    cartContx.addItem(mealItem);
  }

  return (
    <li className="meal-item">
      <article>
        <div className="meal-item-image-container">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${mealItem.image}`}
            alt={mealItem.name}
          />

          <p className="meal-item-price">
            {formatCurrencyINR.format(mealItem.price)}
          </p>
        </div>
        <div>
          <h3>{mealItem.name}</h3>
          <p className="meal-item-description">{mealItem.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
