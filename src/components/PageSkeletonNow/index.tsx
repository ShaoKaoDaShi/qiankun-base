import React, { useState } from "react";

import { Button, Layout, theme } from "antd";
const { Sider, Content, Footer } = Layout;
import LogoComponent from "./LogoComponent";
import { Route } from "react-router-dom";

import Home from "../../Pages/Home";
import TimerView from "../Timer";
import myTimer from "../../store/timer";
import Menu from "./Menu";
import Header from "./Header";
import Dashboard from "../../Pages/Dashboard";
import menuStore from "../../store/menuStore";
import request from "../../request";
import Cookies from "js-cookie";
import Rrweb from "../../Pages/Rrweb";
import ErrorDashboard from "../../Pages/ErrorDashboard";
import ErrorListenProjects from "../../Pages/ErrorListenProjects";
import { AxiosResponse } from "axios";

const PageSkeleton = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const isLoginPath = () => {
        return window.location.pathname === "/login";
    };
    if (menuStore.initBool === false) {
        const username = Cookies.get("username");
        request
            .post("/api/menuList", { username: username })
            .then((response: AxiosResponse<{ menuList: string[] }>) => {
                menuStore.setMenuList(response.data?.menuList || []);
            });
    }
    return (
        <Layout style={{ flex: "auto" }}>
            {isLoginPath() || (
                <>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <LogoComponent collapsed={collapsed} />
                        <Menu menuStore={menuStore} />
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
                                overflow: "scroll",
                            }}
                        >
                            <Route path="/home" component={Home} />
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/rrweb" component={Rrweb} />
                            <Route
                                path="/errorDashboard"
                                component={ErrorDashboard}
                            />
                            <Route
                                path="/errorListenProjectList"
                                component={ErrorListenProjects}
                            />
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
