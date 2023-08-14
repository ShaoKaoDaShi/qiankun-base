import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import React from "react";
const routeList = [
    {
        key: "home",
        icon: <UserOutlined />,
        label: "主应用",
        el: <div id="home">home</div>,
        closeIcon: false,
    },
    {
        key: "react",
        icon: <VideoCameraOutlined />,
        label: "react子应用",
        el: <div id="react">react子应用</div>,
    },
    {
        key: "vue",
        icon: <UploadOutlined />,
        label: "vue子应用",
        el: <div id="vue">vue</div>,
    },
];

export default routeList;
