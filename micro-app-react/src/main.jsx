import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "@router/index.jsx";
import microApp from "@micro-zoe/micro-app";
import { RouterProvider } from "react-router-dom";

console.log(microApp)
microApp.start();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
