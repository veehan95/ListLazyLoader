export type ListUpdateAlgorithm = "autoMerge"|"directAppend"|"override"|undefined;

export type Setting = {
  maxInView_init?: number,
  increaseSize?: number,
  listUpdateAlgorithm?: ListUpdateAlgorithm,
  loadMoreFromExternal?: boolean,
  events?: {
    loading?: string|false,
    endOfList?: string|false,
    fullListUpdated?: string|false,
    listUpdated?:  string|false
  }
};

export type CallBackFunction<ListItem> = () => Promise<ListItem[]|void>;

export type EventFireFunction = (eventName: string, details?: any) => void
