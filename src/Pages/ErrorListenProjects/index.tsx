import React, { useEffect, useState } from "react";
import { Card, List, Layout, Button, Drawer, Space, Form, Input } from "antd";
import request from "../../request";
import type { Project } from "./type";
const ErrorListenProjects = () => {
    const [errorListenProjects, setErrorListenProjects] = useState<
        (Project & { title: string })[]
    >([]);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    useEffect(() => {
        request.post("/api/rrwebProjects/getAll").then((res) => {
            const data = res.data as Project[];
            console.log(data);
            setErrorListenProjects(
                data.map((item) => ({ ...item, title: item.projectName })),
            );
        });
    }, []);
    const onClose = (e) => {
        if (e.target.innerText === "确 认") {
            request
                .post("/api/rrwebProjects/addOne", form.getFieldsValue())
                .then((res) => {
                    setOpen(false);
                });
        } else {
            setOpen(false);
        }
    };

    return (
        <Layout>
            <Layout.Header>
                <Button onClick={() => setOpen(true)}>添加新的监控项目</Button>
            </Layout.Header>
            <Layout.Content style={{ margin: "15px 10px 0" }}>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={errorListenProjects}
                    renderItem={(item) => (
                        <List.Item>
                            <Card title={item.title}>{item.projectId}</Card>
                        </List.Item>
                    )}
                />
            </Layout.Content>
            <Drawer
                title={`添加新的监控项目`}
                placement="right"
                size={"large"}
                onClose={onClose}
                open={open}
                maskClosable={false}
                closeIcon={false}
                extra={
                    <Space>
                        <Button onClick={onClose}>取消</Button>
                        <Button type="primary" onClick={onClose}>
                            确认
                        </Button>
                    </Space>
                }
            >
                <Form form={form}>
                    <Form.Item name="projectName" label="项目名称">
                        <Input />
                    </Form.Item>
                    <Form.Item name="url" label="WebHook URL">
                        <Input />
                    </Form.Item>
                </Form>
            </Drawer>
        </Layout>
    );
};
export default ErrorListenProjects;
