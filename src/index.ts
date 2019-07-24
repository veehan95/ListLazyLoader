import { ListLoaderInterface } from "./interface";
import { Setting, ListUpdateAlgorithm, CallBackFunction, EventFireFunction } from "./type";
import { OnChange, SimpleChange } from "property-watch-decorator";
import _DEFAULTS from "./defaultValues.json";
import { EventEmitter } from 'events';

function eventFireExecutor<T>(callback: EventFireFunction|undefined, eventName: string|false|undefined, changeDetail: SimpleChange<T>|undefined) {
  if (callback !== undefined) {
    if (eventName !== undefined && eventName != false) { callback(eventName, changeDetail); }
  }
}

const settingDefault: Setting = {
  ..._DEFAULTS,
  listUpdateAlgorithm: _DEFAULTS.listUpdateAlgorithm as ListUpdateAlgorithm,
};

class ListLoader<ListItem> implements ListLoaderInterface<ListItem> {
  @OnChange(function(this: ListLoader<ListItem>, changes, changeDetail) {
    eventFireExecutor<Setting>(this._eventFire, this.setting!.events!.loading, changeDetail);
  })
  private _loading:	boolean;
  private _endOfList:	boolean;
  @OnChange(function(this: ListLoader<ListItem>, changes, changeDetail) {
    eventFireExecutor<Setting>(this._eventFire, this.setting!.events!.endOfList, changeDetail);
  })
  private _list: ListItem[];
  @OnChange(function(this: ListLoader<ListItem>, changes, changeDetail) {
    eventFireExecutor<Setting>(this._eventFire, this.setting!.events!.listUpdated, changeDetail);
  })
  private _fullList:	ListItem[];
  private _loadMoreFromExternal: CallBackFunction<ListItem>;
  private _setting: Setting;
  private _eventFire: EventFireFunction|undefined;


  get loading(): boolean { return this._loading; }
  get endOfList(): boolean { return this._endOfList; }
  get list(): ListItem[] { return this._list; }
  get fullList(): ListItem[] { return this._fullList; }
  get setting(): Setting { return this._setting; }

  set loadMoreFromExternal(func: CallBackFunction<ListItem>) {
    this._loadMoreFromExternal = func;
  }

  set setting(setting: Setting) {
    this._setting = { ...settingDefault, ...setting };
  }

  set eventFire(eventFire: EventFireFunction) { this._eventFire = eventFire; }

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

  constructor(setting: Setting = {}, loadMoreFromExternal?: CallBackFunction<ListItem>, eventFire?: EventFireFunction) {
    this._setting = { ...settingDefault, ...setting };
    this._eventFire = eventFire;
    this._loading = false;
    this._endOfList = false;
    this._list = [];
    this._fullList = [];
    this._loadMoreFromExternal = async () => { console.warn("No callback for external source.") };
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
