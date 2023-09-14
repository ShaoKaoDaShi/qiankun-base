import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, List, Layout, Button, Drawer, Space, Form, Input } from "antd";
import request from "../../request";
import type { Project } from "./type";
import Cookies from "js-cookie";
import ProjectList from "./ProjectList";

const ErrorListenProjects = () => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm<{ projectName: string; url: string }>();
    const [refresh, setRefresh] = useState(false);
    const [editType, setEditType] = useState(false);
    const currentProject = useRef<Project>(null);

    const onClose = (e) => {
        if (e.target.innerText === "确 认") {
            const url =
                "/api/rrwebProjects/" + (editType ? "updateOne" : "addOne");
            console.log(form.getFieldsValue());

            request
                .post(url, {
                    ...currentProject.current,
                    ...form.getFieldsValue(),
                    userId: Cookies.get("userId"),
                })
                .then((res) => {
                    setOpen(false);
                    setRefresh(!refresh);
                });
        } else {
            setOpen(false);
        }
    };
    const handleEditProject = (item: Project) => {
        setOpen(true);
        setEditType(true);
        form.setFieldsValue({
            projectName: item.projectName,
            url: item.dingDingBot?.url,
        });
        currentProject.current = item;
    };

    return (
        <Layout>
            <Space>
                <Button
                    onClick={() => setOpen(true)}
                    type="primary"
                    style={{ margin: "10px" }}
                >
                    添加新的监控项目
                </Button>
            </Space>
            <Layout.Content style={{ margin: "15px 10px 0" }}>
                <ProjectList update={refresh} onEdit={handleEditProject} />
            </Layout.Content>
            <Drawer
                title={editType ? "编辑监控项目" : `添加监控项目`}
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
                    <Form.Item name="keyword" label="WebHook keyword">
                        <Input />
                    </Form.Item>
                </Form>
            </Drawer>
        </Layout>
    );
};
export default ErrorListenProjects;
