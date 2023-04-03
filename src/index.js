import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
// import App from './状态/StateDemo';
import reportWebVitals from "./reportWebVitals";
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
// import App from "./demo/通信/状态提升/testRequestJson";
// import App from "./demo/通信/发布订阅/testRequestJson";
// import App from "./demo/通信/插槽/slotDemo";
// import App from "./demo/生命周期/lifecycle";
// import App from "./demo/生命周期/lifecycleDemo";
import App from "./demo/生命周期/销毁";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();