import React, { Component } from "react";
import BetterScroll from "better-scroll";

export default class BetterScrollComponent extends Component {
  state = {
    list: [],
  };
  render() {
    return (
      <div>
        <button onClick={() => this.handleClick()}>CLick</button>
        <div
          className="wrapper"
          style={{ height: "200px", overflow: "hidden", background: 'yellow' }}
        >
          <ul>
            {this.state.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  handleClick() {
    const list = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ];
    this.setState({ list }, () => {
        // console.log(document.querySelectorAll('li'))
        new BetterScroll(".wrapper");
    });
    // console.log('scyn',document.querySelectorAll('li'))

}
}
