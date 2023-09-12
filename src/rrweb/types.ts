import type { eventWithTime } from "@rrweb/types";
interface RrwebError {
    errorInfo: { message: string; stack: string };
    events: eventWithTime[];
    timestamp: number;
    projectId: string;
}
interface ResponseRrwebError extends RrwebError {
    isDeal: boolean;
}

export { RrwebError, ResponseRrwebError };
