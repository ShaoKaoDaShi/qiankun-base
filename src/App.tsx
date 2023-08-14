import React from "react";
import { Breadcrumb, Layout, Menu, theme, Image,Button } from "antd";
import { Link, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import TimerView from "./components/Timer";
import timer from "./store/timer";
import BaseTabs from "./components/BaseTabs";
import tabStore from "./store/tabs";
import LoginPage from "./Pages/Login";

import * as path from "path";
const { Header, Content, Footer } = Layout;

const MICROAPPS = [
  { key: "/home", label: "主应用" },
  { key: "/react", label: "react应用" },
  { key: "/vue", label: "vue应用" },
  { key: "/login", label: "登录" },
];

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [breadcrumbList, setBreadcrumbList] = useState([""]);
  const popstateHandler = useCallback(() => {
    setBreadcrumbList(window.location.pathname.split("/"));
  }, []);
  useEffect(() => {
    window.addEventListener("popstate", popstateHandler);
    return () => {
      window.removeEventListener("popstate", popstateHandler);
    };
  }, [popstateHandler]);
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          style={{
            flex: 1,
          }}
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={MICROAPPS.map((_) => {
            const key = _.key === "/home" ? "/" : _.key;
            // const Label = <Link to={key}>{_.label}</Link>;
            const Label = <Button onClick={(_)=>{
                tabStore.addOneTab({label:'router add', children:<LoginPage/>, key:'router add '+tabStore.tabsArray.length+1})
            }}>{_.label} </Button>
            // const Label = _.label;
            return {
              key: _.key,
              label: Label,
            };
          })}
        />
      </Header>

      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          {breadcrumbList.map((item, index) => {
            if (window.location.pathname === "/")
              return <Breadcrumb.Item key={index}>Home</Breadcrumb.Item>;
            return (
              <Breadcrumb.Item key={index}>
                {item === ""
                  ? "Home"
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
        <BaseTabs tabStore={tabStore} />

        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          {(window.location.pathname === "/" ||
            window.location.pathname === "/home") && (
            <Image src="https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png" />
          )}
          <div id="container">R</div>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        <TimerView timer={timer} />
        <div>powered by shaokaodashi</div>
      </Footer>
    </Layout>
  );
};
export default App;