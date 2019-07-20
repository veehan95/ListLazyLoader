import { ListLoaderInterface } from "./ListLoaderInterface";
import { Setting, ListUpdateAlgorithm, CallBackFunction } from "./type";
import _DEFAULTS from "./defaultValues.json";

const settingDefault: Setting = {
  ..._DEFAULTS,
  listUpdateAlgorithm: _DEFAULTS.listUpdateAlgorithm as ListUpdateAlgorithm,
};

class ListLoader<ListItem> implements ListLoaderInterface<ListItem> {
  private _loading:	boolean;
  private _endOfList:	boolean;
  private _list: ListItem[];
  private _fullList:	ListItem[];
  private _loadMoreFromExternal: CallBackFunction<ListItem>;
  private _setting: Setting;

  get loading(): boolean { return this._loading; }
  get endOfList(): boolean { return this._endOfList; }
  get list(): ListItem[] { return this._list; }
  get fullList(): ListItem[] { return this._fullList; }
  get setting(): Setting { return this._setting; }

  public loadMoreFromExternal(func: CallBackFunction<ListItem>) {
    this._loadMoreFromExternal = func;
  }
  public modifySetting(setting: Setting) {
    this._setting = { ...settingDefault, ...setting };
  }
  public updateList(list: ListItem[], listUpdateAlgorithm: ListUpdateAlgorithm = this.setting.listUpdateAlgorithm) {
    switch (listUpdateAlgorithm) {
      case "autoMerge":
        // this._fullList = list;
        break;
      case "directAppend":
        this._fullList = this._fullList.concat(list);
        break;
      case "override":
        this._fullList = list;
        break;
      default:
        throw new Error('Invalid list update algorithm !!');
        break;
    }
    this.trimmer();
  }

  constructor(setting: Setting = {}, loadMoreFromExternal?: CallBackFunction<ListItem>) {
    this._loading = false;
    this._endOfList = false;
    this._list = [];
    this._fullList = [];
    this._loadMoreFromExternal = async () => { console.warn("No callback for external source.") };
    this._setting = { ...settingDefault, ...setting };
  }

  public async loadMore(increaseBy: number = this._setting.increaseSize||0): Promise<void> {
    this._loading = true;
    if (this._fullList.length < this._list.length + increaseBy) {
      await this._loadMoreFromExternal()
        .then((moreList: ListItem[]|void) => moreList ? this.updateList(moreList) : null);
    }
    this.trimmer(this._list.length + increaseBy);
    this._loading = false;
  }

  private trimmer(increaseTo?: number): void {
    this._list = this._fullList.slice(0,increaseTo || this._setting.maxInView_init);
  }
}


export {
  Setting,
  ListLoaderInterface,
  ListLoader,
  ListUpdateAlgorithm,
};
