"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allFigures = exports.DrawManager = exports.Cluster = exports.Rectangle = exports.Polygon = exports.Circle = exports.Polyline = exports.HtmlMarker = exports.Marker = exports.ItisDGisContainer = exports.useDGisMap = void 0;
var react_1 = __importDefault(require("react"));
var mapgl_1 = require("@2gis/mapgl");
var contexts_hooks_1 = require("./contexts_hooks");
Object.defineProperty(exports, "useDGisMap", { enumerable: true, get: function () { return contexts_hooks_1.useDGisMap; } });
var defaults_1 = __importDefault(require("./constants/defaults"));
var allFigures = __importStar(require("./constants/figures"));
exports.allFigures = allFigures;
require("leaflet/dist/leaflet.css");
// Library Components
var handlers_1 = require("./handlers");
var marker_1 = require("./components/marker");
Object.defineProperty(exports, "Marker", { enumerable: true, get: function () { return marker_1.Marker; } });
var polyline_1 = require("./components/polyline");
Object.defineProperty(exports, "Polyline", { enumerable: true, get: function () { return polyline_1.Polyline; } });
var circle_1 = require("./components/circle");
Object.defineProperty(exports, "Circle", { enumerable: true, get: function () { return circle_1.Circle; } });
var polygon_1 = require("./components/polygon");
Object.defineProperty(exports, "Polygon", { enumerable: true, get: function () { return polygon_1.Polygon; } });
var rectangle_1 = require("./components/rectangle");
Object.defineProperty(exports, "Rectangle", { enumerable: true, get: function () { return rectangle_1.Rectangle; } });
var marker_html_1 = require("./components/marker_html");
Object.defineProperty(exports, "HtmlMarker", { enumerable: true, get: function () { return marker_html_1.HtmlMarker; } });
var draw_manager_1 = __importDefault(require("./components/draw_manager"));
exports.DrawManager = draw_manager_1.default;
var markers_cluster_1 = __importDefault(require("./components/markers_cluster"));
exports.Cluster = markers_cluster_1.default;
var virtual_events_1 = __importDefault(require("./components/virtual_events"));
var index_style_1 = __importDefault(require("./index.style"));
var ItisDGisMapContainer = react_1.default.memo(function () {
    return (react_1.default.createElement("div", { id: "map-container", style: { width: '100%', height: '100%' } }));
}, function () { return true; });
function ItisDGisContainer(props) {
    var classes = index_style_1.default();
    var _a = react_1.default.useState(undefined), map = _a[0], setMap = _a[1];
    react_1.default.useEffect(function () {
        var _map;
        if (!props.apiKey || !props.apiKey.length) {
            throw new Error('Api key is required prop value!');
        }
        if (!document.querySelector('#map-container')) {
            throw new Error('Map required is #map-container');
        }
        mapgl_1.load().then(function (mapgl) {
            var _a, _b, _c;
            _map = new mapgl.Map('map-container', {
                center: (_a = props.center) !== null && _a !== void 0 ? _a : defaults_1.default.map.center,
                zoom: (_b = props.zoom) !== null && _b !== void 0 ? _b : defaults_1.default.map.zoom,
                key: props.apiKey,
                lang: (_c = props.locale) !== null && _c !== void 0 ? _c : defaults_1.default.map.lang,
            });
            // @ts-ignore
            setMap(_map);
        });
    }, []);
    return (react_1.default.createElement(contexts_hooks_1.ItisDGisProvider, { value: [map, setMap] },
        react_1.default.createElement("div", { className: classes.mapContainer },
            react_1.default.createElement(ItisDGisMapContainer, null)),
        props.handlers && (react_1.default.createElement(handlers_1.EventHandlers, { handlers: props.handlers })),
        (props.center && props.center.length && props.zoom && props.zoom > 0) && (react_1.default.createElement(virtual_events_1.default, { center: props.center, zoom: props.zoom })),
        props.children));
}
exports.ItisDGisContainer = ItisDGisContainer;