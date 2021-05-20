"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cluster = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var mapgl_clusterer_1 = require("@2gis/mapgl-clusterer");
var contexts_hooks_1 = require("../contexts_hooks");
function Cluster(props) {
    var map = contexts_hooks_1.useDGisMap();
    react_1.default.useEffect(function () {
        var _a;
        var clusterer;
        if (map && props.markers.length) {
            clusterer = new mapgl_clusterer_1.Clusterer(map, {
                radius: props.radius,
                clusterStyle: (_a = props.clusterStyle) !== null && _a !== void 0 ? _a : {},
            });
            clusterer.load(props.markers);
        }
        return function () { return map && clusterer && clusterer.destroy(); };
    }, [map, props.markers, props.radius]);
    return null;
}
exports.Cluster = Cluster;
exports.default = Cluster;
