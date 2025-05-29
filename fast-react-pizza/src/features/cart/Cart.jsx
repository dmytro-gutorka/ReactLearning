import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import { getUserName } from "../user/userSlice";


function Cart() {

  const username = useSelector(getUserName)
  const cart = useSelector(getCart)

  const dispatch = useDispatch()

  if (!cart.length) return <EmptyCart/>

  return (
    <div className="py-3 px-4">
      <LinkButton to="/menu" className="text-sm text-blue-500 hover:text-blue-600 hover:underline">
        &larr; Back to menu
      </LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="divide-y divide-stone-200 border-b mt-3">
        {cart.map((item, index) =>
          <CartItem item={item} key={index}/>
        )}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">Order pizzas</Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}


export default Cart;
