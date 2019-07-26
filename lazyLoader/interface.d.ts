import { ListUpdateAlgorithm, Setting } from "./type";
export interface ListLoaderInterface<ListItem> {
    loading: boolean;
    endOfList: boolean;
    list: ListItem[];
    fullList: ListItem[];
    setting: Setting;
    eventFire: (eventName: string, details: any) => void;
    loadMore(increaseBy?: number): Promise<void>;
    updateList(list: ListItem[], listlistUpdateAlgorithm?: ListUpdateAlgorithm): void;
    resetList(): void;
}
