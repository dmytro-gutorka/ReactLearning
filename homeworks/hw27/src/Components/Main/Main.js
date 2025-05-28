import { useEffect } from 'react'
import { useSmiles } from "../../Contexts/SmilesContext";

import saveDataToLocalStorage from "../../utils/saveDataToLocalStorage";
import EmojiList from "../EmojiList/EmojiList";
import Emoji from "../Emoji/Emoji";
import Button from "../Button/Button";
import Results from "../Results/Results";


export default function Main() {
  const { emoji, handleResults, handleReset, handleVotes, sameScoreWinners, numberOfWinners, overallVotes } = useSmiles()

  useEffect(() => {
    saveDataToLocalStorage('emoji', emoji)
  }, [emoji]);

  return (
    <main>
      <EmojiList>
        {emoji.map(emoji =>
          <Emoji id={emoji.id} icon={emoji.icon} key={emoji.id} votes={emoji.votes} onEmojiVotes={handleVotes} />
        )}
      </EmojiList>
      <Button onClickHandler={handleResults}>Show results</Button>
      <Button onClickHandler={handleReset}>Reset Results</Button>
      <Results
        sameScoreWinners={sameScoreWinners}
        numberOfWinners={numberOfWinners}
        overallVotes={overallVotes}
      />
    </main>
  )
}