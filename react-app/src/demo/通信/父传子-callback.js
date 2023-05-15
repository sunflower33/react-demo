import { Component } from "react";
import ControlledField from "./ControlledField";
import ListItem from "./ListItem";
import ListItemFunc from "./ListItemFunc";

export default class mapDom extends Component {
  state = {
    list: [
      {
        id: "test1",
        text: "test1",
        checked: false,
      },
      {
        id: "test2",
        text: "test2",
        checked: true,
      },
      { id: "test3", text: "test3", checked: false },
    ],
    keyword: "",
  };

  render() {
    return (
      <div>
        <ControlledField
          type="text"
          value={this.state.keyword}
          onChange={(value) => {
            this.setState({ keyword: value });
          }}
        />
        <button onClick={() => this.addItemHandler()}>添加</button>
        <h1>类组件</h1>
        <ListItem
          list={this.state.list}
          checkHandler={(index) => this.checkHandler(index)}
          deleteHandler={(index) => this.deleteHandler(index)}
        />
        <h1>函数式组件</h1>
        <ListItemFunc
          list={this.state.list}
          checkHandler={(index) => this.checkHandler(index)}
          deleteHandler={(index) => this.deleteHandler(index)}
        />
      </div>
    );
  }
  checkHandler(index) {
    const newList = [...this.state.list];
    newList[index].checked = !newList[index].checked;
    this.setState({ list: newList });
  }
  addItemHandler() {
    if (!this.state.keyword.trim()) {
      alert("请输入有效信息！");
      return;
    }
    let newList = [...this.state.list];
    newList.push({
      id: Math.random() * 1000000,
      text: this.state.keyword,
      checked: false,
    });
    this.setState({ list: newList, keyword: "", checked: false });
  }
  deleteHandler(index) {
    let newList = this.state.list;
    newList.splice(index, 1);
    this.setState({ list: newList });
  }
}
