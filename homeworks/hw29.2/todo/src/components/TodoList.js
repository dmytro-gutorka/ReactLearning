import { useSelector } from 'react-redux'
import TodoItem from "./TodoItem";


export default function TodoList() {

  const todos = useSelector(state => state.todos)

  return (
    <div>
      {todos.map((item, index) => (<TodoItem todoItem={item} key={index}/>))}
    </div>
  )
}