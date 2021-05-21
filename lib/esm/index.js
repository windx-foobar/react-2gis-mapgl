import React from 'react';
import { load } from '@2gis/mapgl';
import { useDGisMap, ItisDGisProvider } from './contexts_hooks';
import defaults from './constants/defaults';
import * as allFigures from './constants/figures';
import 'leaflet/dist/leaflet.css';
// Library Components
import { EventHandlers } from './handlers';
import { Marker } from './components/marker';
import { Polyline } from './components/polyline';
import { Circle } from './components/circle';
import { Polygon } from './components/polygon';
import { Rectangle } from './components/rectangle';
import { HtmlMarker } from './components/marker_html';
import { MarkerWithTooltip } from './components/marker_with_tooltip';
import DrawManager from './components/draw_manager';
import Cluster from './components/markers_cluster';
import VirtualEvents from './components/virtual_events';
// Styles
import clsx from 'clsx';
import useStyles from './index.style';
var ItisDGisMapContainer = React.memo(function () {
    return (React.createElement("div", { id: "map-container", style: { width: '100%', height: '100%' } }));
}, function () { return true; });
function ItisDGisContainer(props) {
    var classes = useStyles();
    var _a = React.useState(undefined), map = _a[0], setMap = _a[1];
    React.useEffect(function () {
        var _map, zoomControl;
        if (!props.apiKey || !props.apiKey.length) {
            throw new Error('Api key is required prop value!');
        }
        if (!document.querySelector('#map-container')) {
            throw new Error('Map required is #map-container');
        }
        load().then(function (mapgl) {
            var _a, _b, _c, _d, _e;
            _map = new mapgl.Map('map-container', {
                center: (_a = props.center) !== null && _a !== void 0 ? _a : defaults.map.center,
                zoom: (_b = props.zoom) !== null && _b !== void 0 ? _b : defaults.map.zoom,
                key: props.apiKey,
                lang: (_c = props.locale) !== null && _c !== void 0 ? _c : defaults.map.lang,
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
            if (props.throwCreate)
                props.throwCreate(_map);
            // @ts-ignore
            setMap(_map);
        });
        return function () {
            if (_map) {
                _map.destroy();
            }
            if (map) {
                setMap(undefined);
            }
            if (props.throwDestroy)
                props.throwDestroy(_map);
        };
    }, []);
    return (React.createElement(ItisDGisProvider, { value: [map, setMap] },
        React.createElement("div", { className: clsx(classes.mapContainer, {
                fullSize: props.fullSize
            }) },
            React.createElement(ItisDGisMapContainer, null)),
        props.handlers && (React.createElement(EventHandlers, { handlers: props.handlers })),
        (props.center && props.center.length && props.zoom && props.zoom > 0) && (React.createElement(VirtualEvents, { center: props.center, zoom: props.zoom })),
        props.children));
}
export { useDGisMap, ItisDGisContainer, Marker, HtmlMarker, Polyline, MarkerWithTooltip, Circle, Polygon, Rectangle, Cluster, DrawManager, allFigures, };
