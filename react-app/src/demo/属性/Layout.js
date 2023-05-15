import { Component } from "react";
import PublicComponent from "./PublicComponent";

export default class PropsDemo extends Component {
  state = {
    list: [
      {
        id: 1,
        title: "title1",
        isShown: true,
      },
      {
        id: 2,
        title: "title2",
        isShown: false,
      },
    ],
    
  };
  render() {
    return (
      <>
        {/* {this.state.list.map((item) => (
          <PublicComponent key={item.id} title={item.title} isShown={item.isShown} />
        ))} */}
        {this.state.list.map((item) => (
          <PublicComponent key={item.id} {...item} />
        ))}
        <PublicComponent title='测试默认属性' />
      </>
    );
  }
}
