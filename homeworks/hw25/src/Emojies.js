import React from "react";
import Emoji from "./Emoji";


export default class Emojies extends React.Component {


render() {

  const {emoji} = this.props.state

  console.log(this.props)

    return (
      <div className="emojies">
        {emoji.map((emoji, index) =>
          <Emoji
            emoji={emoji.icon}
            votes={emoji.votes}
            onEmojiClick={this.props.handleEmojiCounter}
            key={index}
            id={index}
          />
        )}
      </div>
    )
  }
}