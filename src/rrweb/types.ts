import type { eventWithTime } from "@rrweb/types";
interface RrwebError {
    projectName: string;
    errorInfo: { message: string; stack: string };
    events: eventWithTime[];
    timestamp: number;
}
interface ResponseRrwebError extends RrwebError {
    isDeal: boolean;
    projectId: number;
}

export { RrwebError, ResponseRrwebError };
