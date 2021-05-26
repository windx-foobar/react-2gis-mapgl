"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destructBoundTuple = exports.createBoundTuple = exports.allFigures = exports.EditManager = exports.DrawManager = exports.Cluster = exports.Rectangle = exports.Polygon = exports.Circle = exports.MarkerWithTooltip = exports.Polyline = exports.HtmlMarker = exports.Marker = exports.ItisDGisContainer = exports.useDGisMap = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var mapgl_1 = require("@2gis/mapgl");
var contexts_hooks_1 = require("./contexts_hooks");
Object.defineProperty(exports, "useDGisMap", { enumerable: true, get: function () { return contexts_hooks_1.useDGisMap; } });
var defaults_1 = tslib_1.__importDefault(require("./constants/defaults"));
var allFigures = tslib_1.__importStar(require("./constants/figures"));
exports.allFigures = allFigures;
var helpers_1 = require("./helpers");
Object.defineProperty(exports, "createBoundTuple", { enumerable: true, get: function () { return helpers_1.createBoundTuple; } });
Object.defineProperty(exports, "destructBoundTuple", { enumerable: true, get: function () { return helpers_1.destructBoundTuple; } });
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
var marker_with_tooltip_1 = require("./components/marker_with_tooltip");
Object.defineProperty(exports, "MarkerWithTooltip", { enumerable: true, get: function () { return marker_with_tooltip_1.MarkerWithTooltip; } });
var draw_manager_1 = tslib_1.__importDefault(require("./components/draw_manager"));
exports.DrawManager = draw_manager_1.default;
var edit_manager_1 = tslib_1.__importDefault(require("./components/edit_manager"));
exports.EditManager = edit_manager_1.default;
var markers_cluster_1 = tslib_1.__importDefault(require("./components/markers_cluster"));
exports.Cluster = markers_cluster_1.default;
var virtual_events_1 = tslib_1.__importDefault(require("./components/virtual_events"));
// Styles
var clsx_1 = tslib_1.__importDefault(require("clsx"));
var index_style_1 = tslib_1.__importDefault(require("./index.style"));
var ItisDGisMapContainer = react_1.default.memo(function () {
    return (react_1.default.createElement("div", { id: "map-container", style: { width: '100%', height: '100%' } }));
}, function () { return true; });
function ItisDGisContainer(props) {
    var classes = index_style_1.default();
    var _a = react_1.default.useState(undefined), map = _a[0], setMap = _a[1];
    react_1.default.useEffect(function () {
        var _map, zoomControl;
        if (!props.apiKey || !props.apiKey.length) {
            throw new Error('Api key is required prop value!');
        }
        if (document.querySelector('#map-container')) {
            mapgl_1.load().then(function (mapgl) {
                var _a, _b, _c, _d, _e;
                _map = new mapgl.Map('map-container', {
                    center: (_a = props.center) !== null && _a !== void 0 ? _a : defaults_1.default.map.center,
                    zoom: (_b = props.zoom) !== null && _b !== void 0 ? _b : defaults_1.default.map.zoom,
                    key: props.apiKey,
                    lang: (_c = props.locale) !== null && _c !== void 0 ? _c : defaults_1.default.map.lang,
                    zoomControl: false
                });
                if (props.centerControls) {
                    zoomControl = new mapgl.ZoomControl(_map, {
                        position: 'topRight'
                    });
                    var $el = zoomControl.getContainer();
                    // Центрируем контролсы зума +- по центру
                    $el.style.position = 'relative';
                    $el.style.top = props.fullSize ? '40vh' : '30vh';
                    if (props.hiddenCopy) {
                        // Убираем копирайты 2гис
                        (_e = (_d = $el.parentElement) === null || _d === void 0 ? void 0 : _d.nextElementSibling) === null || _e === void 0 ? void 0 : _e.remove();
                    }
                }
                if (props.onCreate)
                    props.onCreate(_map);
                // @ts-ignore
                setMap(_map);
            });
        }
        return function () {
            if (_map) {
                _map.destroy();
            }
            if (map) {
                setMap(undefined);
            }
            if (props.onDestroy)
                props.onDestroy(_map);
        };
    }, []);
    return (react_1.default.createElement(contexts_hooks_1.ItisDGisProvider, { value: [map, setMap] },
        react_1.default.createElement("div", { className: clsx_1.default(classes.mapContainer, {
                fullSize: props.fullSize
            }) },
            react_1.default.createElement(ItisDGisMapContainer, null)),
        props.handlers && (react_1.default.createElement(handlers_1.EventHandlers, { handlers: props.handlers })),
        (props.center && props.center.length && props.zoom && props.zoom > 0) && (react_1.default.createElement(virtual_events_1.default, { center: props.center, zoom: props.zoom })),
        props.children));
}
exports.ItisDGisContainer = ItisDGisContainer;
