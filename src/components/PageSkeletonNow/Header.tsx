import { Layout, Button, theme, Dropdown, Avatar } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import React from "react";
const { Header: AntHeader } = Layout;
import styles from "./index.module.css";
import logo from "./logo.png";
import Cookies from "js-cookie";
interface PropsType {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({ collapsed, setCollapsed }: PropsType) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const items: MenuProps["items"] = [
        {
            label: <Link to="/login">退出登录</Link>,
            key: "0",
            onClick: () => {
                Object.keys(Cookies.get()).forEach((key) => {
                    Cookies.remove(key);
                });
            },
        },
    ];
    return (
        <AntHeader
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
        </AntHeader>
    );
};

export default Header;
