import { Component } from "react";

export default class Lifecycle extends Component {
  // UNSAFE_componentWillMount() {
  //   console.log("componentWillMount");
  // }
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
