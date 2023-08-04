import timer from './store/timer'
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  registerMicroApps, // 注册应用
  start,
} from "qiankun";
import { BrowserRouter } from "react-router-dom";
document.cookie="access-token=123456789"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
);

const apps = [
  {
    name: "vue-web-app",
    entry: "//localhost:8082",
    container: "#container",
    activeRule: "/vue",
    props: { timer: timer },
  },
  {
    name: "react-web-app",
    entry: "//localhost:8081",
    container: "#container",
    activeRule: "/react",
    props:{ timer: timer }
  },
];
registerMicroApps(apps);
start();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
