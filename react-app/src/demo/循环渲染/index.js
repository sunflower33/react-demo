import React, { Component } from "react";

export default class mapDom extends Component {
  myref = React.createRef();

  state = {
    list: [
      {
        id: "test1",
        text: "test1",
      },
      {
        id: "test2",
        text: "test2",
      },
      { id: "test3", text: "test3" },
    ],
  };

  render() {
    let newList = this.state.list.map((item, index) => (
      <li key={item.id}>
        {item.text}
        <button onClick={this.deleteHandler.bind(this, index)}>Delete</button>
      </li>
    ));
    return (
      <div>
        <input type="text" ref={this.myref} />
        <button onClick={() => this.addItemHandler()}>添加</button>
        <ul>
          {/* {this.state.list.map((item) => (
            <li key={item}>{item}</li>
          ))} */}
          {newList}
        </ul>
      </div>
    );
  }

  addItemHandler() {
    let newList = [...this.state.list];
    newList.push({
      id: Math.random() * 1000000,
      text: this.myref.current.value,
    });
    this.setState({ list: newList });
  }
  deleteHandler(index) {
    let newList = this.state.list
    newList.splice(index, 1);
    this.setState({ list: newList });
  }
}
