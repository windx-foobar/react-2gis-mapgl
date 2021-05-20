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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Circle } from './circle';
import { HtmlMarker } from './marker_html';
import Polyline from './polyline';
import Polygon from './polygon';
import * as allFigures from '../constants/figures';
import { useDGisMap } from '../contexts_hooks';
var initialCircle = {
    coordinates: [],
    radius: 45000
};
function HtmlCircleMarkerHtml() {
    return (React.createElement("div", { style: {
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
    return (React.createElement("div", { style: {
            backgroundColor: 'white',
            width: '10px',
            height: '10px',
            cursor: 'pointer',
            border: '3px solid #0081F2',
            borderRadius: '100%',
            transform: 'translate(-7px, -5px)'
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
    var circleCenterMarkerHandlers = React.useMemo(function () { return ({
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
                    props.setData(__spreadArray(__spreadArray([], polygonModel), [polygonModel[0]]));
                    return true;
                }
                props.setData(polylineModel);
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
        initFirstMarker
    ]);
    return (React.createElement(React.Fragment, null,
        circleCreate && circleModel.coordinates.length === 2 && (React.createElement(React.Fragment, null,
            showMarkers && circleModel.radius && (React.createElement(React.Fragment, null,
                React.createElement(HtmlMarker, { coordinates: circleModel.coordinates, html: ReactDOMServer.renderToString(React.createElement(HtmlCircleMarkerHtml, null)), handlers: circleCenterMarkerHandlers }))),
            React.createElement(Circle, { coordinates: circleModel.coordinates, radius: circleModel.radius, handlers: circleHandlers }))),
        polylineCreate && !!polylineModel[0].filter(function (lngLat) { return lngLat > 0; }).length && (React.createElement(React.Fragment, null,
            showMarkers && polylineModel.map(function (model, idx, models) { return (React.createElement(HtmlMarker, { coordinates: model, html: ReactDOMServer.renderToString(React.createElement(HtmlMarkerHtml, null)), handlers: idx === models.length - 1 ? lineLastMarkerHandlers : undefined, key: model[0] + model[1] })); }),
            React.createElement(Polyline, { coordinates: polylineModel }))),
        polygonCreate && !!polygonModel[0].filter(function (lngLat) { return lngLat > 0; }).length && (React.createElement(React.Fragment, null,
            showMarkers && polygonModel.map(function (model, idx, models) { return (React.createElement(HtmlMarker, { coordinates: model, html: ReactDOMServer.renderToString(React.createElement(HtmlMarkerHtml, null)), handlers: idx === models.length - 1 ? lineLastMarkerHandlers : undefined, key: model[0] + model[1] })); }),
            React.createElement(Polygon, { coordinates: [polygonModel] })))));
}
export default DrawManager;