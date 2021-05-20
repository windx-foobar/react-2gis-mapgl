import React from 'react';
import { load } from '@2gis/mapgl';
import { Map as DGMap, ZoomControl as DGZoomControl } from '@2gis/mapgl/types';

import { useDGisMap, ItisDGisProvider } from './contexts_hooks';
import defaults from './constants/defaults';
import * as allFigures from './constants/figures';
import 'leaflet/dist/leaflet.css';

// Library Components
import { EventHandlers, MapHandlers } from './handlers';
import { Marker, MarkerHandlers } from './components/marker';
import { Polyline, PolylineHandlers } from './components/polyline';
import { Circle, CircleHandlers, CirclePoints } from './components/circle';
import { Polygon, PolygonHandlers } from './components/polygon';
import { Rectangle, RectangleHandlers, RectanglePoints } from './components/rectangle';
import { HtmlMarker, HtmlMarkerHandlers } from './components/marker_html';
import DrawManager from './components/draw_manager';
import Cluster from './components/markers_cluster';
import VirtualEvents from './components/virtual_events';

// Styles
import clsx from 'clsx';
import useStyles from './index.style';

type LngLat = [ number, number ];

interface ContainerProps {
   center?: LngLat | number[];
   zoom?: number;
   locale?: 'ru' | 'en';
   apiKey: string;
   children?: React.ReactNodeArray;
   handlers?: MapHandlers;
   fullSize?: boolean;
   hiddenCopy?: boolean;
   centerControls?: boolean;
   throwDestroy?: (map: DGMap | undefined) => any;
   throwCreate?: (map: DGMap | undefined) => any;
}

const ItisDGisMapContainer = React.memo(
   () => {
      return (
         <div id="map-container" style={ { width: '100%', height: '100%' } } />
      );
   },
   () => true
);

function ItisDGisContainer(props: ContainerProps): JSX.Element {
   const classes = useStyles();
   const [ map, setMap ] = React.useState(undefined);

   React.useEffect(() => {
      let _map: DGMap, zoomControl: DGZoomControl;

      if (!props.apiKey || !props.apiKey.length) {
         throw new Error('Api key is required prop value!');
      }

      if (!document.querySelector('#map-container')) {
         throw new Error('Map required is #map-container');
      }

      load().then((mapgl) => {
         _map = new mapgl.Map('map-container', {
            center: props.center ?? defaults.map.center,
            zoom: props.zoom ?? defaults.map.zoom,
            key: props.apiKey,
            lang: props.locale ?? defaults.map.lang,
            zoomControl: false
         });

         if (props.centerControls) {
            zoomControl = new mapgl.ZoomControl(_map, {
               position: 'topRight'
            });

            let $el: HTMLDivElement = zoomControl.getContainer();
            // Центрируем контролсы зума +- по центру
            $el.style.position = 'relative';
            $el.style.top = props.fullSize ? '40vh' : '30vh';

            if (props.hiddenCopy) {
               // Убираем копирайты 2гис
               $el.parentElement?.nextElementSibling?.remove();
            }
         }

         if (props.throwCreate) props.throwCreate(_map);

         // @ts-ignore
         setMap(_map);
      });

      return () => {
         if (_map) {
            _map.destroy();
         }

         if (map) {
            setMap(undefined);
         }

         if (props.throwDestroy) props.throwDestroy(_map);
      }
   }, []);

   return (
      <ItisDGisProvider value={ [ map, setMap ] }>
         <div
            className={ clsx(classes.mapContainer, {
               fullSize: props.fullSize
            }) }
         >
            <ItisDGisMapContainer />
         </div>
         { props.handlers && (
            <EventHandlers handlers={ props.handlers } />
         ) }
         { (props.center && props.center.length && props.zoom && props.zoom > 0) && (
            <VirtualEvents
               center={ props.center }
               zoom={ props.zoom }
            />
         ) }
         { props.children }
      </ItisDGisProvider>
   );
}

export {
   useDGisMap,
   ItisDGisContainer,
   MapHandlers,
   LngLat,
   Marker,
   MarkerHandlers,
   HtmlMarker,
   HtmlMarkerHandlers,
   Polyline,
   PolylineHandlers,
   Circle,
   CircleHandlers,
   CirclePoints,
   Polygon,
   PolygonHandlers,
   Rectangle,
   RectangleHandlers,
   RectanglePoints,
   Cluster,
   DrawManager,
   allFigures,
};