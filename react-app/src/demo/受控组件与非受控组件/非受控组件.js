import React, { Component } from "react";

export default class UncontrolledComponent extends Component {
  myUsername = React.createRef();
  render() {
    return (
      <div>
        <h1>非受控组件</h1>
        <input type="text" ref={this.myUsername} defaultValue="default"></input>
        <button onClick={() => console.log(this.myUsername.current.value)}>
          登录
        </button>
        <button onClick={() => (this.myUsername.current.value = "")}>
          重置
        </button>
      </div>
    );
  }
}
