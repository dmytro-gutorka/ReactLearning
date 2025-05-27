import React from "react";
import loadDataFromLocalStorage from "./utils/loadDataFromLocalStorage";
import saveDataToLocalStorage from "./utils/saveDataToLocalStorage";
import Button from "./Button";


export default class Results extends React.Component {

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