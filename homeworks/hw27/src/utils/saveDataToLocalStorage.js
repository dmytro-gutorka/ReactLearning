export default function saveDataToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}