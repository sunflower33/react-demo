import { Component } from "react";

export default class Lifecycle extends Component {
  componentWillMount() {
    console.log("componentWillMount");
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  render() {
    console.log("render");
    return <div>lifecycle</div>;
  }
}
