import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { start } from "qiankun";
import "./router/registMicroApps";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import "./request/index";
import Router from "./router";

if (!Cookies.get("access-token")) {
    Cookies.set("access-token", "123456789");
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Router />
    </BrowserRouter>
);

start();
