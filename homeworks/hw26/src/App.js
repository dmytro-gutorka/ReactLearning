import {useState, useEffect} from 'react'
import loadDataFromLocalStorage from "./utils/loadDataFromLocalStorage";
import saveDataToLocalStorage from "./utils/saveDataToLocalStorage";
import EmojiList from "./EmojiList";
import Emoji from "./Emoji";
import Button from "./Button";
import Results from "./Results";


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
  const initialData = loadDataFromLocalStorage('emoji') || items

  const [emoji, setEmoji] = useState(initialData)
  const [winnersWithTheSameScore, setWinnersWithTheSameScore] = useState({})
  const [numberOfWinners, setNumberOfWinners] = useState(0)
  const [overallVotes, setOverallVotes] = useState(0)


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

    saveDataToLocalStorage('emoji', {
      emoji: resetEmoji,
      winnersWithTheSameScore: [],
      numberOfWinners: 0,
      overallVotes: 0
    });
  }

  function handleResults() {
    const maxVote = Math.max(...emoji.map(em => em.votes));
    const winnersWithTheSameScore = emoji.filter(emoji => emoji.votes > 0 && emoji.votes === maxVote);
    const numberOfWinners = winnersWithTheSameScore.length
    const overallVotes = emoji.reduce((acc, cur) => acc + cur.votes, 0);

    setWinnersWithTheSameScore(() => winnersWithTheSameScore)
    setNumberOfWinners(() => numberOfWinners)
    setOverallVotes(() => overallVotes)
  }


    useEffect(() => {
      saveDataToLocalStorage('emoji', emoji)
    }, [emoji]);


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
      />
    </div>
  )
}


export default App;
