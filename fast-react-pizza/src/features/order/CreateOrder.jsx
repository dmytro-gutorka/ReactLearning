import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";

import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";

import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);


function CreateOrder() {
  const [withPriority, setWithPriority] = useState()

  const { username, status: addressStatus, address, error: errorAddress, position } =
    useSelector(state => state.user)

  const formErrors = useActionData()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const cart = useSelector(getCart)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice

  const isLoadingAddress = addressStatus === 'loading'
  const hasPosition = position.latitude && position.longitude
  const isSubmitting = navigation.state === 'submitting'

  if (!cart.length) return <EmptyCart/>

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let&#39;s go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" className="input grow"  defaultValue={username} required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
          {formErrors?.phone && <p className="text-xs mt-2 text-red-700 p-2 rounded-md bg-red-100 w-4/5 text-center mr-auto">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              className="input w-full"
              required
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressStatus === 'error' && <p className="text-xs mt-2 text-red-700 p-2 rounded-md bg-red-100 w-4/5 text-center mr-auto">{errorAddress}</p>}

          </div>
          {!address && (
            <Button
              disabled={isLoadingAddress}
              type="small"
              onClick={(e) => {
                e.preventDefault()
                dispatch(fetchAddress())
              }}>
              Get position
            </Button>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name='cart' value={JSON.stringify(cart)} />
          <input type="hidden" name='posirion' value={hasPosition ? `${position.latitude},${position.longitude}` : ''} />

          <Button disabled={isSubmitting} type="primary">
              {isSubmitting ? "Placing order..." : `Order now from ${formatCurrency(totalPrice)}`}
            </Button>
        </div>
      </Form>
    </div>
  );
}


export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true"
  }

  const errors = {}

  if (!isValidPhone(order.phone)) errors.phone =
      "Please give us your correct phone number. We might need to contact you"
  if (Object.keys(errors).length > 0) return errors

  const newOrder = await createOrder(order)

  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)
}


export default CreateOrder;
