import axios from "axios";
import { Component } from "react";
import "../../../asset/index.css";

class ListItem extends Component {
  render() {
    return (
      <div onClick={() => this.props.onShowDetail()}>
        <p>id: {this.props.id}</p>
        <p>text: {this.props.text}</p>
      </div>
    );
  }
}

class ItmeDetail extends Component {
  render() {
    return <div>{this.props.info.text || "无内容"}</div>;
  }
}

export default class testRequestJson extends Component {
  constructor() {
    super();
    this.state = { list: [], itmeDetail: {} };
    axios.get("/test.json").then((res) => {
      this.setState({ list: res?.data?.list || [] });
    });
  }
  render() {
    return (
      <div className="flex-row">
        <div
          style={{
            width: "50%",
            height: "200px",
            overflow: "auto",
            background: "yellowgreen",
          }}
        >
          {this.state.list.map((item) => (
            <ListItem
              key={item.id}
              {...item}
              onShowDetail={() => {
                this.setState({ itmeDetail: item });
              }}
            ></ListItem>
          ))}
        </div>
        <ItmeDetail info={this.state.itmeDetail} />
      </div>
    );
  }
}
