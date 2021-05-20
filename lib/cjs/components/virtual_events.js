"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualEvents = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var index_1 = require("../index");
function VirtualEvents(props) {
    var map = index_1.useDGisMap();
    react_1.default.useEffect(function () {
        if (map)
            map.setCenter(props.center);
    }, [map, props.center]);
    react_1.default.useEffect(function () {
        if (map)
            map.setZoom(props.zoom);
    }, [map, props.zoom]);
    react_1.default.useEffect(function () {
        if (map) {
            window.addEventListener('resize', function () {
                map.invalidateSize();
            });
        }
    }, [map]);
    return null;
}
exports.VirtualEvents = VirtualEvents;
exports.default = VirtualEvents;
