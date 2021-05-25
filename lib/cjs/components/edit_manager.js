"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditManager = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var server_1 = tslib_1.__importDefault(require("react-dom/server"));
var circle_1 = require("./circle");
var marker_html_1 = require("./marker_html");
var polyline_1 = tslib_1.__importDefault(require("./polyline"));
var polygon_1 = tslib_1.__importDefault(require("./polygon"));
var allFigures = tslib_1.__importStar(require("../constants/figures"));
var contexts_hooks_1 = require("../contexts_hooks");
var draw_manager_1 = require("./draw_manager");
var helpers_1 = require("../helpers");
function EditManager(props) {
    var map = contexts_hooks_1.useDGisMap();
    var _a = react_1.default.useState(false), circleCreate = _a[0], setCircleCreate = _a[1];
    var _b = react_1.default.useState(draw_manager_1.initialCircle), circleModel = _b[0], setCircleModel = _b[1];
    var _c = react_1.default.useState(false), circleMoving = _c[0], setCircleMoving = _c[1];
    var _d = react_1.default.useState(false), polylineCreate = _d[0], setPolylineCreate = _d[1];
    var _e = react_1.default.useState([
        [0, 0]
    ]), polylineModel = _e[0], setPolylineModel = _e[1];
    var _f = react_1.default.useState(false), polygonCreate = _f[0], setPolygonCreate = _f[1];
    var _g = react_1.default.useState([
        [0, 0]
    ]), polygonModel = _g[0], setPolygonModel = _g[1];
    var _h = react_1.default.useState(false), initFirstMarker = _h[0], setInitFirstMarker = _h[1];
    var _j = react_1.default.useState(true), showMarkers = _j[0], setShowMarkers = _j[1];
    var mapHandlers = react_1.default.useMemo(function () { return ({
        click: function (e) {
            if (circleCreate) {
                setCircleModel(function (model) { return (tslib_1.__assign(tslib_1.__assign({}, model), { coordinates: e.lngLat })); });
                return true;
            }
            if (polylineCreate) {
                setPolylineModel(function (model) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], model), [e.lngLat]); });
                return true;
            }
            if (polygonCreate) {
                setPolygonModel(function (model) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], model), [e.lngLat]); });
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
            if (props.destructCircle) {
                props.setData(tslib_1.__assign(tslib_1.__assign({}, helpers_1.destructBoundTuple(circleModel.coordinates)), { radius: circleModel.radius }));
            }
            else {
                props.setData(circleModel);
            }
            if (props.onUpdate)
                props.onUpdate('Круг успешно отредактирован');
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
                    if (props.onUpdate)
                        props.onUpdate('Полигон успешно отредактирован');
                    return true;
                }
                props.setData({
                    points: polylineModel
                        .map(function (bound) { return props.destructPolyline ? helpers_1.destructBoundTuple(bound) : bound; })
                });
                if (props.onUpdate)
                    props.onUpdate('Линия успешно отредактирована');
                return true;
            }
            return false;
        }
    }); }, [
        initFirstMarker,
        polylineCreate,
        polygonCreate,
        polylineModel,
        polygonModel
    ]);
    var lineAllMarkerHandlers = react_1.default.useMemo(function () { return ({
        click: function (e, currentIdx) {
            if (polygonCreate) {
                setPolygonModel(function (prev) { return prev.filter(function (_, idx) { return idx !== currentIdx; }); });
                return true;
            }
            if (polylineCreate) {
                setPolylineModel(function (prev) { return prev.filter(function (_, idx) { return idx !== currentIdx; }); });
                return true;
            }
            return false;
        }
    }); }, [
        initFirstMarker,
        polylineCreate,
        polygonCreate,
        polylineModel.length,
        polygonModel.length
    ]);
    react_1.default.useEffect(function () {
        var _a, _b;
        switch (props.figureType) {
            case allFigures.Circle:
                setCircleCreate(true);
                setCircleModel({
                    coordinates: [(_b = (_a = props.figureData.lon) !== null && _a !== void 0 ? _a : props.figureData.lng) !== null && _b !== void 0 ? _b : 0, props.figureData.lat],
                    radius: props.figureData.radius
                });
                break;
            case allFigures.Polygon:
                setPolygonCreate(true);
                var points_1 = props.figureData.points.map(function (bound) { return helpers_1.createBoundTuple(bound); });
                var _c = [points_1[0], points_1[points_1.length - 1]], first = _c[0], last = _c[1];
                if (first[0] === last[0] && first[1] === last[1]) {
                    setPolygonModel(function () { return points_1.filter(function (_, idx, all) { return idx !== all.length - 1; }); });
                }
                else {
                    setPolygonModel(function () { return points_1; });
                }
                break;
            case allFigures.Polyline:
                setPolylineCreate(true);
                setPolylineModel(function () { return props.figureData.points.map(function (bound) { return helpers_1.createBoundTuple(bound); }); });
                break;
        }
        return function () {
            setCircleCreate(false);
            setPolygonCreate(false);
            setPolylineCreate(false);
        };
    }, [
        props.figureType,
        props.figureData
    ]);
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
                react_1.default.createElement(marker_html_1.HtmlMarker, { coordinates: circleModel.coordinates, html: server_1.default.renderToString(react_1.default.createElement(draw_manager_1.HtmlCircleMarkerHtml, null)), handlers: circleCenterMarkerHandlers, zIndex: 300 }))),
            react_1.default.createElement(circle_1.Circle, { coordinates: circleModel.coordinates, radius: circleModel.radius, handlers: circleHandlers }))),
        polylineCreate && !!polylineModel[0].filter(function (lngLat) { return lngLat > 0; }).length && (react_1.default.createElement(react_1.default.Fragment, null,
            showMarkers && polylineModel.map(function (bound, idx, models) { return (react_1.default.createElement(marker_html_1.HtmlMarker, { coordinates: bound, html: server_1.default.renderToString(react_1.default.createElement(draw_manager_1.HtmlMarkerHtml, { last: idx === models.length - 1 })), handlers: idx === models.length - 1 ? lineLastMarkerHandlers : tslib_1.__assign(tslib_1.__assign({}, lineAllMarkerHandlers), { click: function (e) { return lineAllMarkerHandlers.click(e, idx); } }), key: bound[0] + bound[1] })); }),
            react_1.default.createElement(polyline_1.default, { coordinates: polylineModel }))),
        polygonCreate && !!polygonModel[0].filter(function (lngLat) { return lngLat > 0; }).length && (react_1.default.createElement(react_1.default.Fragment, null,
            showMarkers && polygonModel.map(function (bound, idx, models) { return (react_1.default.createElement(marker_html_1.HtmlMarker, { coordinates: bound, html: server_1.default.renderToString(react_1.default.createElement(draw_manager_1.HtmlMarkerHtml, { last: idx === models.length - 1 })), handlers: idx === models.length - 1 ? lineLastMarkerHandlers : tslib_1.__assign(tslib_1.__assign({}, lineAllMarkerHandlers), { click: function (e) { return lineAllMarkerHandlers.click(e, idx); } }), key: bound[0] + bound[1] })); }),
            react_1.default.createElement(polygon_1.default, { coordinates: [polygonModel] })))));
}
exports.EditManager = EditManager;
exports.default = EditManager;
