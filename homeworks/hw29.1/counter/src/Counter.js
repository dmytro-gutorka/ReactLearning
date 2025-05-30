import store from "./store";

import { useSelector } from "react-redux";


export default function Counter() {
  const val = useSelector(state => state.value)

  return (
    <div>
       <button onClick={() => store.dispatch({ type: 'increase' })}>+</button>
      <span>{val}</span>
      <button onClick={() => store.dispatch({ type: 'decrease' })}>-</button>
    </div>
  )
}