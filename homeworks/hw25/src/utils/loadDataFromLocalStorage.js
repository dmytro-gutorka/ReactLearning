export default function loadDataFromLocalStorage(key)  {
  this.setState(JSON.parse(localStorage.getItem(key)) || [])
}