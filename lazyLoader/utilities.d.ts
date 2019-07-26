import { EventFireFunction } from "./type";
import { SimpleChange } from "property-watch-decorator";
export declare function eventFireExecutor<T>(callback: EventFireFunction | undefined, eventName: string | false | undefined, changeDetail: SimpleChange<T> | undefined): void;
