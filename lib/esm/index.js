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
        var _map;
        if (!props.apiKey || !props.apiKey.length) {
            throw new Error('Api key is required prop value!');
        }
        if (!document.querySelector('#map-container')) {
            throw new Error('Map required is #map-container');
        }
        load().then(function (mapgl) {
            var _a, _b, _c;
            _map = new mapgl.Map('map-container', {
                center: (_a = props.center) !== null && _a !== void 0 ? _a : defaults.map.center,
                zoom: (_b = props.zoom) !== null && _b !== void 0 ? _b : defaults.map.zoom,
                key: props.apiKey,
                lang: (_c = props.locale) !== null && _c !== void 0 ? _c : defaults.map.lang,
            });
            // @ts-ignore
            setMap(_map);
        });
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
export { useDGisMap, ItisDGisContainer, Marker, HtmlMarker, Polyline, Circle, Polygon, Rectangle, Cluster, DrawManager, allFigures, };
