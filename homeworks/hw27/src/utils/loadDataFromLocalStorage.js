export default function loadDataFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}