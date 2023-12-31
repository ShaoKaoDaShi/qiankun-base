import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import request from "../../request/index";
import { useHistory } from "react-router-dom";
import menuStore, { MenuItem } from "../../store/menuStore";
import styles from "./index.module.css";
import { AxiosResponse } from "axios";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};
const labelNames = {
    password: "密码",
    username: "用户名",
};
const optionsLogin = [
    { label: "登录", value: "login" },
    { label: "注册", value: "register" },
];
const LoginForm: React.FC = () => {
    const history = useHistory();
    const [loginType, setLoginType] = useState("login");
    const onFinish = (values: FieldType) => {
        console.log("Success:", values);
        if (loginType === "login") {
            request
                .post("/api/user/login", values)
                .then((response: AxiosResponse<{ errMsg: string }>) => {
                    if (response.data.errMsg) return;
                    history.push("/home");
                    menuStore.setInitBool(false);
                });
        } else {
            request
                .post("/api/user/register", values)
                .then((response: AxiosResponse<{ errMsg: string }>) => {
                    if (response.data.errMsg) return;
                    history.push("/home");
                    menuStore.setInitBool(false);
                });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const loginTypeChange = ({ target: { value } }: RadioChangeEvent) => {
        setLoginType(value);
    };

    return (
        <div>
            <Radio.Group
                className={styles.radioType}
                options={optionsLogin}
                onChange={loginTypeChange}
                value={loginType}
                optionType="button"
                buttonStyle="solid"
            />
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: false }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label={labelNames.username}
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label={labelNames.password}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100px" }}
                    >
                        {loginType === "login" ? "登录" : "注册"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
