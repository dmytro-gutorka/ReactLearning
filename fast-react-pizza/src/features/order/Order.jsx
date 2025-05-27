// Test ID: IIDSAT
import { calcMinutesLeft, formatCurrency, formatDate, } from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import OrderItem from "./OrderItem";


function Order() {
  const order = useLoaderData()

  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-6">
      <div className='flex items-center justify-between flex-wrap gap-2'>
        <h2 className="text-xl font-semibold">Status #{id} status </h2>

        <div className="space-x-2">
          {priority &&
            <span className="bg-red-500 rounded-full py-1 px-3 uppercase font-semibold text-sm text-red-50">
            Priority
          </span>}
          <span className="bg-green-500 rounded-full py-1 px-3 uppercase font-semibold text-sm text-red-50">
            {status} order
          </span>
        </div>
      </div>

      <div className='flex items-center justify-between flex-wrap gap-2 bg-stone-200 py-5 px-6'>
        <p className='font-medium'>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y dive-stone-200 border-b border-t">
        {cart.map(item => (<OrderItem item={item} key={item.id}/>))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}


export async function loader({ params }) {
  return await getOrder(params.orderId)
}


export default Order;
