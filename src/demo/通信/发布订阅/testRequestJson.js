import axios from "axios";
import { Component } from "react";

const bus = {
  cbList: [],
  subscribe(callback) {
    this.cbList.push(callback);
  },
  publish(value) {
    this.cbList.forEach((callback) => {
      callback && callback(value);
    });
  },
};

class ListItem extends Component {
  render() {
    return (
      <div onClick={() => bus.publish(this.props)}>
        <p>id: {this.props.id}</p>
        <p>text: {this.props.text}</p>
      </div>
    );
  }
}

class ItmeDetail extends Component {
  constructor() {
    super();
    this.state = {
      info: {},
    };
    bus.subscribe((val) => {
      this.setState({
        info: val,
      });
    });
  }
  render() {
    return <div>{this.state.info.text || "无内容"}</div>;
  }
}

export default class testRequestJson extends Component {
  constructor() {
    super();
    this.state = { list: [], ItmeDetail: {} };
    axios.get("/test.json").then((res) => {
      this.setState({ list: res?.data?.list || [] });
    });
  }
  render() {
    return (
      <div>
        {this.state.list.map((item) => (
          <ListItem
            key={item.id}
            {...item}
          ></ListItem>
        ))}
        <ItmeDetail></ItmeDetail>
      </div>
    );
  }
}
