import * as rrweb from "rrweb";
import request from "../request";
import { eventWithTime } from "@rrweb/types";
import * as _ from "lodash";
import type { RrwebError } from "./types";

const eventsMatrix:eventWithTime[][] = [[],[],[]];

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
    checkoutEveryNms: 5 * 1000, // checkout every 5 minutes
});

// send last two events array to the backend
window.addEventListener("error",function (e) {
    const len = eventsMatrix.length;
    let events = eventsMatrix[len - 2]
        ? eventsMatrix[len - 2].concat(eventsMatrix[len - 1])
        : eventsMatrix[len - 1];
    if(events.length>600){
        events = events.slice(0,300).concat(events.slice(events.length-301,events.length))
    }
    const body:RrwebError = { errorInfo:{message:e.message, stack:e.error.stack} ,events };
    request.post(
        "/api/rrweb/save",
        body
    );
})

