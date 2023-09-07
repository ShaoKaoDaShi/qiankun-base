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
import menuStore, { MenuItem } from "../../store/menuStore";
import request from "../../request";
import Cookies from "js-cookie";
import Rrweb from "../../Pages/Rrweb";
import ErrorDashboard from "../../Pages/ErrorDashboard";
import ErrorListenProjects from "../../Pages/ErrorListenProjects";
import { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";

const PageSkeleton = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const history = useHistory();

    const isLoginPath = () => {
        return window.location.pathname === "/login";
    };
    if (menuStore.initBool === false) {
        const username = Cookies.get("username");
        request
            .post("/api/menuList", { username: username })
            .then((response: AxiosResponse<{ menuList: MenuItem[] }>) => {
                menuStore.setMenuList(response.data?.menuList || []);

                function containTreeItem(pathArr: string[], tree = []) {
                    if (pathArr.length === 0) return true;
                    const pathItem = pathArr.shift();
                    for (let i = 0; i < tree.length; i++) {
                        if (pathItem.includes(tree[i].key)) {
                            return containTreeItem(pathArr, tree[i].children);
                        }
                    }
                    return false;
                }

                const pathArr = location.pathname.split("/");
                pathArr.shift();
                if (!containTreeItem(pathArr, menuStore.menuList)) {
                    history.push("/home");
                }
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
