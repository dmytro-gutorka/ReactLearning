import {useState, useEffect} from 'react'


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


function App() {
  const [emoji, setEmoji] = useState(items)
  const [winnersWithTheSameScore, setWinnersWithTheSameScore] = useState({})
  const [numberOfWinners, setNumberOfWinners] = useState(0)
  const [overallVotes, setOverallVotes] = useState(0)

  function saveDataToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  function saveExtraDataToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  function loadDataFromLocalStorage(key) {
    setEmoji(() => JSON.parse(localStorage.getItem(key)));
  }

  function loadExtraDataFromLocalStorage(key) {
    const data = JSON.parse(localStorage.getItem(key))

    setWinnersWithTheSameScore(() => data.winnersWithTheSameScore || 0);
    setNumberOfWinners(() => data.numberOfWinners || 0);
    setOverallVotes(() => data.overallVotes || 0);
  }

  function handleVotes(id) {
    setEmoji(prevState =>
        prevState.map(em => em.id === id ? {...em, votes: em.votes + 1} : {...em}))
  }

  function handleReset() {
    const resetEmoji = items.map(em => ({ ...em, votes: 0 }));
    setEmoji(resetEmoji);

    setWinnersWithTheSameScore([]);
    setNumberOfWinners(0);
    setOverallVotes(0);

    saveDataToLocalStorage('emoji', resetEmoji);
    saveExtraDataToLocalStorage('extraData', {
      winnersWithTheSameScore: [],
      numberOfWinners: 0,
      overallVotes: 0
    });
  }


  function handleResults()  {
    const maxVote = Math.max(...emoji.map(em => em.votes));
    const winnersWithTheSameScore = emoji.filter(emoji => emoji.votes > 0 && emoji.votes === maxVote);
    const numberOfWinners = winnersWithTheSameScore.length
    const overallVotes = emoji.reduce((acc, cur) => acc + cur.votes, 0);

    setWinnersWithTheSameScore(() => winnersWithTheSameScore)
    setNumberOfWinners(() => numberOfWinners)
    setOverallVotes(() => overallVotes)

    saveDataToLocalStorage("emoji", emoji)
    saveExtraDataToLocalStorage("extraData", {
      winnersWithTheSameScore, numberOfWinners, overallVotes
    })
  }

  useEffect(() => {
    loadDataFromLocalStorage('emoji');
    loadExtraDataFromLocalStorage("extraData");
  }, []);


  return (
    <div>
      <EmojiList>
        {emoji.map(emoji =>
            <Emoji
                id={emoji.id}
                icon={emoji.icon}
                key={emoji.id}
                votes={emoji.votes}
                onEmojiVotes={handleVotes}


            />
        )}
      </EmojiList>
      <Button onClickHandler={handleResults}>Show results</Button>
      <Button onClickHandler={handleReset}>Reset Results</Button>
      <Results
          winnersWithTheSameScore={winnersWithTheSameScore}
          numberOfWinners={numberOfWinners}
          overallVotes={overallVotes}
          test1={saveExtraDataToLocalStorage}
          test2={saveDataToLocalStorage}

      />
    </div>
  )
}


function EmojiList({ children }) {

  return (
      <div className="emojies">
        {children}
      </div>
  )
}


function Emoji({ id, icon, votes, onEmojiVotes }) {

  return (
      <div className="emoji" onClick={() => onEmojiVotes(id)}>
        {icon}: {votes}
      </div>
  )
}


function Results({ winnersWithTheSameScore, numberOfWinners, overallVotes}) {

  return (
      <div className="container">
        <div className="results">
          {numberOfWinners === 1 && (<p>Our winner is {winnersWithTheSameScore.map(emoji => emoji.icon)}</p>)}
          {numberOfWinners > 1 && (<p>This time we have {numberOfWinners} winners:{winnersWithTheSameScore.map(emoji => emoji.icon)}</p>)}
          {numberOfWinners > 0 && (<p>Overall votes: {overallVotes}</p>)}
        </div>
      </div>
  )
}


function Button({ children, onClickHandler }) {
  return (
      <button onClick={onClickHandler}>
        {children}
      </button>
  )
}



export default App;
