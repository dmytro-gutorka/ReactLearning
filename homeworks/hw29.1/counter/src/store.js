import { createStore } from 'redux'


const initialState = {
  value: 0
}


function reducer(state = initialState, action) {
console.log(state)
  switch(action.type) {
    case 'increase':
      return { ...state, value: state.value + 1 }
    case 'decrease':
      return { ...state, value: state.value - 1 }

    default:
      return state
  }
}


const store = createStore(reducer)


export default store
