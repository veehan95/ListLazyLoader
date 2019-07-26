"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function eventFireExecutor(callback, eventName, changeDetail) {
    if (callback !== undefined) {
        if (eventName !== undefined && eventName != false) {
            callback(eventName, changeDetail);
        }
    }
}
exports.eventFireExecutor = eventFireExecutor;
