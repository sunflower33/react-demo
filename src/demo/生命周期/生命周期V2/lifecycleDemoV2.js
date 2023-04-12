import axios from "axios";
import BetterScroll from "better-scroll";
import { Component, PureComponent } from "react";
import SwiperDemo from "./SwiperDemo";
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
    console.log("=============getCategory===================");
  }
  componentDidMount() {
    console.log("===============componentDidMount=================");
    this.getCategory(this.state.category);
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    return {
      category: nextProps.category,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category === this.state.category) {
      return;
    }
    console.log("componentDidUpdate");
    this.getCategory(this.state.category);
  }
  render() {
    return <div>测试getDerivedStateFromProps: {this.state.categoryData}</div>;
  }
}


export default class BetterScrollComponent extends PureComponent {
  state = {
    list: [],
    category: 1,
    isLoading: true,
    hadInsertData: false,
    hadPageInit: false,
  };
  componentDidMount() {
    axios.get("/test.json").then((res) => {
      this.setState({
        list: res?.data?.list || [],
        isLoading: false,
        hadPageInit: true,
      });
    });
  }

  getSnapshotBeforeUpdate() {
    return {
      scrollTop: document.getElementById("scrollBox").scrollTop,
      scrollHeight: document.getElementById("scrollBox").scrollHeight,
    };
  }

  componentDidUpdate(prevProps, prevState, value) {
    if (
      value.scrollHeight !== document.getElementById("scrollBox").clientHeight
    ) {
      document.getElementById("scrollBox").scrollTop =
        value.scrollTop +
        document.getElementById("scrollBox").scrollHeight -
        value.scrollHeight;
    }
    if (prevState.list.length === 0) {
      new BetterScroll(".wrapper");
    }
  }
  getNewData = () => {
    const newList = [
      ...[
        {
          id: 17,
          text: "text17",
        },
        {
          id: 18,
          text: "text18",
        },
        {
          id: 19,
          text: "text19",
        },
      ],
      ...this.state.list,
    ];
    this.setState({ list: newList, hadInsertData: true });
  };
  categoryHandler = (category) => {
    this.setState({
      category,
    });
  };
  render() {
    return (
      <div>
        <h1 className="text-center">新生命周期</h1>
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
        <h3 className="text-center">测试getSnapshotBeforeUpdate</h3>
        <button
          disabled={this.state.hadInsertData}
          onClick={() => this.getNewData()}
        >
          插入新数据
        </button>
        <div
          id="scrollBox"
          style={{ height: "200px", background: "#f5f5f5", overflow: "auto" }}
        >
          <ul>
            {this.state.list.map((item) => (
              <li key={item.id} style={{ lineHeight: "40px" }}>
                ({item.id}){item.text}
              </li>
            ))}
          </ul>
        </div>

        <section>
          <h3 className="text-center">SwiperDemo</h3>
          <SwiperDemo />
        </section>
      </div>
    );
  }
}
