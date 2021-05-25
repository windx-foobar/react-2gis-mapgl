"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlMarker = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var mapgl_1 = require("@2gis/mapgl");
var contexts_hooks_1 = require("../contexts_hooks");
function HtmlMarker(props) {
    var map = contexts_hooks_1.useDGisMap();
    react_1.default.useEffect(function () {
        var marker;
        if (map) {
            mapgl_1.load().then(function (mapgl) {
                var _a, _b;
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
                    if (props.handlers.close) {
                        (_b = html.querySelector('#closeButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return props.handlers.close(); });
                    }
                }
                if (props.onCreate)
                    props.onCreate(marker);
            });
        }
        return function () {
            if (marker) {
                if (props.onDestroy)
                    props.onDestroy(marker);
                marker.destroy();
            }
        };
    }, [map, props.coordinates[0], props.coordinates[1], props.html, props.handlers]);
    return null;
}
exports.HtmlMarker = HtmlMarker;
exports.default = HtmlMarker;
