import React from "react";

export default class Button extends React.Component {

  render() {
    const {children, onClickHandler} = this.props

    return (
      <button onClick={onClickHandler}>{children}</button>
    )
  }
}
