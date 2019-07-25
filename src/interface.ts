import { ListUpdateAlgorithm, Setting } from "./type";

export interface ListLoaderInterface<ListItem> {
  loading: boolean
  endOfList: boolean
  list: ListItem[]
  fullList: ListItem[]
  setting: Setting
  eventFire: (eventName: string, details: any) => void
  loadMore(increaseBy: number): void
  updateList(list: ListItem[], listlistUpdateAlgorithm?: ListUpdateAlgorithm): void
  initList(): void
};
