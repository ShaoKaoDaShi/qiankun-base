import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import {
    Menu as AntMenu,
} from "antd";
const Menu = () => {
    const getSelectedKey = () => {
        const key = window.location.pathname
            .split("/")
            .filter((path) => path)
            .join("-");
        return key;
    };
    const history = useHistory();
    async function historyGo(key: string) {
        history.push(`/${key}`);
    }
    return (
        <AntMenu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["home"]}
            selectedKeys={[getSelectedKey()]}
            onClick={(info) => {
                historyGo(info.key.replace("-", "/"));
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
                            key: "react-home",
                            icon: <UserOutlined />,
                            label: "react home",
                        },
                        {
                            key: "react-reactLogo",
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
    );
};
export default Menu