import { ListLoaderInterface } from "./interface";
import { Setting, ListUpdateAlgorithm, CallBackFunction, EventFireFunction } from "./type";
import { OnChange, SimpleChange } from "property-watch-decorator";
import { settingDefault } from "./defaultValues";
import { EventEmitter } from 'events';
import { eventFireExecutor } from './utilities';

class ListLoader<ListItem> implements ListLoaderInterface<ListItem> {
  @OnChange<boolean>(function(this: ListLoader<ListItem>, changes, changeDetail) {
    eventFireExecutor<boolean>(this._eventFire, this.setting!.events!.loading, changeDetail);
  })
  private _loading:	boolean;
  get loading(): boolean { return this._loading; }

  @OnChange<boolean>(function(this: ListLoader<ListItem>, changes, changeDetail) {
    eventFireExecutor<boolean>(this._eventFire, this.setting!.events!.endOfList, changeDetail);
  })
  private _endOfList:	boolean;
  get endOfList(): boolean { return this._endOfList; }

  @OnChange<ListItem>(function(this: ListLoader<ListItem>, changes, changeDetail) {
    eventFireExecutor<ListItem>(this._eventFire, this.setting!.events!.listUpdated, changeDetail);
  })
  private _list: ListItem[];
  get list(): ListItem[] { return this._list; }

  @OnChange<ListItem[]>(function(this: ListLoader<ListItem>, changes, changeDetail) {
    eventFireExecutor<ListItem[]>(this._eventFire, this.setting!.events!.fullListUpdated, changeDetail);
  })
  private _fullList:	ListItem[];
  get fullList(): ListItem[] { return this._fullList; }

  private _listLoader: CallBackFunction<ListItem>;
  set listLoader(func: CallBackFunction<ListItem>) { this._listLoader = func; }

  private _setting: Setting;
  get setting(): Setting { return this._setting; }
  set setting(setting: Setting) { this._setting = { ...settingDefault, ...setting }; }

  private _eventFire: EventFireFunction|undefined;
  set eventFire(eventFire: EventFireFunction) { this._eventFire = eventFire; }

  constructor(setting: Setting = {}, listLoader?: CallBackFunction<ListItem>, eventFire?: EventFireFunction) {
    this._setting = { ...settingDefault, ...setting };
    this._eventFire = eventFire;
    this._loading = false;
    this._endOfList = false;
    this._list = [];
    this._fullList = [];
    this._listLoader = listLoader !== undefined
      ? listLoader
      : async () => { console.warn("No callback for external source.") };
  }

  public updateList(list: ListItem[], listUpdateAlgorithm: ListUpdateAlgorithm = this.setting.listUpdateAlgorithm) {
    switch (listUpdateAlgorithm) {
      case "autoMerge":
        list.forEach((x) => { this._fullList.includes(x) ? null : this._fullList.push(x); });
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

  public async loadMore(increaseBy: number = this._setting.increaseSize||0): Promise<void> {
    if (this._loading == false) {
      this._loading = true;
      this._listLoader()
        .then((result: ListItem[]|void) => { this.updateList(result||[]); })
        .then(() => { this._loading = false; })
    } else {
      await setTimeout(async () => { await this.loadMore() }, this._setting.loadMoreRetryInterval || 0);
    }
  }

  public resetList(): void { this.trimmer(undefined, true); }

  private trimmer(increaseTo?: number, reset: boolean = false): void {
    this._list = this._fullList.slice(0,increaseTo || reset ? this._setting.maxInView_init : this._list.length + (this._setting.increaseSize || 0));
  }
}

const defaults: { setting: Setting } = { setting: settingDefault }

export {
  Setting,
  ListLoaderInterface,
  ListLoader,
  ListUpdateAlgorithm,
  defaults,
};
