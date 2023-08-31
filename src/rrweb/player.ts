import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";
import request from "../request";
import type { RrwebError } from "./types";

const replay = (target) => {
    let player: rrwebPlayer;
    request.post("/api/rrweb/get").then(({ data }) => {
        const { errorInfo, events } = (data as RrwebError[]).pop();
        if (events.length < 2) return;
        player = new rrwebPlayer({
            // target: document.querySelector("#rrwebPlayer"), // 可以自定义 DOM 元素
            target: target, // 可以自定义 DOM 元素
            // 配置项
            props: {
                events: events,
            },
        });
    });
};

export default replay;
