"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var mapgl_1 = require("@2gis/mapgl");
var contexts_hooks_1 = require("../contexts_hooks");
var defaults_1 = require("../constants/defaults");
function Circle(props) {
    var map = contexts_hooks_1.useDGisMap();
    react_1.default.useEffect(function () {
        var circle;
        if (map) {
            mapgl_1.load().then(function (mapgl) {
                var _a, _b, _c, _d;
                circle = new mapgl.Circle(map, {
                    coordinates: props.coordinates,
                    radius: props.radius,
                    strokeColor: (_a = props.strokeColor) !== null && _a !== void 0 ? _a : defaults_1.defaults.circle.strokeColor,
                    strokeWidth: (_b = props.strokeWidth) !== null && _b !== void 0 ? _b : defaults_1.defaults.circle.strokeWidth,
                    color: (_c = props.color) !== null && _c !== void 0 ? _c : defaults_1.defaults.circle.color,
                    zIndex: (_d = props.zIndex) !== null && _d !== void 0 ? _d : 101
                });
                if (props.handlers) {
                    Object.keys(props.handlers).forEach(function (event) {
                        circle.on(event, props.handlers[event]);
                    });
                }
                if (props.onCreate)
                    props.onCreate(circle);
            });
        }
        return function () {
            if (circle) {
                circle.destroy();
                if (props.onDestroy)
                    props.onDestroy(circle);
            }
        };
    }, [map, props.coordinates[0], props.coordinates[1], props.handlers, props.radius]);
    return null;
}
exports.Circle = Circle;
exports.default = Circle;
