import React from "react";


class MyFirstComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0
    }
  }

  increment(number) {
    this.setState({
      counter: this.state.counter + number
    })
  }

  render() {
    return (
        <React.Fragment>
          <button onClick={() => this.increment(10) }>counter x 1: {this.state.counter}</button>
        </React.Fragment>
    )
  }

}



export default MyFirstComponent;
