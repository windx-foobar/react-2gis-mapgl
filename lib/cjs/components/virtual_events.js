"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualEvents = void 0;
var react_1 = __importDefault(require("react"));
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
