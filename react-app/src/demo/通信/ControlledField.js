import { Component } from "react";

export default class ControlledField extends Component {
  render() {
    return (
      <input
        type={this.props.type}
        value={this.props.value}
        onChange={(evt) => {
          this.props.onChange(evt.target.value)
        }}
      />
    );
  }
}
