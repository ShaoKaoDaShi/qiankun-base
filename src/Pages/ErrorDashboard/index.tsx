import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, Table, Typography, Button, Modal } from "antd";
import * as echarts from "echarts";
import request from "../../request";
import dayjs from "dayjs";
import { RrwebError } from "../../rrweb/types";
import { eventWithTime } from "@rrweb/types";
import RrwebWarp from "./RrwebWarp";
import * as _ from "lodash";
import "./index.css";

const { Text, Link, Paragraph, Title } = Typography;
interface TableItem {
  key: string;
  type: string;
  time: number;
  detail: string;
  count: number;
  events: eventWithTime[];
}
const ErrorDashboard = () => {
  const ref1 = useRef();
  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [errorData, setErrorData] = useState<TableItem[]>([]);
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
                  content: <RrwebWarp events={record.events} />,
                  okText: "关闭",
                  width: 920,
                });
              }}
            >
              错误回放
            </Button>
          );
        },
      },
    ];
  }, []);
  let xAxisData: string[] = useMemo(
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
    request.post("/api/rrweb/get").then(({ data: _data }) => {
      const data = _data as RrwebError[];
      const newSeriesData = xAxisData.map((item) => {
        const timeStart = dayjs(item).startOf("day").valueOf();
        const timeEnd = dayjs(item).endOf("day").valueOf();
        return data.filter((item) => {
          if (item.events.length < 1) return false;
          const errorTime = item.events[0].timestamp;
          return timeStart < errorTime && errorTime < timeEnd;
        }).length;
      });
      const getErrorData = (data: RrwebError[]) => {
        const map = new Map();
        return data.reduce<TableItem[]>((pre, cur, index) => {
          if (map.get(cur.errorInfo.message) === undefined) {
            pre.push({
              key: index + "",
              type: cur.errorInfo.message,
              time: cur.events[0].timestamp,
              detail: cur.errorInfo.stack,
              count: 1,
              events: cur.events,
            });
            map.set(cur.errorInfo.message, 1);
          } else {
            const item = pre.find(
              (item) => item.type === cur.errorInfo.message,
            );
            item.count++;
            item.events = cur.events;
          }
          return pre;
        }, []);
      };
      const errorData = getErrorData(data);
      setErrorData(errorData);
      setSeriesData(newSeriesData);
    });
  }, []);
  useEffect(() => {
    if (seriesData.length < 1) return;
    var myChart = echarts.init(ref1.current);
    var option;

    option = {
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
      <div ref={ref1} style={{ height: "300px", marginBottom: "15px" }}></div>
      <Table
        columns={columns}
        dataSource={errorData}
        expandable={{
          expandedRowRender: (record, index) => (
            <>
              {record.detail?.split("\n")?.map((item, i) => {
                if (i == 0)
                  return (
                    <>
                      <Title underline type="danger" level={5}>
                        {item}
                      </Title>
                    </>
                  );
                return (
                  <>
                    <Text
                      key={i}
                      underline
                      type="danger"
                      style={{ marginLeft: "30px" }}
                    >
                      {item}
                    </Text>
                    <br />
                  </>
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
