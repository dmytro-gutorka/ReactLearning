import React from 'react'


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


    saveVotesToLocalStorage = (data) => {
        localStorage.setItem('votes', JSON.stringify(data))
    }

    loadResultsFromLocalStorage = key => {
        this.setState(JSON.parse(localStorage.getItem(key)) || this.state)
    }

    componentDidMount() {
        this.loadResultsFromLocalStorage('votes')
   }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.saveVotesToLocalStorage(this.state)
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
        <div>
            <div>
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
        <div>
          <button onClick={() => onEmojiClick(id, 1)}>{emoji}</button>
          <span>{votes}</span>
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

    constructor() {
        super();
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

    saveResultsToLocalStorage = (data) => {
        localStorage.setItem('voteResults', JSON.stringify(data))
    }

    loadResultsFromLocalStorage = key => {
        this.setState(JSON.parse(localStorage.getItem(key)) || this.state)
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
        this.loadResultsFromLocalStorage('voteResults')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.saveResultsToLocalStorage(this.state)
    }


    render() {

      const {state: appState, onVotesReset} = this.props

        return (
        <div>
            <Button onClickHandler={() => this.handleResults(appState)}>Show results</Button>
            <Button onClickHandler={() => this.handleResetResults(onVotesReset)}>Reset results</Button>

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
    )
  }
}


export default App;
