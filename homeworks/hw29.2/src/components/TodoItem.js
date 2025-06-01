export default function TodoItem({ todoItem }) {

  return (
    <div className="flex gap-2">
      <input type="checkbox" />
      <p >{todoItem.title} {todoItem.description}</p>
    </div>
  )
}