import React from 'react'
import loadDataFromLocalStorage from "./utils/loadDataFromLocalStorage";
import saveDataToLocalStorage from "./utils/saveDataToLocalStorage";
import Results from "./Reults";
import Emojies from "./Emojies";


class App extends React.Component {

  state = {
      emoji: [
          {
              id: 0,
              icon: '😀',
              votes: 0
          },
          {
              id: 1,
              icon: '🥹',
              votes: 0
          },
          {
              id: 2,
              icon: '🙂',
              votes: 0
          },
          {
              id: 3,
              icon: '😌',
              votes: 0
          },
          {
              id: 4,
              icon: '😍',
              votes: 0
          },
      ]
  }

    componentDidMount() {
        loadDataFromLocalStorage.call(this, 'votes')
   }

    componentDidUpdate(prevProps, prevState, snapshot) {
        saveDataToLocalStorage.call(this, 'votes', this.state)
    }

    handleEmojiCounter = (id) => {
        this.setState((prevState) => {
            const updatedEmoji = prevState.emoji.map((emoji, index) =>
                index === id ? {...emoji, votes: emoji.votes + 1} : emoji);

            return { emoji: updatedEmoji };
        });
    }

    handleResetEmojiVotes = () => {
      this.setState(prevState => {
          const updatedEmoji = prevState.emoji.map(em => {
              return {...em, votes: 0}
          })
          return {emoji: updatedEmoji}
      })
    }

  render() {

    return (
        <div className="container">
          <Emojies state={this.state} handleEmojiCounter={this.handleEmojiCounter}/>
          <Results state={this.state} onVotesReset={this.handleResetEmojiVotes}/>
        </div>
    )
  }
}


export default App;
