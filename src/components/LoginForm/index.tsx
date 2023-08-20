import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import request from "../../request/index";
import { useHistory } from "react-router-dom";
type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};
const labelNames = {
    password: "密码",
    username: "用户名",
};

const LoginForm: React.FC = () => {
    const history = useHistory();
    const onFinish = (values: FieldType) => {
        console.log("Success:", values);
        request.post("/api/login", values).then((response) => {
            response.status == 200;
            history.push("/home");
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
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
                    { required: true, message: "Please input your username!" },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label={labelNames.password}
                name="password"
                rules={[
                    { required: true, message: "Please input your password!" },
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
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
