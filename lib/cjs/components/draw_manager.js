"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawManager = void 0;
var react_1 = __importDefault(require("react"));
var server_1 = __importDefault(require("react-dom/server"));
var circle_1 = require("./circle");
var marker_html_1 = require("./marker_html");
var polyline_1 = __importDefault(require("./polyline"));
var polygon_1 = __importDefault(require("./polygon"));
var allFigures = __importStar(require("../constants/figures"));
var contexts_hooks_1 = require("../contexts_hooks");
var initialCircle = {
    coordinates: [],
    radius: 45000
};
function HtmlCircleMarkerHtml() {
    return (react_1.default.createElement("div", { style: {
            backgroundColor: 'white',
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            border: '3px solid #0081F2',
            borderRadius: '100%',
            transform: 'translate(-14px, -10px)'
        } }));
}
function HtmlMarkerHtml() {
    return (react_1.default.createElement("div", { style: {
            backgroundColor: 'white',
            width: '10px',
            height: '10px',
            cursor: 'pointer',
            border: '3px solid #0081F2',
            borderRadius: '100%',
            transform: 'translate(-7px, -5px)'
        } }));
}
function DrawManager(props) {
    var map = contexts_hooks_1.useDGisMap();
    var _a = react_1.default.useState(false), circleCreate = _a[0], setCircleCreate = _a[1];
    var _b = react_1.default.useState(initialCircle), circleModel = _b[0], setCircleModel = _b[1];
    var _c = react_1.default.useState(false), circleMoving = _c[0], setCircleMoving = _c[1];
    var _d = react_1.default.useState(false), polylineCreate = _d[0], setPolylineCreate = _d[1];
    var _e = react_1.default.useState([
        [0, 0]
    ]), polylineModel = _e[0], setPolylineModel = _e[1];
    var _f = react_1.default.useState(false), polygonCreate = _f[0], setPolygonCreate = _f[1];
    var _g = react_1.default.useState([
        [0, 0]
    ]), polygonModel = _g[0], setPolygonModel = _g[1];
    var _h = react_1.default.useState(true), initFirstMarker = _h[0], setInitFirstMarker = _h[1];
    var _j = react_1.default.useState(true), showMarkers = _j[0], setShowMarkers = _j[1];
    var mapHandlers = react_1.default.useMemo(function () { return ({
        click: function (e) {
            if (circleCreate) {
                setCircleModel(function (model) { return (__assign(__assign({}, model), { coordinates: e.lngLat })); });
                return true;
            }
            if (polylineCreate) {
                if (initFirstMarker) {
                    setPolylineModel([e.lngLat]);
                    setInitFirstMarker(false);
                }
                else {
                    setPolylineModel(function (model) { return __spreadArray(__spreadArray([], model), [e.lngLat]); });
                }
                return true;
            }
            if (polygonCreate) {
                if (initFirstMarker) {
                    setPolygonModel([e.lngLat]);
                    setInitFirstMarker(false);
                }
                else {
                    setPolygonModel(function (model) { return __spreadArray(__spreadArray([], model), [e.lngLat]); });
                }
                return true;
            }
            return false;
        },
        mousemove: function (e) {
            if (circleMoving) {
                setCircleModel(function (model) { return (__assign(__assign({}, model), { coordinates: e.lngLat })); });
            }
        },
        mouseup: function (e) {
            if (circleMoving) {
                setCircleMoving(false);
                return true;
            }
            return false;
        }
    }); }, [
        circleCreate,
        circleMoving,
        polylineCreate,
        polygonCreate,
        initFirstMarker
    ]);
    var circleCenterMarkerHandlers = react_1.default.useMemo(function () { return ({
        mousedown: function () {
            setCircleMoving(true);
        },
        mouseup: function () {
            setCircleMoving(false);
        },
        click: function () {
            setShowMarkers(false);
            props.setData(circleModel);
        },
        wheel: function () {
            setCircleModel(function (model) {
                var newRadius = model.radius / 100;
                return __assign(__assign({}, model), { radius: model.radius + (newRadius > 500 ? newRadius : 500) });
            });
        }
    }); }, [circleModel]);
    var circleHandlers = react_1.default.useMemo(function () { return ({
        mousemove: function (e) {
            if (circleMoving) {
                setCircleModel(function (model) { return (__assign(__assign({}, model), { coordinates: e.lngLat })); });
            }
        },
        mouseup: function () {
            if (circleMoving) {
                setCircleMoving(false);
                return true;
            }
            return false;
        }
    }); }, [circleMoving]);
    var lineLastMarkerHandlers = react_1.default.useMemo(function () { return ({
        click: function () {
            if (!initFirstMarker) {
                setShowMarkers(false);
                if (polygonCreate) {
                    props.setData(__spreadArray(__spreadArray([], polygonModel), [polygonModel[0]]));
                    return true;
                }
                props.setData(polylineModel);
                return true;
            }
            return false;
        }
    }); }, [initFirstMarker, polylineCreate, polygonCreate, polylineModel, polygonModel]);
    react_1.default.useEffect(function () {
        switch (props.figureType) {
            case allFigures.Circle:
                setCircleCreate(true);
                break;
            case allFigures.Polygon:
                setPolygonCreate(true);
                break;
            case allFigures.Polyline:
                setPolylineCreate(true);
                break;
        }
        return function () {
            setCircleCreate(false);
            setPolygonCreate(false);
            setPolylineCreate(false);
        };
    }, [props.figureType]);
    react_1.default.useEffect(function () {
        if (map) {
            map.on('click', mapHandlers.click);
            if (circleMoving) {
                map.on('mouseup', mapHandlers.mouseup);
                map.on('mousemove', mapHandlers.mousemove);
            }
        }
        return function () {
            if (map) {
                map.off('click', mapHandlers.click);
                map.off('mouseup', mapHandlers.mouseup);
                map.off('mousemove', mapHandlers.mousemove);
            }
        };
    }, [
        map,
        circleCreate,
        circleMoving,
        polylineCreate,
        polygonCreate,
        initFirstMarker
    ]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        circleCreate && circleModel.coordinates.length === 2 && (react_1.default.createElement(react_1.default.Fragment, null,
            showMarkers && circleModel.radius && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(marker_html_1.HtmlMarker, { coordinates: circleModel.coordinates, html: server_1.default.renderToString(react_1.default.createElement(HtmlCircleMarkerHtml, null)), handlers: circleCenterMarkerHandlers }))),
            react_1.default.createElement(circle_1.Circle, { coordinates: circleModel.coordinates, radius: circleModel.radius, handlers: circleHandlers }))),
        polylineCreate && !!polylineModel[0].filter(function (lngLat) { return lngLat > 0; }).length && (react_1.default.createElement(react_1.default.Fragment, null,
            showMarkers && polylineModel.map(function (model, idx, models) { return (react_1.default.createElement(marker_html_1.HtmlMarker, { coordinates: model, html: server_1.default.renderToString(react_1.default.createElement(HtmlMarkerHtml, null)), handlers: idx === models.length - 1 ? lineLastMarkerHandlers : undefined, key: model[0] + model[1] })); }),
            react_1.default.createElement(polyline_1.default, { coordinates: polylineModel }))),
        polygonCreate && !!polygonModel[0].filter(function (lngLat) { return lngLat > 0; }).length && (react_1.default.createElement(react_1.default.Fragment, null,
            showMarkers && polygonModel.map(function (model, idx, models) { return (react_1.default.createElement(marker_html_1.HtmlMarker, { coordinates: model, html: server_1.default.renderToString(react_1.default.createElement(HtmlMarkerHtml, null)), handlers: idx === models.length - 1 ? lineLastMarkerHandlers : undefined, key: model[0] + model[1] })); }),
            react_1.default.createElement(polygon_1.default, { coordinates: [polygonModel] })))));
}
exports.DrawManager = DrawManager;
exports.default = DrawManager;
