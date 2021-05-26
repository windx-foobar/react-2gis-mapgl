import { __assign, __spreadArray } from "tslib";
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Circle } from './circle';
import { HtmlMarker } from './marker_html';
import Polyline from './polyline';
import Polygon from './polygon';
import * as allFigures from '../constants/figures';
import { useDGisMap } from '../contexts_hooks';
import { HtmlMarkerHtml, HtmlCircleMarkerHtml, initialCircle, } from './draw_manager';
import { createBoundTuple, destructBoundTuple } from '../helpers';
export function EditManager(props) {
    var map = useDGisMap();
    var _a = React.useState(false), circleCreate = _a[0], setCircleCreate = _a[1];
    var _b = React.useState(initialCircle), circleModel = _b[0], setCircleModel = _b[1];
    var _c = React.useState(false), circleMoving = _c[0], setCircleMoving = _c[1];
    var _d = React.useState(false), polylineCreate = _d[0], setPolylineCreate = _d[1];
    var _e = React.useState([
        [0, 0]
    ]), polylineModel = _e[0], setPolylineModel = _e[1];
    var _f = React.useState(false), polygonCreate = _f[0], setPolygonCreate = _f[1];
    var _g = React.useState([
        [0, 0]
    ]), polygonModel = _g[0], setPolygonModel = _g[1];
    var _h = React.useState(false), initFirstMarker = _h[0], setInitFirstMarker = _h[1];
    var _j = React.useState(true), showMarkers = _j[0], setShowMarkers = _j[1];
    var mapHandlers = React.useMemo(function () { return ({
        click: function (e) {
            if (!showMarkers)
                return showMarkers;
            if (polylineCreate) {
                setPolylineModel(function (model) { return __spreadArray(__spreadArray([], model), [e.lngLat]); });
                return true;
            }
            if (polygonCreate) {
                setPolygonModel(function (model) { return __spreadArray(__spreadArray([], model), [e.lngLat]); });
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
        initFirstMarker,
        showMarkers
    ]);
    var circleCenterMarkerHandlers = React.useMemo(function () { return ({
        mousedown: function () {
            setCircleMoving(true);
        },
        mouseup: function () {
            setCircleMoving(false);
        },
        click: function () {
            setShowMarkers(false);
            if (props.destructCircle) {
                props.setData(__assign(__assign({}, destructBoundTuple(circleModel.coordinates)), { radius: circleModel.radius }));
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
                    return __assign(__assign({}, model), { radius: newVal <= 100 ? 100 : newVal });
                }
                return __assign(__assign({}, model), { radius: model.radius + (newRadius > 500 ? newRadius : 500) });
            });
        }
    }); }, [circleModel]);
    var circleHandlers = React.useMemo(function () { return ({
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
    var lineLastMarkerHandlers = React.useMemo(function () { return ({
        click: function () {
            if (!initFirstMarker) {
                setShowMarkers(false);
                if (polygonCreate) {
                    props.setData({
                        points: __spreadArray(__spreadArray([], polygonModel), [polygonModel[0]]).map(function (bound) { return props.destructPolygon ? destructBoundTuple(bound) : bound; })
                    });
                    if (props.onUpdate)
                        props.onUpdate('Полигон успешно отредактирован');
                    return true;
                }
                props.setData({
                    points: polylineModel
                        .map(function (bound) { return props.destructPolyline ? destructBoundTuple(bound) : bound; })
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
    var lineAllMarkerHandlers = React.useMemo(function () { return ({
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
    React.useEffect(function () {
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
                var points_1 = props.figureData.points.map(function (bound) { return createBoundTuple(bound); });
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
                setPolylineModel(function () { return props.figureData.points.map(function (bound) { return createBoundTuple(bound); }); });
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
    React.useEffect(function () {
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
    return (React.createElement(React.Fragment, null,
        circleCreate && circleModel.coordinates.length === 2 && (React.createElement(React.Fragment, null,
            showMarkers && circleModel.radius && (React.createElement(React.Fragment, null,
                React.createElement(HtmlMarker, { coordinates: circleModel.coordinates, html: ReactDOMServer.renderToString(React.createElement(HtmlCircleMarkerHtml, null)), handlers: circleCenterMarkerHandlers, zIndex: 300 }))),
            React.createElement(Circle, { coordinates: circleModel.coordinates, radius: circleModel.radius, handlers: circleHandlers }))),
        polylineCreate && !!polylineModel[0].filter(function (lngLat) { return lngLat > 0; }).length && (React.createElement(React.Fragment, null,
            showMarkers && polylineModel.map(function (bound, idx, models) { return (React.createElement(HtmlMarker, { coordinates: bound, html: ReactDOMServer.renderToString(React.createElement(HtmlMarkerHtml, { last: idx === models.length - 1 })), handlers: idx === models.length - 1 ? lineLastMarkerHandlers : __assign(__assign({}, lineAllMarkerHandlers), { click: function (e) { return lineAllMarkerHandlers.click(e, idx); } }), key: bound[0] + bound[1] })); }),
            React.createElement(Polyline, { coordinates: polylineModel }))),
        polygonCreate && !!polygonModel[0].filter(function (lngLat) { return lngLat > 0; }).length && (React.createElement(React.Fragment, null,
            showMarkers && polygonModel.map(function (bound, idx, models) { return (React.createElement(HtmlMarker, { coordinates: bound, html: ReactDOMServer.renderToString(React.createElement(HtmlMarkerHtml, { last: idx === models.length - 1 })), handlers: idx === models.length - 1 ? lineLastMarkerHandlers : __assign(__assign({}, lineAllMarkerHandlers), { click: function (e) { return lineAllMarkerHandlers.click(e, idx); } }), key: bound[0] + bound[1] })); }),
            React.createElement(Polygon, { coordinates: [polygonModel] })))));
}
export default EditManager;
