import React, { useState } from "react";

import { Layout, theme } from "antd";
const { Sider, Content, Footer } = Layout;
import LogoComponent from "./LogoComponent";
import { Route } from "react-router-dom";

import Home from "../../Pages/Home";
import TimerView from "../Timer";
import myTimer from "../../store/timer";
import Menu from "./Menu";
import Header from "./Header";
import Dashboard from "../../Pages/Dashboard";
const PageSkeleton = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const isLoginPath = () => {
        return window.location.pathname === "/login";
    };

    return (
        <Layout style={{ flex: "auto" }}>
            {isLoginPath() || (
                <>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <LogoComponent collapsed={collapsed} />
                        <Menu />
                    </Sider>
                    <Layout>
                        <Header
                            collapsed={collapsed}
                            setCollapsed={setCollapsed}
                        />
                        <Content
                            style={{
                                margin: "24px 16px",
                                padding: 24,
                                minHeight: 280,
                                background: colorBgContainer,
                                overflow: "hidden",
                            }}
                        >
                            <Route path="/home" component={Home} />
                            <Route path="/dashboard" component={Dashboard} />
                            <div id="container"></div>
                        </Content>
                        <Footer
                            style={{
                                textAlign: "center",
                            }}
                        >
                            <TimerView timer={myTimer} />
                            <div>powered by shaokaodashi</div>
                        </Footer>
                    </Layout>
                </>
            )}
        </Layout>
    );
};

export default PageSkeleton;