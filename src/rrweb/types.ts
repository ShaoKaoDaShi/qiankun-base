import type { eventWithTime } from "@rrweb/types";
interface RrwebError {
    projectName: string;
    errorInfo: { message: string; stack: string };
    events: eventWithTime[];
}
interface ResponseRrwebError extends RrwebError {
    isDeal: boolean;
    timestamp: number;
    projectId: number;
}

export { RrwebError, ResponseRrwebError };
