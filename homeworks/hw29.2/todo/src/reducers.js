const initialState = {
  todos: [],
}


export function todoReducer(state = initialState, action) {

  switch(action.type) {
    case 'todo/add':
      console.log(state.todos)

      return { ...state, todos: [ ...state.todos, action.payload ]}
    default:
      return state
  }
}
