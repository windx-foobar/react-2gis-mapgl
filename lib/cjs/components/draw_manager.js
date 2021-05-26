"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawManager = exports.HtmlMarkerHtml = exports.HtmlCircleMarkerHtml = exports.initialCircle = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var server_1 = tslib_1.__importDefault(require("react-dom/server"));
var circle_1 = require("./circle");
var marker_dynamic_html_1 = tslib_1.__importDefault(require("./marker_dynamic_html"));
var polyline_1 = tslib_1.__importDefault(require("./polyline"));
var polygon_1 = tslib_1.__importDefault(require("./polygon"));
var allFigures = tslib_1.__importStar(require("../constants/figures"));
var contexts_hooks_1 = require("../contexts_hooks");
var helpers_1 = require("../helpers");
exports.initialCircle = {
    coordinates: [],
    radius: 45000
};
function HtmlCircleMarkerHtml() {
    return (react_1.default.createElement("div", { style: {
            backgroundColor: 'white',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            border: '3px solid #0081F2',
            borderRadius: '100%',
            transform: 'translate(-14px, -20px)'
        } }));
}
exports.HtmlCircleMarkerHtml = HtmlCircleMarkerHtml;
function HtmlMarkerHtml(props) {
    if (props.last) {
        return (react_1.default.createElement("div", { style: {
                backgroundColor: 'white',
                width: '25px',
                height: '25px',
                cursor: 'pointer',
                border: '3px solid #0081F2',
                borderRadius: '100%',
                transform: 'translate(-12px, -10px)'
            } },
            react_1.default.createElement("div", { style: {
                    backgroundColor: 'white',
                    width: '15px',
                    height: '15px',
                    cursor: 'pointer',
                    border: '2px solid #0081F2',
                    borderRadius: '100%',
                    transform: 'translate(2px, 2px)'
                } })));
    }
    return (react_1.default.createElement("div", { style: {
            backgroundColor: 'white',
            width: '25px',
            height: '25px',
            cursor: 'pointer',
            border: '3px solid #0081F2',
            borderRadius: '100%',
            transform: 'translate(-12px, -10px)'
        } }));
}
exports.HtmlMarkerHtml = HtmlMarkerHtml;
function DrawManager(props) {
    var map = contexts_hooks_1.useDGisMap();
    var _a = react_1.default.useState(false), circleCreate = _a[0], setCircleCreate = _a[1];
    var _b = react_1.default.useState(exports.initialCircle), circleModel = _b[0], setCircleModel = _b[1];
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
            if (!showMarkers)
                return showMarkers;
            if (circleCreate) {
                if (initFirstMarker) {
                    setCircleModel(function (model) { return (tslib_1.__assign(tslib_1.__assign({}, model), { coordinates: e.lngLat })); });
                    setInitFirstMarker(false);
                    return true;
                }
                return initFirstMarker;
            }
            if (polylineCreate) {
                if (initFirstMarker) {
                    setPolylineModel([e.lngLat]);
                    setInitFirstMarker(false);
                }
                else {
                    setPolylineModel(function (model) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], model), [e.lngLat]); });
                }
                return true;
            }
            if (polygonCreate) {
                if (initFirstMarker) {
                    setPolygonModel([e.lngLat]);
                    setInitFirstMarker(false);
                }
                else {
                    setPolygonModel(function (model) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], model), [e.lngLat]); });
                }
                return true;
            }
            return false;
        },
        mousemove: function (e) {
            if (circleMoving) {
                setCircleModel(function (model) { return (tslib_1.__assign(tslib_1.__assign({}, model), { coordinates: e.lngLat })); });
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
        initFirstMarker,
        showMarkers
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
            if (props.destructCircle) {
                props.setData(tslib_1.__assign(tslib_1.__assign({}, helpers_1.destructBoundTuple(circleModel.coordinates)), { radius: circleModel.radius }));
            }
            else {
                props.setData(circleModel);
            }
            if (props.onCreate)
                props.onCreate('Круг успешно создан');
        },
        wheel: function (e) {
            e.preventDefault();
            var down = e.deltaY > 0;
            setCircleModel(function (model) {
                var newRadius = model.radius / 100;
                if (down) {
                    var newVal = model.radius - (newRadius > 500 ? newRadius : 500);
                    return tslib_1.__assign(tslib_1.__assign({}, model), { radius: newVal <= 100 ? 100 : newVal });
                }
                return tslib_1.__assign(tslib_1.__assign({}, model), { radius: model.radius + (newRadius > 500 ? newRadius : 500) });
            });
        }
    }); }, [circleModel]);
    var circleHandlers = react_1.default.useMemo(function () { return ({
        mousemove: function (e) {
            if (circleMoving) {
                setCircleModel(function (model) { return (tslib_1.__assign(tslib_1.__assign({}, model), { coordinates: e.lngLat })); });
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
                    props.setData({
                        points: tslib_1.__spreadArray(tslib_1.__spreadArray([], polygonModel), [polygonModel[0]]).map(function (bound) { return props.destructPolygon ? helpers_1.destructBoundTuple(bound) : bound; })
                    });
                    if (props.onCreate)
                        props.onCreate('Полигон успешно создан');
                    return true;
                }
                props.setData({
                    points: polylineModel
                        .map(function (bound) { return props.destructPolyline ? helpers_1.destructBoundTuple(bound) : bound; })
                });
                if (props.onCreate)
                    props.onCreate('Линия успешно создана');
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
        initFirstMarker,
        showMarkers
    ]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        circleCreate && circleModel.coordinates.length === 2 && (react_1.default.createElement(react_1.default.Fragment, null,
            showMarkers && circleModel.radius && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(marker_dynamic_html_1.default, { coordinates: circleModel.coordinates, html: server_1.default.renderToString(react_1.default.createElement(HtmlCircleMarkerHtml, null)), handlers: circleCenterMarkerHandlers }))),
            react_1.default.createElement(circle_1.Circle, { coordinates: circleModel.coordinates, radius: circleModel.radius, handlers: circleHandlers }))),
        polylineCreate && !!polylineModel[0].filter(function (lngLat) { return lngLat > 0; }).length && (react_1.default.createElement(react_1.default.Fragment, null,
            showMarkers && polylineModel.map(function (model, idx, models) { return (react_1.default.createElement(marker_dynamic_html_1.default, { coordinates: model, html: server_1.default.renderToString(react_1.default.createElement(HtmlMarkerHtml, { last: idx === models.length - 1 })), handlers: idx === models.length - 1 ? lineLastMarkerHandlers : undefined, key: model[0] + model[1] })); }),
            react_1.default.createElement(polyline_1.default, { coordinates: polylineModel }))),
        polygonCreate && !!polygonModel[0].filter(function (lngLat) { return lngLat > 0; }).length && (react_1.default.createElement(react_1.default.Fragment, null,
            showMarkers && polygonModel.map(function (model, idx, models) { return (react_1.default.createElement(marker_dynamic_html_1.default, { coordinates: model, html: server_1.default.renderToString(react_1.default.createElement(HtmlMarkerHtml, { last: idx === models.length - 1 })), handlers: idx === models.length - 1 ? lineLastMarkerHandlers : undefined, key: model[0] + model[1] })); }),
            react_1.default.createElement(polygon_1.default, { coordinates: [polygonModel] })))));
}
exports.DrawManager = DrawManager;
exports.default = DrawManager;
