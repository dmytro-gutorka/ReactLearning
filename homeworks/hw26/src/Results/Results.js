export default function Results({ winnersWithTheSameScore, numberOfWinners, overallVotes }) {

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