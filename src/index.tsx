import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { start } from "qiankun";
import "./router/registMicroApps";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./request/index";
import Router from "./router";
import './rrweb'
// import './sentry'



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Router />
    </BrowserRouter>
);

if(!process.env.not_qiankun){
    start();
}

