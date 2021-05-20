"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon = void 0;
var react_1 = __importDefault(require("react"));
var mapgl_1 = require("@2gis/mapgl");
var lodash_1 = require("lodash");
var contexts_hooks_1 = require("../contexts_hooks");
var defaults_1 = require("../constants/defaults");
function Polygon(props) {
    var map = contexts_hooks_1.useDGisMap();
    react_1.default.useEffect(function () {
        var polygon, coordinates;
        coordinates = props.coordinates[0];
        if (!lodash_1.isEqual(lodash_1.first(props.coordinates[0]), lodash_1.last(props.coordinates[0]))) {
            coordinates = __spreadArray(__spreadArray([], coordinates), [lodash_1.first(coordinates)]);
        }
        if (map) {
            mapgl_1.load().then(function (mapgl) {
                var _a, _b, _c, _d;
                polygon = new mapgl.Polygon(map, {
                    coordinates: [coordinates],
                    strokeColor: (_a = props.strokeColor) !== null && _a !== void 0 ? _a : defaults_1.defaults.polygon.strokeColor,
                    strokeWidth: (_b = props.strokeWidth) !== null && _b !== void 0 ? _b : defaults_1.defaults.polygon.strokeWidth,
                    color: (_c = props.color) !== null && _c !== void 0 ? _c : defaults_1.defaults.polygon.color,
                    zIndex: (_d = props.zIndex) !== null && _d !== void 0 ? _d : 101
                });
            });
        }
        return function () { return map && polygon && polygon.destroy(); };
    }, [map, props.coordinates]);
    return null;
}
exports.Polygon = Polygon;
exports.default = Polygon;
