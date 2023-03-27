import { Component } from "react";

export default class ControlledField extends Component {
  state = {
    value: "",
  };
  reset = ()=>{
    this.setState({
      value: ''
    })
  }
  render() {
    return (
      <div>
        <span>{this.props.label}: </span>
        <input
          type={this.props.type}
          value={this.state.value}
          onChange={(evt) => {
            this.setState({
              value: evt.target.value,
            });
          }}
        />
      </div>
    );
  }
}
