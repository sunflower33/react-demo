import { Button } from "antd";
import BetterScroll from "better-scroll";
import { Component, PureComponent } from "react";
import { connect } from "react-redux";
import "../../../asset/index.css";
import { getTestJsonData } from "../../../redux/actionCreator/TestJsonData";
import { store } from "../../../redux/store";
import SwiperDemo from "./SwiperDemo";

class Child extends Component {
  state = {
    category: 1,
    categoryData: "",
    unsubcribe: undefined,
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
  static getDerivedStateFromProps(nextProps, nextState) {
    return {
      category: nextProps.category,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category === this.state.category) {
      return;
    }
    this.getCategory(this.state.category);
  }
  render() {
    return <div>测试getDerivedStateFromProps: {this.state.categoryData}</div>;
  }
}

class LifecycleDemoV2 extends PureComponent {
  state = {
    list: [],
    category: 1,
    isLoading: true,
    hadInsertData: false,
    hadPageInit: false,
  };
  componentDidMount() {
    if (!this.props.ReducerTest.testJsonData) {
      this.props.getTestJsonData();
      store.subscribe(() => {
        this.props.ReducerTest.testJsonData &&
          this.setState({
            list: this.props.ReducerTest.testJsonData.list || [],
            isLoading: false,
            hadPageInit: true,
          });
      });
    } else {
      this.setState({
        list: this.props.ReducerTest.testJsonData.list || [],
        isLoading: false,
        hadPageInit: true,
      });
    }
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
        <Button
          type="primary"
          disabled={this.state.hadInsertData}
          onClick={() => this.getNewData()}
        >
          插入新数据
        </Button>
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

const mapStateToProps = (state) => {
  const { ReducerTest = {} } = state;
  return {
    ReducerTest,
  };
};
const mapDispatchToProps = {
  getTestJsonData,
};

export default connect(mapStateToProps, mapDispatchToProps)(LifecycleDemoV2);
