import { Setting } from "./type";

export const settingDefault: Setting = {
  maxInView_init: 10,
  increaseSize: 10,
  loadMoreFromExternal: true,
  listUpdateAlgorithm: "directAppend",
  events: {
    loading: "loading",
    endOfList: "endOfList",
    listUpdated: "listUpdated",
    fullListUpdated: "fullListUpdated"
  },
  loadMoreRetryInterval: 1000
}
