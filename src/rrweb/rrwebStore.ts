import { makeAutoObservable } from "mobx"
import { eventWithTime } from "@rrweb/types";
class RrwebStore {
    events:eventWithTime[]

    constructor() {
        this.events =[]
        makeAutoObservable(this)
    }

    addEvents(_events:eventWithTime[]) {
      this.events.push(..._events)
    }
}

export {RrwebStore}
export default new RrwebStore()