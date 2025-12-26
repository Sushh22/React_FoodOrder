import { formatCurrencyINR } from "../util/CurrencyFormatting"
export default function CartItem({name , quantity  , price}) {
  return(
    <li className="cart-item">
    <p>{name} - {quantity} x {formatCurrencyINR.format(price)}</p>
    <p className="cart-item-ations">
      <button>-</button>
      <span>{quantity}</span>
      <button>+</button>
    </p>
  </li>
  )
}
