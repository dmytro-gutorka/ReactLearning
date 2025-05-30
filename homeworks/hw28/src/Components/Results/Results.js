export default function Results({ sameScoreWinners, numberOfWinners, overallVotes }) {

  if (overallVotes === 0) return;

  return (
    <div className="container">
      <div className="results">
        {numberOfWinners === 1 && (<p>Our winner is {sameScoreWinners.map(emoji => emoji.icon)}</p>)}
        {numberOfWinners > 1 && (<p>This time we have {numberOfWinners} winners:{sameScoreWinners.map(emoji => emoji.icon)}</p>)}
        {numberOfWinners > 0 && (<p>Overall votes: {overallVotes}</p>)}
      </div>
    </div>
  )
}