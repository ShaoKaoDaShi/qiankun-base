import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton, Typography } from "antd";
import request from "../../request";
import Cookies from "js-cookie";
import { AxiosResponse } from "axios";
import type { Project } from "./type";
const { Text, Paragraph, Link } = Typography;

const ProjectList = ({
    update,
    onEdit,
}: {
    update: boolean;
    onEdit: (item: Project) => void;
}) => {
    const [initLoading, setInitLoading] = useState(true);
    const [data, setData] = useState<Project[]>([]);

    useEffect(() => {
        request
            .post("/api/rrwebProjects/getAll", {
                userId: Cookies.get("userId"),
            })
            .then((res: AxiosResponse<Project[]>) => {
                const data = res.data?.map((item) => ({
                    ...item,
                    title: item.projectName,
                }));
                setData(data);
                setInitLoading(false);
            });
    }, [update]);

    return (
        <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item
                    actions={[
                        <Button
                            key={index}
                            type="primary"
                            onClick={() => onEdit(item)}
                        >
                            edit
                        </Button>,
                    ]}
                >
                    <Skeleton avatar title={false} active loading={initLoading}>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                                />
                            }
                            title={<Text>{item.projectName}</Text>}
                            description={
                                <Paragraph copyable>{item.projectId}</Paragraph>
                            }
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    );
};

export default ProjectList;
