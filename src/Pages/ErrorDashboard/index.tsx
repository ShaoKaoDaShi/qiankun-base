import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, Table, Typography, Button, Modal, Space } from "antd";
import * as echarts from "echarts";
import request from "../../request";
import dayjs from "dayjs";
import { ResponseRrwebError, RrwebError } from "../../rrweb/types";
import RrwebWarp from "./RrwebWarp";
import * as _ from "lodash";
import "./index.css";
import { AxiosResponse } from "axios";

const { Text, Link, Paragraph, Title } = Typography;
let myChart = null;
interface TableItem {
    key: string;
    type: string;
    time: number;
    detail: string;
    count: number;
    projectId: string;
}
const ErrorDashboard = () => {
    const ref1 = useRef();
    const [seriesData, setSeriesData] = useState<number[]>([]);
    const [errorData, setErrorData] = useState<TableItem[]>([]);
    const [updateTableData, setUpdateTableData] = useState({});
    const columns = useMemo(() => {
        return [
            {
                title: "错误类型",
                dataIndex: "type",
                key: "type",
            },
            {
                title: "时间",
                dataIndex: "time",
                key: "time",
                width: "180px",
                render: (text: string) => {
                    return dayjs(text).format("YYYY/MM/DD HH:mm:ss");
                },
                sorter: (a, b) => b.time - a.time,
            },
            {
                title: "错误次数",
                width: "100px",
                dataIndex: "count",
                key: "count",
            },
            {
                title: "操作",
                width: "100px",
                dataIndex: "count",
                key: "count",
                render: (text: string, record: TableItem) => {
                    return (
                        <Space>
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => {
                                    Modal.error({
                                        title: (
                                            <Text underline type="danger">
                                                {record.type}
                                            </Text>
                                        ),
                                        content: (
                                            <RrwebWarp
                                                projectId={record.projectId}
                                                stack={record.detail}
                                            />
                                        ),
                                        okText: "关闭",
                                        width: 920,
                                    });
                                }}
                            >
                                错误回放
                            </Button>
                            <Button
                                type="primary"
                                danger
                                size="small"
                                onClick={() => {
                                    console.log("已解决");
                                    Modal.confirm({
                                        title: "bug 已解决",
                                        content: "这将更改或删除这个error记录",
                                        okText: "确认",
                                        cancelText: "取消",
                                        onOk: () => {
                                            request
                                                .post(
                                                    "/api/rrweb/updateErrorStatus",
                                                    {
                                                        projectId:
                                                            record.projectId,
                                                        stack: record.detail,
                                                        isDeal: true,
                                                    },
                                                )
                                                .then((res) => {
                                                    setUpdateTableData({});
                                                });
                                        },
                                    });
                                }}
                            >
                                已解决
                            </Button>
                        </Space>
                    );
                },
            },
        ];
    }, []);
    const xAxisData: string[] = useMemo(
        () =>
            Array(14)
                .fill(1)
                .map((_, i) =>
                    dayjs()
                        .subtract(13 - i, "day")
                        .format("YYYY/MM/DD"),
                ),
        [],
    );
    console.log(xAxisData);
    useEffect(() => {
        request
            .post("/api/rrweb/get", {
                projectId: "16b6b6b5-1c24-44c1-b7cf-739351c317f6",
            })
            .then((response: AxiosResponse<ResponseRrwebError[]>) => {
                const data = response.data;
                const newSeriesData = xAxisData.map((item) => {
                    const timeStart = dayjs(item).startOf("day").valueOf();
                    const timeEnd = dayjs(item).endOf("day").valueOf();
                    return data.filter((item) => {
                        const errorTime = item.timestamp;
                        return timeStart < errorTime && errorTime < timeEnd;
                    }).length;
                });
                const getErrorData = (data: ResponseRrwebError[]) => {
                    const map = new Map();
                    return data.reduce<TableItem[]>((pre, cur, index) => {
                        if (map.get(cur.errorInfo.stack) === undefined) {
                            pre.push({
                                projectId: cur.projectId,
                                key: index + "",
                                type: cur.errorInfo.message,
                                time: cur.timestamp,
                                detail: cur.errorInfo.stack,
                                count: 1,
                            });
                            map.set(cur.errorInfo.stack, 1);
                        } else {
                            const item = pre.find(
                                (item) => item.detail === cur.errorInfo.stack,
                            );
                            item.count++;
                            item.time = cur.timestamp;
                            item.detail = cur.errorInfo.stack;
                        }
                        return pre;
                    }, []);
                };
                const errorData = getErrorData(data);
                setErrorData(errorData);
                setSeriesData(newSeriesData);
            });
    }, [updateTableData]);
    useEffect(() => {
        if (seriesData.length < 1) return;
        myChart = echarts.init(ref1.current);

        const option = {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                },
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
            },
            xAxis: [
                {
                    type: "category",
                    data: xAxisData,
                    splitNumber: 14,
                    // axisTick: {
                    //     alignWithLabel: true,
                    // },
                },
            ],
            yAxis: [
                {
                    type: "value",
                },
            ],
            series: [
                {
                    name: "error数量",
                    type: "bar",
                    data: seriesData,
                },
            ],
            // dataZoom: [
            //     {
            //         type: 'inside',
            //         start: 50,
            //         end: 100
            //       },
            //     {
            //         id: "dataZoomX",
            //         type: "slider",
            //         show:false,
            //         // xAxisIndex: [0],
            //         // filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
            //         start: 50,
            //         end: 100,
            //     },
            // ],
        };
        myChart.setOption(option);
        function resizeChart() {
            myChart.resize();
        }
        const dResize = _.debounce(resizeChart, 100);
        window.addEventListener("resize", dResize);
        return () => {
            window.removeEventListener("resize", dResize);
        };
    }, [seriesData]);

    return (
        <Card title="错误统计" bordered={false}>
            <div
                ref={ref1}
                style={{ height: "300px", marginBottom: "15px" }}
            ></div>
            <Table
                columns={columns}
                dataSource={errorData}
                expandable={{
                    expandedRowRender: (record, index) => (
                        <>
                            {record.detail?.split("\n")?.map((item, i) => {
                                if (i == 0)
                                    return (
                                        <Title
                                            key={i}
                                            underline
                                            type="danger"
                                            level={5}
                                        >
                                            {item}
                                        </Title>
                                    );
                                return (
                                    <Text
                                        key={i}
                                        underline
                                        type="danger"
                                        style={{ marginLeft: "30px" }}
                                    >
                                        {item}
                                        <br />
                                    </Text>
                                );
                            })}
                        </>
                    ),
                    defaultExpandedRowKeys: ["0"],
                }}
            />
        </Card>
    );
};
export default ErrorDashboard;
