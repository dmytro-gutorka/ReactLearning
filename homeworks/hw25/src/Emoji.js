import React from "react";

export default class Emoji extends React.Component {

  render() {
    const {emoji, votes, id, onEmojiClick} = this.props

    return (
      <div className="emoji">
        <div onClick={() => onEmojiClick(id, 1)}>{emoji}: {votes}</div>
      </div>
    )
  }
}