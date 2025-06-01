import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTodos } from "../reducers";
import TodoItem from "./TodoItem";


export default function TodoList() {

  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch]);

  return (
    <div>
      {todos.map((item, index) => (<TodoItem todoItem={item} key={index}/>))}
    </div>
  )
}