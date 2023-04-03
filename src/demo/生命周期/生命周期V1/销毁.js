import { Component } from "react";

class Child extends Component {
  componentDidMount() {
    window.onresize = () => {
      console.log("窗口有调整~~~~~~~~~~~~~~~");
    };
    this.timer = setInterval(() => {
      console.log("定时器执行了~~~~~~~~~~~");
    }, 2000);
  }
  componentWillUnmount(){
    window.onresize = null
    clearInterval(this.timer)
  }
  render() {
    return "Child";
  }
}

export default class Unmounted extends Component {
  state = {
    isShowChild: true,
  };
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ isShowChild: !this.state.isShowChild });
          }}
        >
          测试销毁组件生命周期
        </button>
        Unmounted
        {this.state.isShowChild && <Child />}
      </div>
    );
  }
}
