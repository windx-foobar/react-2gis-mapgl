import React from 'react';
import { useDGisMap } from './contexts_hooks';
import * as allFigures from './constants/figures';
import 'leaflet/dist/leaflet.css';
import { MapHandlers } from './handlers';
import { Marker, MarkerHandlers } from './components/marker';
import { Polyline, PolylineHandlers } from './components/polyline';
import { Circle, CircleHandlers, CirclePoints } from './components/circle';
import { Polygon, PolygonHandlers } from './components/polygon';
import { Rectangle, RectangleHandlers, RectanglePoints } from './components/rectangle';
import { HtmlMarker, HtmlMarkerHandlers } from './components/marker_html';
import DrawManager from './components/draw_manager';
import Cluster from './components/markers_cluster';
declare type LngLat = [number, number];
interface ContainerProps {
    center?: LngLat | number[];
    zoom?: number;
    locale?: 'ru' | 'en';
    apiKey: string;
    children?: React.ReactNodeArray;
    handlers?: MapHandlers;
    fullSize?: boolean;
}
declare function ItisDGisContainer(props: ContainerProps): JSX.Element;
export { useDGisMap, ItisDGisContainer, MapHandlers, LngLat, Marker, MarkerHandlers, HtmlMarker, HtmlMarkerHandlers, Polyline, PolylineHandlers, Circle, CircleHandlers, CirclePoints, Polygon, PolygonHandlers, Rectangle, RectangleHandlers, RectanglePoints, Cluster, DrawManager, allFigures, };
