import { useDispatch } from "react-redux";


export default function CreateTodo() {

  const dispatch = useDispatch()

  function handleFormSubmit(e) {
    e.preventDefault()

    const formData = Object.fromEntries(new FormData(e.target))

    dispatch({type: "todo/add", payload: formData})
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col m-5 gap-3">
      <div>
        <label htmlFor="todo-title">Title</label>
        <input id="todo-title" type="text" name="title" className="border-2 border-stone-400 mx-2"/>
      </div>
      <div>
        <label htmlFor="todo-description">Description</label>
        <input id="todo-description" type="text" name="description" className="border-2 border-stone-400 mx-2"/>
      </div>
      <button className='self-start py-2 px-10 rounded-xl border-stone-400 bg-green-200'>add</button>
    </form>
  )
}