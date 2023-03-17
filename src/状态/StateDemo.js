import React, { Component } from "react";

export default class StateDemo extends Component {
  inputRef = React.createRef();
  state = {
    list: [
      {
        id: 1,
        text: "text1",
      },
    ],
  };
  addItemHandler = () => {
    const list = this.state.list.slice();
    list.push({
      id: Math.random() * 100000,
      text: this.inputRef.current.value,
    });
    this.setState({
      list,
    });
    this.inputRef.current.value = "";
  };
  deleteItemHandler = (index) => {
    // const list = [...this.state.list];
    const list = this.state.list.concat();
    list.splice(index, 1);
    this.setState({ list });
  };
  render() {
    return (
      <>
        <div>
          <input ref={this.inputRef}></input>
          <button onClick={() => this.addItemHandler()}>add</button>
        </div>
        <ul>
          {this.state.list.map((item, index) => (
            <li key={item.id}>
              <span
                dangerouslySetInnerHTML={{
                  __html: item.text,
                }}
              ></span>
              <button onClick={() => this.deleteItemHandler(index)}>
                删除
              </button>
            </li>
          ))}
        </ul>
        {!this.state.list?.length && <div>暂无代办事项</div>}
      </>
    );
  }
}
