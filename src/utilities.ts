import { EventFireFunction } from "./type";
import { SimpleChange } from "property-watch-decorator";

export function eventFireExecutor<T>(callback: EventFireFunction|undefined, eventName: string|false|undefined, changeDetail: SimpleChange<T>|undefined) {
  if (callback !== undefined) {
    if (eventName !== undefined && eventName != false) { callback(eventName, changeDetail); }
  }
}
