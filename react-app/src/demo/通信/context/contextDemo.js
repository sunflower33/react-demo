import axios from "axios";
import React, { Component } from "react";

const GlobalContext = React.createContext();

class ListItem extends Component {
  render() {
    return (
      <GlobalContext.Consumer>
        {(value) => {
          return (
            <div onClick={() => value.changeDetail({ text: this.props.text })}>
              <p>id: {this.props.id}</p>
              <p>text: {this.props.text}</p>
            </div>
          );
        }}
      </GlobalContext.Consumer>
    );
  }
}

class ItmeDetail extends Component {
  render() {
    return (
      <GlobalContext.Consumer>
        {(value) => {
          return <div>{value.info.text || "无内容"}</div>;
        }}
      </GlobalContext.Consumer>
    );
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
      <GlobalContext.Provider
        value={{
          info: this.state.itmeDetail,
          changeDetail: (value) => {
            this.setState({ itmeDetail: value });
          },
        }}
      >
        <div>
          {this.state.list.map((item) => (
            <ListItem key={item.id} {...item}></ListItem>
          ))}
          <ItmeDetail info={this.state.itmeDetail}></ItmeDetail>
        </div>
      </GlobalContext.Provider>
    );
  }
}
