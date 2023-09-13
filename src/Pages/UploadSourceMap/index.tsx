import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import React from "react";

import {
    Button,
    Checkbox,
    Col,
    ColorPicker,
    Form,
    InputNumber,
    Radio,
    Rate,
    Row,
    Select,
    Slider,
    Space,
    Switch,
    Upload,
} from "antd";
import request from "../../request";
import { RcFile } from "antd/es/upload";

const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const onFinish = (values) => {
    console.log("Received values of form: ", values);
};

const UploadSourceMap: React.FC = () => {
    const uploadRef = React.useRef(null);
    const normFile = (e) => {
        console.log("Upload event:", e.fileList);
        uploadRef.current = e;
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    return (
        <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{
                "input-number": 3,
                "checkbox-group": ["A", "B"],
                rate: 3.5,
                "color-picker": null,
            }}
            style={{ maxWidth: 600 }}
        >
            <Form.Item label={<h3>上传文件</h3>}>
                <Form.Item
                    name="sourcemap"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                >
                    <Upload.Dragger
                        name="files"
                        accept=".map"
                        multiple
                        customRequest={(uploadProps) => {
                            console.log(uploadProps);
                            const fromData = new FormData();
                            fromData.set("file", uploadProps.file);
                            request
                                .post(
                                    "/api/rrwebProjects/uploadSourceMap",
                                    fromData,
                                )
                                .then((res) => {
                                    uploadRef.current.fileList?.forEach(
                                        (item) => {
                                            if (
                                                item.uid ===
                                                (uploadProps.file as RcFile).uid
                                            ) {
                                                item.status = "done";
                                                item.percent = 100;
                                            }
                                            return item;
                                        },
                                    );
                                });
                        }}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            上传sourcemap文件, 文件后缀为.map
                        </p>
                        <p className="ant-upload-hint">
                            支持单个或多个文件上传
                        </p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>
        </Form>
    );
};

export default UploadSourceMap;
