import timer from "./store/timer";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  registerMicroApps, // 注册应用
  start,
} from "qiankun";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import "./request/index";
import Login from "./Pages/Login";
import myWindow from "./store/window";
import auth from "./auth/auth";
import Router from './router'

if (!Cookies.get("access-token")) {
  Cookies.set("access-token", "123456789");
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {/* <Switch>
      <Route exact path="/" component={auth(App)} />
      <Route exact path="/home" component={auth(App)} />
      <Route exact path="/react" component={auth(App)} />
      <Route exact path="/vue" component={auth(App)} />
    </Switch>

    <Route path="/login" component={() => <Login myWindow={myWindow} />} /> */}
    <Router/>
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
