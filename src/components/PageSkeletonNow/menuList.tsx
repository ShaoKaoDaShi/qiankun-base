import React from "react";
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
const menuList = [
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
            {
                key: "react-antdLogo",
                icon: <UserOutlined />,
                label: "antd logo",
            },
        ],
    },
    {
        key: "vue",
        icon: <UploadOutlined />,
        label: "vue子应用",
        children: [
            {
                key: "vue-bar",
                icon: <UserOutlined />,
                label: "vue bar",
            },
            {
                key: "vue-foo",
                icon: <UserOutlined />,
                label: "vue foo",
            },
        ],
    },
    {
        key: "dashboard",
        icon: <UploadOutlined />,
        label: "dashboard",
    },
    {
        key: "rrweb",
        icon: <UploadOutlined />,
        label: "rrweb",
    },
    {
        key: "errorDashboard",
        icon: <UploadOutlined />,
        label: "errorDashboard",
    },
];
export default menuList;