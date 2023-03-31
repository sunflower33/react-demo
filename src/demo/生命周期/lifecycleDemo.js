import axios from "axios";
import BetterScroll from "better-scroll";
import { Component } from "react";

class Child extends Component {
  state = {
    count: 1,
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      count: nextProps.count,
    });
  }
  render() {
    return <div>测试componentWillRecieveProps: {this.state.count}</div>;
  }
}

export default class BetterScrollComponent extends Component {
  state = {
    list: [],
    count: 1,
  };
  componentDidMount() {
    axios.get("/test.json").then((res) => {
      this.setState({ list: res?.data?.list || [] });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextState) === JSON.stringify(this.state)) {
      return false;
    }
    console.log('shouldComponentUpdate=====')
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.list.length === 0) {
      new BetterScroll(".wrapper");
    }
  }

  getDataHandler = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  render() {
    return (
      <div>
        <Child count={this.state.count} />
        <button onClick={() => this.getDataHandler()}>改变状态</button>
        <div
          className="wrapper"
          style={{ height: "200px", overflow: "hidden", background: "yellow" }}
        >
          <ul>
            {this.state.list.map((item) => (
              <li key={item.id}>
                ({item.id}){item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
