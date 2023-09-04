import * as rrweb from "rrweb";
import request from "../request";
import type { eventWithTime } from "@rrweb/types";
import * as _ from "lodash";
import type { RrwebError } from "./types";

const eventsMatrix: eventWithTime[][] = [[], []];

rrweb.record({
    emit(event, isCheckout) {
        if (isCheckout) {
            eventsMatrix.shift();
            eventsMatrix.push([]);
        }
        const lastEvents = eventsMatrix[eventsMatrix.length - 1];
        lastEvents.push(event);
    },
    sampling: {
        // do not record mouse movement
        mousemove: 200,
        // do not record mouse interaction
        mouseInteraction: false,
        // set the interval of scrolling event
        scroll: 150, // do not emit twice in 150ms
        // set the interval of media interaction event
        media: 800,
        // set the timing of record input
        input: "last",
    },
    checkoutEveryNms: 3 * 1000, // checkout every 5 minutes
});
function errorHandler(e) {
    // request.post("/ding", {
    //     msgtype: "text",
    //     text: {
    //         content: "监控报警: " + e.message,
    //     },
    // });
    fetch(
        "https://oapi.dingtalk.com/robot/send?access_token=a6b6ca5fb0456352000d565b90b4d23c7871b0df92a37136751d8933f6de98d1",
        {
            method: "POST",
            body: JSON.stringify({
                msgtype: "text",
                text: {
                    content: "监控报警: " + e.message,
                },
            }),
        },
    );
    const len = eventsMatrix.length;

    let events = eventsMatrix[len - 2]
        ? eventsMatrix[len - 2].concat(eventsMatrix[len - 1])
        : eventsMatrix[len - 1];

    if (events.length > 100) {
        events = events.slice(events.length - 100);
    }
    const body: RrwebError = {
        errorInfo: { message: e.message, stack: e.error.stack },
        events,
    };
    request.post("/api/rrweb/save", body);
}
// 防止同一个错误捕获两次
const debErrorFun = _.debounce(errorHandler, 100);

window.addEventListener("error", debErrorFun);
