"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const property_watch_decorator_1 = require("property-watch-decorator");
const defaultValues_1 = require("./defaultValues");
const utilities_1 = require("./utilities");
class ListLoader {
    constructor(setting = {}, listLoader, eventFire) {
        this._setting = Object.assign({}, defaultValues_1.settingDefault, setting);
        this._eventFire = eventFire;
        this._loading = false;
        this._endOfList = false;
        this._list = [];
        this._fullList = [];
        this._listLoader = listLoader !== undefined
            ? listLoader
            : () => __awaiter(this, void 0, void 0, function* () { console.warn("No callback for external source."); });
    }
    get loading() { return this._loading; }
    get endOfList() { return this._endOfList; }
    get list() { return this._list; }
    get fullList() { return this._fullList; }
    set listLoader(func) { this._listLoader = func; }
    get setting() { return this._setting; }
    set setting(setting) { this._setting = Object.assign({}, defaultValues_1.settingDefault, setting); }
    set eventFire(eventFire) { this._eventFire = eventFire; }
    updateList(list, listUpdateAlgorithm = this.setting.listUpdateAlgorithm) {
        if (list == []) {
            this._endOfList = true;
        }
        else {
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
    }
    loadMore(increaseBy = this._setting.increaseSize || 0) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._loading == false) {
                this._loading = true;
                this._listLoader()
                    .then((result) => { this.updateList(result || []); })
                    .then(() => { this._loading = false; });
            }
            else {
                yield setTimeout(() => __awaiter(this, void 0, void 0, function* () { yield this.loadMore(); }), this._setting.loadMoreRetryInterval || 0);
            }
        });
    }
    resetList() { this.trimmer(undefined, true); }
    trimmer(increaseTo, reset = false) {
        this._list = this._fullList.slice(0, increaseTo || reset ? this._setting.maxInView_init : this._list.length + (this._setting.increaseSize || 0));
    }
}
__decorate([
    property_watch_decorator_1.OnChange(function (changes, changeDetail) {
        utilities_1.eventFireExecutor(this._eventFire, this.setting.events.loading, changeDetail);
    })
], ListLoader.prototype, "_loading", void 0);
__decorate([
    property_watch_decorator_1.OnChange(function (changes, changeDetail) {
        utilities_1.eventFireExecutor(this._eventFire, this.setting.events.endOfList, changeDetail);
    })
], ListLoader.prototype, "_endOfList", void 0);
__decorate([
    property_watch_decorator_1.OnChange(function (changes, changeDetail) {
        utilities_1.eventFireExecutor(this._eventFire, this.setting.events.listUpdated, changeDetail);
    })
], ListLoader.prototype, "_list", void 0);
__decorate([
    property_watch_decorator_1.OnChange(function (changes, changeDetail) {
        utilities_1.eventFireExecutor(this._eventFire, this.setting.events.fullListUpdated, changeDetail);
    })
], ListLoader.prototype, "_fullList", void 0);
exports.ListLoader = ListLoader;
const defaults = { setting: defaultValues_1.settingDefault };
exports.defaults = defaults;
