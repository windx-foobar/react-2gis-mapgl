import { __assign, __spreadArray } from "tslib";
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Circle } from './circle';
import HtmlDynamicMarker from './marker_dynamic_html';
import Polyline from './polyline';
import Polygon from './polygon';
import * as allFigures from '../constants/figures';
import { useDGisMap } from '../contexts_hooks';
import { destructBoundTuple } from '../helpers';
export var initialCircle = {
    coordinates: [],
    radius: 45000
};
export function HtmlCircleMarkerHtml() {
    return (React.createElement("div", { style: {
            backgroundColor: 'white',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            border: '3px solid #0081F2',
            borderRadius: '100%',
            transform: 'translate(-14px, -20px)'
        } }));
}
export function HtmlMarkerHtml(props) {
    if (props.last) {
        return (React.createElement("div", { style: {
                backgroundColor: 'white',
                width: '25px',
                height: '25px',
                cursor: 'pointer',
                border: '3px solid #0081F2',
                borderRadius: '100%',
                transform: 'translate(-12px, -10px)'
            } },
            React.createElement("div", { style: {
                    backgroundColor: 'white',
                    width: '15px',
                    height: '15px',
                    cursor: 'pointer',
                    border: '2px solid #0081F2',
                    borderRadius: '100%',
                    transform: 'translate(2px, 2px)'
                } })));
    }
    return (React.createElement("div", { style: {
            backgroundColor: 'white',
            width: '25px',
            height: '25px',
            cursor: 'pointer',
            border: '3px solid #0081F2',
            borderRadius: '100%',
            transform: 'translate(-12px, -10px)'
        } }));
}
export function DrawManager(props) {
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
    var _h = React.useState(true), initFirstMarker = _h[0], setInitFirstMarker = _h[1];
    var _j = React.useState(true), showMarkers = _j[0], setShowMarkers = _j[1];
    var mapHandlers = React.useMemo(function () { return ({
        click: function (e) {
            if (!showMarkers)
                return showMarkers;
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
                    if (props.onCreate)
                        props.onCreate('Полигон успешно создан');
                    return true;
                }
                props.setData({
                    points: polylineModel
                        .map(function (bound) { return props.destructPolyline ? destructBoundTuple(bound) : bound; })
                });
                if (props.onCreate)
                    props.onCreate('Линия успешно создана');
                return true;
            }
            return false;
        }
    }); }, [initFirstMarker, polylineCreate, polygonCreate, polylineModel, polygonModel]);
    React.useEffect(function () {
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
                React.createElement(HtmlDynamicMarker, { coordinates: circleModel.coordinates, html: ReactDOMServer.renderToString(React.createElement(HtmlCircleMarkerHtml, null)), handlers: circleCenterMarkerHandlers }))),
            React.createElement(Circle, { coordinates: circleModel.coordinates, radius: circleModel.radius, handlers: circleHandlers }))),
        polylineCreate && !!polylineModel[0].filter(function (lngLat) { return lngLat > 0; }).length && (React.createElement(React.Fragment, null,
            showMarkers && polylineModel.map(function (model, idx, models) { return (React.createElement(HtmlDynamicMarker, { coordinates: model, html: ReactDOMServer.renderToString(React.createElement(HtmlMarkerHtml, { last: idx === models.length - 1 })), handlers: idx === models.length - 1 ? lineLastMarkerHandlers : undefined, key: model[0] + model[1] })); }),
            React.createElement(Polyline, { coordinates: polylineModel }))),
        polygonCreate && !!polygonModel[0].filter(function (lngLat) { return lngLat > 0; }).length && (React.createElement(React.Fragment, null,
            showMarkers && polygonModel.map(function (model, idx, models) { return (React.createElement(HtmlDynamicMarker, { coordinates: model, html: ReactDOMServer.renderToString(React.createElement(HtmlMarkerHtml, { last: idx === models.length - 1 })), handlers: idx === models.length - 1 ? lineLastMarkerHandlers : undefined, key: model[0] + model[1] })); }),
            React.createElement(Polygon, { coordinates: [polygonModel] })))));
}
export default DrawManager;
