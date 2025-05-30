import { useEffect } from "react";
import saveDataToLocalStorage from "../utils/saveDataToLocalStorage";
import EmojiList from "../Components/EmojiList/EmojiList";
import Button from "../Components/Button/Button";
import Results from "../Components/Results/Results";
import Emoji from "../Components/Emoji/Emoji";
import { useSmiles } from "../Contexts/SmilesContext";


export default function Homepage() {
  const { emoji, handleResults, handleReset, handleVotes,
    sameScoreWinners, numberOfWinners, overallVotes } = useSmiles()

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