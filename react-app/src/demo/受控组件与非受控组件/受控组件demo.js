import { Component } from "react";

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
    let newList = this.state.list.map((item, index) => (
      <li key={item.id}>
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => this.checkHandler(index)}
        />
        <span style={{ textDecoration: item.checked ? "line-through" : "" }}>
          {item.text}
        </span>
        <button onClick={this.deleteHandler.bind(this, index)}>Delete</button>
      </li>
    ));
    return (
      <div>
        <input
          type="text"
          onChange={(evt) => {
            this.setState({ keyword: evt.target.value });
          }}
        />
        <button onClick={() => this.addItemHandler()}>添加</button>
        <ul>{newList}</ul>
      </div>
    );
  }
  checkHandler(index) {
    const newList = [...this.state.list];
    newList[index].checked = !newList[index].checked;
    this.setState({ list: newList });
  }
  addItemHandler() {
    if(!this.state.keyword.trim()) {
      alert('请输入有效信息！')
      return
    }
    let newList = [...this.state.list];
    newList.push({
      id: Math.random() * 1000000,
      text: this.state.keyword,
    });
    this.setState({ list: newList, keyword: "", checked: false });
  }
  deleteHandler(index) {
    let newList = this.state.list;
    newList.splice(index, 1);
    this.setState({ list: newList });
  }
}
