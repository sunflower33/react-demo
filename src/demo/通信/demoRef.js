import React, { Component } from "react";
import ControlledField from "./ControlledFieldRef";

export default class demo extends Component {
  username = React.createRef();
  password = React.createRef();
  render() {
    return (
      <div style={{ width: "500px", margin: " 0 auto" }}>
        <ControlledField ref={this.username} label="用户名" type="text" />
        <ControlledField ref={this.password} label="密码" type="text" />
        <button onClick={() => this.loginHandler()}>登录</button>
        <button onClick={() => this.resetHandler()}>重置</button>
      </div>
    );
  }
  loginHandler = () => {
    console.log("username===", this.username.current.state.value);
    console.log("password===", this.password.current.state.value);
  };
  resetHandler = ()=>{
    console.log(this.username.current.reset())
    console.log(this.password.current.reset())
  }
}
