import React, { useState } from "react";
import { Button, Col, Layout, Row, Space, theme } from "antd";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import VideoChat from "../VideoChat";

const LowCodeEditor = () => {
    const [buttonList, setButtonList] = useState([]);
    const handleButtonClick = React.useCallback(() => {
        setButtonList([...buttonList, "button"]);
    }, [buttonList]);
    const renderButtonList = React.useCallback(() => {
        return buttonList.map((item, index) => {
            return (
                <Draggable key={index}>
                    <Resizable>
                        <Button style={{ transition: "none" }}>button</Button>
                    </Resizable>
                </Draggable>
            );
        });
    }, [buttonList]);
    return (
        <Layout style={{ flex: 1, flexDirection: "column" }}>
            <Layout.Header
                style={{
                    // background: " content-box",
                    border: "1px solid",
                    borderRadius: "4px",
                }}
            >
                低代码编辑器
            </Layout.Header>
            <Layout.Content
                style={{ flexDirection: "row", display: "flex", flex: 1 }}
            >
                {/* <Space
                    style={{ flexDirection: "row", display: "flex", flex: 1 }}
                > */}
                <Row style={{ flex: 1 }}>
                    <Col
                        span={3}
                        style={{
                            // background: " content-box",
                            border: "1px solid",
                            borderRadius: "4px",
                        }}
                    >
                        <Button
                            size="small"
                            type="primary"
                            onClick={handleButtonClick}
                        >
                            按钮
                        </Button>
                    </Col>
                    <Col
                        span={18}
                        style={{
                            // background: " content-box",
                            border: "1px solid",
                            borderRadius: "4px",
                        }}
                    >
                        {/* {renderButtonList()} */}
                        编辑器区
                        <div>123123</div>
                    </Col>
                    <Draggable>
                        <Col
                            span={3}
                            style={{
                                // background: " content-box",
                                border: "1px solid",
                                borderRadius: "4px",
                            }}
                        >
                            属性区
                        </Col>
                    </Draggable>
                </Row>
                {/* </Space> */}
                <VideoChat />
            </Layout.Content>
        </Layout>
    );
};
export default LowCodeEditor;
