import { eventWithTime } from "@rrweb/types";
interface RrwebError {
    errorInfo: {message:string, stack:string};
    events: eventWithTime[];
}

export {RrwebError}