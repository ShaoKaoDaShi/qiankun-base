import React, { useRef, useState, useMemo } from "react";
import { Alert, Button, Layout, Modal, theme, Space } from "antd";
import replay from "../../rrweb/player";

const { Header, Content } = Layout;
const Rrweb = () => {
    const ref = useRef<HTMLDivElement>();

    const createPlayer = () => {
        Array.prototype.forEach.call(ref.current?.children||[],item=>item?.remove())
        replay(ref.current);
    };

    const handleClosePlayer = () => {
        ref.current.firstElementChild.remove();
    };
    return (
        <Layout>
            <Header style={{ background: "#fff" }}>
                <Space>
                    <Button onClick={createPlayer} type="primary">
                        replay
                    </Button>
                    <Button
                        onClick={() => {
                            throw new Error("I dont know");
                        }}
                    >
                        throw error
                    </Button>
                    <Button onClick={() => alert("ok")}>ok</Button>
                    <Button onClick={handleClosePlayer}>close player</Button>
                </Space>
            </Header>
            <Content style={{ padding: "10px" }}>
                <div ref={ref} id="rrwebPlayer"></div>
            </Content>
        </Layout>
    );
};
export default Rrweb;
