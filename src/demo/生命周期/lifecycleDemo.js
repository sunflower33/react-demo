import axios from "axios";
import BetterScroll from "better-scroll";
import { Component } from "react";

export default class BetterScrollComponent extends Component {
  state = {
    list: [],
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
    return true;
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.list.length === 0) {
      new BetterScroll(".wrapper");
    }
  }
  render() {
    return (
      <div>
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
