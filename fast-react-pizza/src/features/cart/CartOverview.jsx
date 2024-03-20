import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCart } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const cart = useSelector(getCart);
  const totalPrice = cart.reduce((acc, cur) => cur.totalPrice + acc, 0);
  const total = cart.reduce((acc, cur) => cur.quantity + acc, 0);
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{total} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
