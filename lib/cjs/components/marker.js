"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marker = void 0;
var react_1 = __importDefault(require("react"));
var mapgl_1 = require("@2gis/mapgl");
var contexts_hooks_1 = require("../contexts_hooks");
function Marker(props) {
    var map = contexts_hooks_1.useDGisMap();
    react_1.default.useEffect(function () {
        var marker;
        if (map) {
            mapgl_1.load().then(function (mapgl) {
                var _a;
                var options = {
                    coordinates: props.coordinates,
                    zIndex: (_a = props.zIndex) !== null && _a !== void 0 ? _a : 102,
                };
                if (props.icon)
                    options.icon = props.icon;
                if (props.size)
                    options.size = props.size;
                marker = new mapgl.Marker(map, options);
                if (props.handlers) {
                    Object.keys(props.handlers).forEach(function (event) {
                        marker.on(event, props.handlers[event]);
                    });
                }
            });
        }
        return function () { return map && marker && marker.destroy(); };
    }, [map, props.coordinates]);
    return null;
}
exports.Marker = Marker;
exports.default = Marker;
