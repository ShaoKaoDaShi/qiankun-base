import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  registerMicroApps, // 注册应用
  start, // 开启方法
} from "qiankun";
import { BrowserRouter } from "react-router-dom";
document.cookie="access-token=123456789"
//  const router = createBrowserRouter([
//   {
//     path: "/",
//     element:<App/> ,
//     errorElement:<App/>
//     // children:[
//     //   {
//     //     path: "/react",
//     //     element: <div id='container'>123</div>,
//     //   },
//     //   {
//     //     path: "/vue",
//     //     element: <div ></div>,
//     //   },
//     // ]
//   }
// ]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
  // <RouterProvider  router={router} fallbackElement={<App/>}/>
);

const apps = [
  {
    name: "vue-web-app", // 应用名字
    entry: "//localhost:8082", // 默认会加载这个html 解析里面的js(这里使用的fetch) 动态的执行(子应用必须支持跨域)
    container: "#container", // 容器名 挂载元素
    activeRule: "/vue", // 激活路径 激活规则(当访问/vue 就把这个应用挂载到#vue上)
    props: { a: 1 },
  },
  {
    name: "react-web-app",
    entry: "//localhost:8081",
    container: "#container",
    activeRule: "/react",
  },
];
registerMicroApps(apps); // 注册应用
start({
  prefetch: false, // 取消预加载
}); // 开启
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
