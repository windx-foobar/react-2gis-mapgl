import React from 'react';
import { load } from '@2gis/mapgl';
import {
   DynamicObjectEventTable as DGDynamicObjectEventTable,
   PolygonOptions as DGPolygonOptions,
   Polygon as DGPolygon
} from '@2gis/mapgl/types';
import { BaseFigureOptions } from '../interfaces/base_figure_options';

import { isEqual, last, first } from 'lodash';

import { useDGisMap } from '../contexts_hooks';
import { defaults } from '../constants/defaults';
import { PolylineHandlers } from './polyline';

export type PolygonHandlers = {
   [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
}

type BasePolygonOptions = BaseFigureOptions<DGPolygon> & DGPolygonOptions;

interface PolygonOptions extends BasePolygonOptions {
   handlers?: PolygonHandlers;
}

export function Polygon(props: PolygonOptions): null {
   const map = useDGisMap();

   React.useEffect(() => {
      let polygon: DGPolygon, coordinates: typeof props.coordinates[0];

      coordinates = props.coordinates[0];
      if (!isEqual(first(props.coordinates[0]), last(props.coordinates[0]))) {
         coordinates = [ ...coordinates, first(coordinates)! ];
      }

      if (map) {
         load().then(mapgl => {
            polygon = new mapgl.Polygon(map, {
               coordinates: [ coordinates ],
               strokeColor: props.strokeColor ?? defaults.polygon.strokeColor,
               strokeWidth: props.strokeWidth ?? defaults.polygon.strokeWidth,
               color: props.color ?? defaults.polygon.color,
               zIndex: props.zIndex ?? 101
            });

            if (props.handlers) {
               Object.keys(props.handlers).forEach((event: keyof PolylineHandlers) => {
                  polygon.on(event, props.handlers![event]!);
               });
            }

            if (props.onCreate) props.onCreate(polygon);
         });
      }

      return () => {
         if (polygon) {
            if (props.onDestroy) props.onDestroy(polygon);

            polygon.destroy();
         }
      }
   }, [ map ]);

   return null;
}

export default Polygon;