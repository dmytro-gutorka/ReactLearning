export default function Button({ children, onClickHandler }) {
  return (
    <button onClick={onClickHandler}>
      {children}
    </button>
  )
}