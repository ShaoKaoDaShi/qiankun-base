import timer from "./store/timer";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  registerMicroApps, // 注册应用
  start,
} from "qiankun";
import { BrowserRouter, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./request/index";
import Login from "./Pages/Login";
import myWindow from "./store/window";
import auth from "./auth/auth";
if (!Cookies.get("access-token")) {
  Cookies.set("access-token", "123456789");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Route exact path="/" component={auth(App)} />
    <Route path="/home" component={auth(App)} />
    <Route
      path="/login"
      component={() => <Login myWindow={myWindow} />}
    />
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
    props: { timer: timer },
  },
];
registerMicroApps(apps);
start();
