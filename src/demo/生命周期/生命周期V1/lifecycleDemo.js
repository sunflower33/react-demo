import BetterScroll from "better-scroll";
import { Component } from "react";
import "../../../asset/index.css";
import { getTestJsonData } from "../../../redux/actionCreator/TestJsonData";
import {store} from "../../../redux/store";

class Child extends Component {
  state = {
    category: 1,
    categoryData: "",
  };

  getCategory(category) {
    const testJsonData = store.getState().ReducerTest.testJsonData;
    if (category === 1) {
      this.setState({ categoryData: testJsonData?.category_1 || "" });
    } else {
      this.setState({ categoryData: testJsonData?.category_2 || "" });
    }
  }
  componentDidMount() {
    if (!store.getState().ReducerTest.testJsonData) {
      store.dispatch(getTestJsonData());
      let unsubcribe = store.subscribe(() => {
        this.getCategory(this.state.category);
      });
      this.setState({
        unsubcribe: unsubcribe,
      });
    } else {
      this.getCategory(this.state.category);
    }
  }
  componentWillUnmount() {
    typeof this.state.unsubcribe == "function" && this.state.unsubcribe();
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps) === JSON.stringify(this.props)) {
      return false;
    }
    this.setState({
      category: nextProps.category,
    });
    this.getCategory(nextProps.category);
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
    unsubcribe: undefined
  };
  componentDidMount() {
    if (!store.getState().ReducerTest.testJsonData) {
      store.dispatch(getTestJsonData());
      let unsubcribe = store.subscribe(() => {
        store.getState().ReducerTest.testJsonData &&
          this.setState({
            list: store.getState().ReducerTest.testJsonData.list || [],
            isLoading: false,
            hadPageInit: true,
          });
      });
      this.setState({
        unsubcribe: unsubcribe,
      });
    } else {
      this.setState({
        list: store.getState().ReducerTest.testJsonData.list || [],
        isLoading: false,
        hadPageInit: true,
      });
    }
  }
  componentWillUnmount() {
    typeof this.state.unsubcribe == "function" && this.state.unsubcribe();
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
