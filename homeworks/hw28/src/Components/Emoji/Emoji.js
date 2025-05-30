export default function Emoji({ id, icon, votes, onEmojiVotes }) {

  return (
    <div className="emoji" onClick={() => onEmojiVotes(id)}>
      {icon}: {votes}
    </div>
  )
}
