import React, { Component } from "react";

export default class App extends Component {
  state = {
    testToUpperCase: "init",
  };
  static getDerivedStateFromProps(nextProps, nextState) {
    console.log("getDerivedStateFromProps~~~~~~", nextState);
    return {
      testToUpperCase:
        nextState.testToUpperCase.substring(0, 1).toUpperCase() +
        nextState.testToUpperCase.substring(1),
    };
  }
  render() {
    return (
      <>
        <button
          onClick={() => {
            this.setState({
              testToUpperCase: "success",
            });
          }}
        >
          onClick
        </button>
        <div>
          test getDerivedStateFromProps()： {this.state.testToUpperCase}
        </div>
      </>
    );
  }
}
