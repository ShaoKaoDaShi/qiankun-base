import * as rrweb from "rrweb";
import request from "../request";
import { eventWithTime } from "@rrweb/types";
import * as _ from "lodash";
import type { RrwebError } from "./types";

const eventsMatrix:eventWithTime[][] = [[],[]];

rrweb.record({
    emit(event, isCheckout) {
        // isCheckout is a flag to tell you the events has been checkout
        if (isCheckout) {
            eventsMatrix.shift()
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
        input: 'last' // When input mulitple characters, only record the final input
      },
    checkoutEveryNms: 3 * 1000, // checkout every 5 minutes
});

// send last two events array to the backend
window.addEventListener("error",function (e) {
    const len = eventsMatrix.length;
    // 获取最近10秒内发生的事件
    let events = eventsMatrix[len - 2]
        ? eventsMatrix[len - 2].concat(eventsMatrix[len - 1])
        : eventsMatrix[len - 1];

    if(events.length>100){
        //防止发送过多的无效数据
        events = events.slice(events.length-100)
        // events = events.slice(0,300).concat(events.slice(events.length-301,events.length))
    }
    const body:RrwebError = { errorInfo:{message:e.message, stack:e.error.stack} ,events };
    request.post(
        "/api/rrweb/save",
        body
    );
})

