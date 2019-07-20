export type ListUpdateAlgorithm = "autoMerge"|"directAppend"|"override"|undefined;

export type Setting = {
  maxInView_init?: number,
  increaseSize?: number,
  listUpdateAlgorithm?: ListUpdateAlgorithm,
  loadMoreFromExternal?: boolean,
};

export type CallBackFunction<ListItem> = () => Promise<ListItem[]|void>;
