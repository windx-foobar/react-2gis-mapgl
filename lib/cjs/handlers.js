"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandlers = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var contexts_hooks_1 = require("./contexts_hooks");
function EventHandlers(props) {
    var map = contexts_hooks_1.useDGisMap();
    react_1.default.useEffect(function () {
        if (map) {
            Object.keys(props.handlers).forEach(function (event) {
                map.on(event, props.handlers[event]);
            });
        }
        return function () {
            if (map) {
                Object.keys(props.handlers).forEach(function (event) {
                    map.off(event, props.handlers[event]);
                });
            }
        };
    }, [map, props.handlers]);
    return null;
}
exports.EventHandlers = EventHandlers;
exports.default = EventHandlers;
