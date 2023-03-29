import { Component } from "react";

export default class ListItem extends Component {
  static defaultProps = {
    list: [],
  };
  render() {
    return (
      <>
        <ul>
          {this.props.list.map((item, index) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => this.props.checkHandler(index)}
              />
              <span
                style={{ textDecoration: item.checked ? "line-through" : "" }}
              >
                {item.text}
              </span>
              <button onClick={this.props.deleteHandler.bind(this, index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        {!this.props.list?.length && this.props.children}
      </>
    );
  }
}
