import { Component } from "react";

export default class SetStateTest extends Component {
  state = {
    count: 1,
  };
  addHandler = () => {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);
  };
  asyncAddHandler = () => {
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 });
      console.log(this.state.count);
      this.setState({ count: this.state.count + 1 });
      console.log(this.state.count);
      this.setState({ count: this.state.count + 1 });
      console.log(this.state.count);
    }, 0);
    
  };
  callbackAddHandler = () => {
    this.setState({ count: this.state.count + 1 }, () => {
      console.log(this.state.count);
    });
    this.setState({ count: this.state.count + 1 }, () => {
      console.log(this.state.count);
    });
    this.setState({ count: this.state.count + 1 }, () => {
      console.log(this.state.count);
    });
  };
  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={() => this.addHandler()}>同步逻辑add</button>
        <button onClick={() => this.asyncAddHandler()}>异步逻辑add</button>
        <button onClick={() => this.callbackAddHandler()}>回调函数add</button>
      </div>
    );
  }
}
/* 
    1. setState处在同步的逻辑中，异步更新状态，异步更新真实dom
    2. setState处在异步的逻辑中，同步更新状态，同步更新真实dom
    3. setState接受第二个参数，第二参数是回调函数，状态和dom更新完后就会被触发

    在react18.2.0中，2点无效
*/
