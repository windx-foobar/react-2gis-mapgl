"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var mapgl_1 = require("@2gis/mapgl");
var contexts_hooks_1 = require("../contexts_hooks");
var defaults_1 = require("../constants/defaults");
function Rectangle(props) {
    var map = contexts_hooks_1.useDGisMap();
    react_1.default.useEffect(function () {
        var rectangle;
        var bound = [
            [props.northEast[0], props.northEast[1]],
            [props.southWest[0], props.northEast[1]],
            [props.southWest[0], props.southWest[1]],
            [props.northEast[0], props.southWest[1]]
        ];
        if (map) {
            mapgl_1.load().then(function (mapgl) {
                var _a, _b, _c, _d;
                rectangle = new mapgl.Polygon(map, {
                    coordinates: [tslib_1.__spreadArray(tslib_1.__spreadArray([], bound), [bound[0]])],
                    strokeColor: (_a = props.strokeColor) !== null && _a !== void 0 ? _a : defaults_1.defaults.rectangle.strokeColor,
                    strokeWidth: (_b = props.strokeWidth) !== null && _b !== void 0 ? _b : defaults_1.defaults.rectangle.strokeWidth,
                    color: (_c = props.color) !== null && _c !== void 0 ? _c : defaults_1.defaults.rectangle.color,
                    zIndex: (_d = props.zIndex) !== null && _d !== void 0 ? _d : 101
                });
            });
        }
        return function () { return map && rectangle && rectangle.destroy(); };
    }, [map, props.northEast, props.southWest]);
    return null;
}
exports.Rectangle = Rectangle;
exports.default = Rectangle;
