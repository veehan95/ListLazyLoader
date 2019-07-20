import { ListUpdateAlgorithm } from "./type";

export interface ListLoaderInterface<ListItem> {
  loading: boolean
  endOfList: boolean
  list: ListItem[]
  fullList: ListItem[]
  loadMore(increaseBy?: number): void
  updateList(list: ListItem[], listlistUpdateAlgorithm?: ListUpdateAlgorithm)
};
