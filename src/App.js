import "./index.css";
import {store} from "./redux/store";
// import App from './状态/StateDemo';
// import App from "./demo/状态/SetState同步异步";
// import App from "./demo/状态/BetterScroll";
// import App from "./demo/属性/Layout";
// import App from "./demo/函数式组件/functionComponentParent";
// import App from "./demo/受控组件与非受控组件/非受控组件";
// import App from "./demo/受控组件与非受控组件/受控组件";
// import App from "./demo/循环渲染/index";
// import App from "./demo/受控组件与非受控组件/受控组件demo";
// import App from "./demo/通信/父传子-callback";
// import App from "./demo/通信/demoRef";
// import App from "./demo/通信/插槽/slotDemo";
// import App from "./demo/生命周期/生命周期V1/lifecycle";
// import App from "./demo/生命周期/生命周期V1/销毁";
// import App from "./demo/生命周期/生命周期V2/getDerivedStateFromProps";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getBatchOptions } from "./redux/actionCreator/BatchOptions";
import WindowLayout from "./layout/WindowLayout";

function App() {
  useEffect(() => {
    if (!store.getState()?.ReducerOptions?.dataOptions) {
      store.dispatch(getBatchOptions(["country"]));
    }
    store.subscribe(() => {
      console.log("App订阅----", store.getState().ReducerOptions.dataOptions);
    });
  });
  return <WindowLayout />;
}
// connect( 将来给传给子组件的属性， 传给子组件传来的回调函数)
export default connect(() => {
  return {};
},)(App);
