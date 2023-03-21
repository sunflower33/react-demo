import React, { Component } from "react";

export default class UncontrolledComponent extends Component {
  state = {
    username: 'default111'
  }
  render() {
    return (
      <div>
        <h1>非受控组件</h1>
        <input type="text" value={this.state.username}></input>
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
