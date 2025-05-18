import React from 'react'


function saveDataToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

function loadDataFromLocalStorage(key)  {
    this.setState(JSON.parse(localStorage.getItem(key)) || this.state)
}

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
            <div className="emojies">
                {this.state.emoji.map((emoji, index) =>
                    <Emoji
                        emoji={emoji.icon}
                        votes={emoji.votes}
                        onEmojiClick={this.handleEmojiCounter}
                        key={index}
                        id={index}
                    />
                )}
            </div>
            <Results state={this.state} onVotesReset={this.handleResetEmojiVotes}/>
        </div>
    )
  }
}


class Emoji extends React.Component {

render() {
    const {emoji, votes, id, onEmojiClick} = this.props

    return (
        <div className="emoji">
          <div onClick={() => onEmojiClick(id, 1)}>{emoji}: {votes}</div>
        </div>
    )
  }
}


class Button extends React.Component {

  render() {
      const {children, onClickHandler} = this.props

    return (
        <button onClick={onClickHandler}>{children}</button>
    )
  }
}


class Results extends React.Component {

    state = {
        maxVote: 0,
        winnersWithTheSameScore: 0,
        numberOfWinners: 0,
        overallVotes: 0,
    }

    handleResults = (appState) => {
        const maxVote = Math.max(...appState.emoji.map(em => em.votes));
        const winnersWithTheSameScore = appState.emoji.filter(
            emoji => emoji.votes > 0 && emoji.votes === maxVote
        );
        const numberOfWinners = winnersWithTheSameScore.length
        const overallVotes = appState.emoji.reduce((acc, cur) => acc + cur.votes, 0);

        this.setState({
            maxVote,
            winnersWithTheSameScore,
            numberOfWinners,
            overallVotes,
        });
    }

    handleResetResults(onVotesReset) {
        this.setState({
            maxVote: 0,
            winnersWithTheSameScore: 0,
            numberOfWinners: 0,
            overallVotes: 0
        });

        onVotesReset()
    }

    componentDidMount() {
        loadDataFromLocalStorage.call(this, 'voteResults')
    }

    componentDidUpdate() {
        saveDataToLocalStorage.call(this, 'voteResults', this.state)
    }


    render() {

      const {state: appState, onVotesReset} = this.props

        return (
        <div className="container">
            <Button onClickHandler={() => this.handleResults(appState)}>Show results</Button>
            <Button onClickHandler={() => this.handleResetResults(onVotesReset)}>Reset results</Button>

            <div className="results">
            {this.state.numberOfWinners === 1 && (
                <p>Our winner is {this.state.winnersWithTheSameScore.map(emoji => emoji.icon)}</p>
            )}
            {this.state.numberOfWinners > 1 && (
                <p>This time we have {this.state.numberOfWinners} winners:
                    {this.state.winnersWithTheSameScore.map(emoji => emoji.icon)}
                </p>
            )}
          {this.state.numberOfWinners > 0 && (
              <p>Overall votes: {this.state.overallVotes}</p>
          )
    }
            </div>
        </div>
    )
  }
}


export default App;
