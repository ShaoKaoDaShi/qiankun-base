import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
const { Header, Content, Footer } = Layout;

const MICROAPPS = [
  { key: "/home", label: "主应用" },
  { key: "/react", label: "react应用" },
  { key: "/vue", label: "vue应用" },
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
            const Label = <Link to={key}>{_.label}</Link>;
            // const Label = _.label;
            return {
              key: _.key,
              label: Label,
            };
          })}
          onClick={({ key }) => {
            // history.push(key==="home" ?"":key)
            // history.replace(key==="home" ?"":key)
          }}
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
            if ((window.location.pathname === "/"))
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
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <div id="container">{/* <Outlet /> */}</div>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        <div>powered by shaokaodashi</div>
      </Footer>
    </Layout>
  );
};
export default App;
