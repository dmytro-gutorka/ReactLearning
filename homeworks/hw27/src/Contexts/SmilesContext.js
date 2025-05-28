import { createContext, useContext, useReducer } from 'react'

import loadDataFromLocalStorage from "../utils/loadDataFromLocalStorage";
import saveDataToLocalStorage from "../utils/saveDataToLocalStorage";


const SmilesContext = createContext(null)

const items = [
  {
    id: 1,
    icon: '😀',
    votes: 0
  },
  {
    id: 2,
    icon: '🥹',
    votes: 0
  },
  {
    id: 3,
    icon: '🙂',
    votes: 0
  },
  {
    id: 4,
    icon: '😌',
    votes: 0
  },
  {
    id: 5,
    icon: '😍',
    votes: 0
  },
]

const initialState = {
  emoji: items,
  sameScoreWinners: {},
  numberOfWinners: 0,
  overallVotes: 0
}

function getInitialState() {
  const savedData = loadDataFromLocalStorage('emoji') || items
  return { ...initialState, emoji: savedData }
}

function reducer(state, action) {
  let newState

  switch(action.type){
    case 'reset':
      newState =  { ...initialState };
      break;

    case 'calcVotes':
      const newEmoji = state.emoji.map(em => em.id === action.payload ? {...em, votes: em.votes + 1} : {...em})
      newState =  { ...state, emoji: newEmoji };
      break;

    case 'calcResults':
      const maxVote = Math.max(...state.emoji.map(em => em.votes));
      const sameScoreWinners = (emoji) => emoji.filter(emoji => emoji.votes > 0 && emoji.votes === maxVote);
      const overallVotes = (emoji) => emoji.reduce((acc, cur) => acc + cur.votes, 0);
      const numberOfWinners = sameScoreWinners.length

      newState = {
        ...state,
        sameScoreWinners: sameScoreWinners(state.emoji),
        numberOfWinners: numberOfWinners,
        overallVotes: overallVotes(state.emoji)
      }
      break;

    default:
      throw new Error('Unknown type')
  }

  saveDataToLocalStorage('emoji', newState.emoji);

  return newState
}


function SmilesProvider({ children }) {

  const [{emoji, sameScoreWinners, numberOfWinners, overallVotes}, dispatch] =
    useReducer(reducer, getInitialState())

  function handleVotes(id) {
    dispatch({ type: 'calcVotes', payload: id })
  }

  function handleReset() {
    dispatch({ type: 'reset' })
  }

  function handleResults() {
    dispatch({ type: 'calcResults' })
  }

  return (
    <SmilesContext.Provider value={{
      emoji,
      handleVotes,
      handleReset,
      handleResults,
      sameScoreWinners,
      numberOfWinners,
      overallVotes
    }}
    >
      {children}
    </SmilesContext.Provider>
  )
}


function useSmiles() {
  const context = useContext(SmilesContext)

  if (!context) throw new Error('Smiles context was used outside the SmilesProvider')

  return context
}


export { SmilesProvider, useSmiles }