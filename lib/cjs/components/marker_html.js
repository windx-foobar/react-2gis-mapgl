"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlMarker = void 0;
var react_1 = __importDefault(require("react"));
var mapgl_1 = require("@2gis/mapgl");
var contexts_hooks_1 = require("../contexts_hooks");
function HtmlMarker(props) {
    var map = contexts_hooks_1.useDGisMap();
    react_1.default.useEffect(function () {
        var marker;
        if (map) {
            mapgl_1.load().then(function (mapgl) {
                var _a;
                marker = new mapgl.HtmlMarker(map, {
                    html: props.html,
                    coordinates: props.coordinates,
                    zIndex: (_a = props.zIndex) !== null && _a !== void 0 ? _a : 102
                });
                var html = marker.getContent();
                if (props.handlers) {
                    Object.keys(props.handlers).forEach(function (event) {
                        html.addEventListener(event, props.handlers[event]);
                    });
                }
            });
        }
        return function () { return map && marker && marker.destroy(); };
    }, [map, props.coordinates]);
    return null;
}
exports.HtmlMarker = HtmlMarker;
exports.default = HtmlMarker;
