import { useSelector } from "react-redux";


export default function TodoStatistic() {
  const todos = useSelector(state => state.todos)
  const todoNumber = Object.keys(todos).length

  return (
    <div>{todoNumber ? "You have: " + todoNumber + " todo" : 'There is no todo yet'}</div>
  )
}