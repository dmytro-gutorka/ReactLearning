import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
import TodoStatistic from "./components/TodoStatistic";


export default function App() {

  return (
    <>
      <CreateTodo />
      <TodoList/>
      <TodoStatistic />
    </>
  )
}