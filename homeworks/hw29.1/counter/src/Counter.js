import { useDispatch, useSelector } from "react-redux";



export default function Counter() {
  const value = useSelector(state => state.value)
  const dispatch = useDispatch()

  return (
    <div>
       <button onClick={() => dispatch({ type: 'increase' })}>+</button>
      <span>{value}</span>
      <button onClick={() => dispatch({ type: 'decrease' })}>-</button>
    </div>
  )
}