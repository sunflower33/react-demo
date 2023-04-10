import axios from "axios";
import BetterScroll from "better-scroll";
import { Component } from "react";
import "../../../asset/index.css";

class Child extends Component {
  state = {
    category: 1,
    categoryData: "",
  };
  getCategory(category) {
    axios.get("/test.json").then((res) => {
      if (category === 1) {
        this.setState({ categoryData: res?.data?.category_1 || "" });
      } else {
        this.setState({ categoryData: res?.data?.category_2 || "" });
      }
    });
  }
  componentDidMount = ()=> {
    this.getCategory(this.props.category)
  }
  
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps) === JSON.stringify(this.props)) {
      return false;
    }
    this.setState({
      category: nextProps.category,
    });
    this.getCategory(nextProps.category)
  }
  render() {
    return <div>测试componentWillRecieveProps: {this.state.categoryData}</div>;
  }
}

export default class BetterScrollComponent extends Component {
  state = {
    list: [],
    category: 1,
    isLoading: true,
  };
  componentDidMount() {
    axios.get("/test.json").then((res) => {
      this.setState({ list: res?.data?.list || [], isLoading: false });
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

  categoryHandler = (category) => {
    this.setState({
      category,
    });
  };
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

        <ul className="tabs">
          <li className="tab-item" onClick={() => this.categoryHandler(1)}>
            分类一
          </li>
          <li className="tab-item" onClick={() => this.categoryHandler(2)}>
            分类二
          </li>
        </ul>
        {!this.state.isLoading && <Child category={this.state.category} />}
      </div>
    );
  }
}
