const initialState = {
  todos: []
}


export function todoReducer(state = initialState, action) {

  switch(action.type) {
    case 'todo/added':
      return { ...state, todos: [ ...state.todos, action.payload ] }
    case 'todo/todoFetched':
      return { ...state, todos: [ ...state.todos, ...action.payload ] }
    default:
      return state
  }
}


export function fetchTodos(){
  return async function fetchTodos(dispatch, getState) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await response.json()

      dispatch({ type: 'todo/todoFetched', payload: data })
    }
    catch(err) {
      console.log(err)
    }
  }
}