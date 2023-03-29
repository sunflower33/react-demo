import axios from "axios";
import { Component } from "react";

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
    return <div>{this.props.info.text || '无内容'}</div>;
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
            onShowDetail={() => {
              this.setState({ ItmeDetail: item });
            }}
          ></ListItem>
        ))}
        <ItmeDetail info={this.state.ItmeDetail}></ItmeDetail>
      </div>
    );
  }
}
