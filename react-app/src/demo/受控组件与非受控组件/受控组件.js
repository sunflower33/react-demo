import { Component } from "react";

export default class UncontrolledComponent extends Component {
  state = {
    username: "default111",
  };
  render() {
    return (
      <div>
        <h1>非受控组件</h1>
        <input
          type="text"
          value={this.state.username}
          onChange={(evt) => {
            this.setState({ username: evt.target.value });
          }}
        ></input>
        <button onClick={() => console.log(this.state.username)}>登录</button>
        <button
          onClick={() => {
            this.setState({ username: "" });
          }}
        >
          重置
        </button>
        <div>{this.state.username}</div>
      </div>
    );
  }
}
