import React, { useState, useRef, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar, Dropdown, MenuProps } from "antd";
const { Header, Sider, Content } = Layout;
import BaseTabs from "../BaseTabs";
import { TabsStore } from "../../store/tabs";
import LogoComponent from "./LogoComponent";
import tabFactory from "../BaseTabs/tabFactory";
import { observer } from "mobx-react-lite";
import { useHistory, Link } from "react-router-dom";
import styles from "./index.modules.css";
import logo from "./logo.png";
import { loadMicroApp } from "qiankun";

const PageSkeleton = observer<{ tabStore: TabsStore }>(({ tabStore }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const history = useHistory();
  async function historyGo(key: string) {
    history.push(`/${key}`);
  }
  const items: MenuProps["items"] = [
    {
      label: <Link to="/login">退出登录</Link>,
      key: "0",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];

  return (
    <Layout style={{ flex: "auto" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <LogoComponent collapsed={collapsed} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          selectedKeys={[tabStore.activeKey]}
          onClick={(info) => {
            const keyPath = info.keyPath;
            const key = keyPath.reverse().join("/");
            if (!tabStore.isTabExist(info.key)) {
              tabStore.addOneTab(
                tabFactory({
                  key: key,
                  label: (info.domEvent.target as HTMLSpanElement).innerText,
                  children: <div id={info.key}>{key}</div>,
                }),
              );
            }
            tabStore.setActiveKey(key);
            historyGo(key);
            console.log(info);
            // loadMicroApp(    {
            //   name: "react-web-app",
            //   entry: "//localhost:8081",
            //   container: "#reactLogo",
            // })
          }}
          items={[
            {
              key: "home",
              icon: <UserOutlined />,
              label: "主应用",
            },
            {
              key: "react",
              icon: <VideoCameraOutlined />,
              label: "react子应用",
              children: [
                {
                  key: "reactLogo",
                  icon: <UserOutlined />,
                  label: "react logo",
                },
              ],
            },
            {
              key: "vue",
              icon: <UploadOutlined />,
              label: "vue子应用",
            },
            {
              key: "dashboard",
              icon: <UploadOutlined />,
              label: "dashboard",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            marginBottom: "3px",
          }}
          className={styles.header}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown menu={{ items }} trigger={["click"]} placement="bottom">
            <Avatar src={logo} />
          </Dropdown>
        </Header>

        {/* <Content
          style={{
            // margin: "24px 16px",
            // padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        > */}
        <BaseTabs tabStore={tabStore} />
        {/* Content
        </Content> */}
      </Layout>
    </Layout>
  );
});

export default PageSkeleton;
