"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polyline = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var mapgl_1 = require("@2gis/mapgl");
var contexts_hooks_1 = require("../contexts_hooks");
var defaults_1 = require("../constants/defaults");
function Polyline(props) {
    var map = contexts_hooks_1.useDGisMap();
    react_1.default.useEffect(function () {
        var polyline;
        if (map) {
            mapgl_1.load().then(function (mapgl) {
                var _a, _b, _c;
                polyline = new mapgl.Polyline(map, {
                    coordinates: props.coordinates,
                    width: (_a = props.width) !== null && _a !== void 0 ? _a : defaults_1.defaults.polyline.width,
                    color: (_b = props.color) !== null && _b !== void 0 ? _b : defaults_1.defaults.polyline.color,
                    zIndex: (_c = props.zIndex) !== null && _c !== void 0 ? _c : 101
                });
                if (props.handlers) {
                    Object.keys(props.handlers).forEach(function (event) {
                        polyline.on(event, props.handlers[event]);
                    });
                }
                if (props.throwCreate) {
                    props.throwCreate(polyline);
                }
            });
        }
        return function () {
            if (polyline) {
                if (props.throwDestroy) {
                    props.throwDestroy(polyline);
                }
                polyline.destroy();
            }
        };
    }, [map]);
    return null;
}
exports.Polyline = Polyline;
exports.default = Polyline;
