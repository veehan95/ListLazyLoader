import { ListLoaderInterface } from "./interface";
import { Setting, ListUpdateAlgorithm, CallBackFunction, EventFireFunction } from "./type";
declare class ListLoader<ListItem> implements ListLoaderInterface<ListItem> {
    private _loading;
    readonly loading: boolean;
    private _endOfList;
    readonly endOfList: boolean;
    private _list;
    readonly list: ListItem[];
    private _fullList;
    readonly fullList: ListItem[];
    private _listLoader;
    listLoader: CallBackFunction<ListItem>;
    private _setting;
    setting: Setting;
    private _eventFire;
    eventFire: EventFireFunction;
    constructor(setting?: Setting, listLoader?: CallBackFunction<ListItem>, eventFire?: EventFireFunction);
    updateList(list: ListItem[], listUpdateAlgorithm?: ListUpdateAlgorithm): void;
    loadMore(increaseBy?: number): Promise<void>;
    resetList(): void;
    private trimmer;
}
declare const defaults: {
    setting: Setting;
};
export { Setting, ListLoaderInterface, ListLoader, ListUpdateAlgorithm, defaults, };
