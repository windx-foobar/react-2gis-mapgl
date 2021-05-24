import React from 'react';
import { load } from '@2gis/mapgl';
import {
   DynamicObjectEventTable as DGDynamicObjectEventTable,
   PolylineOptions as DGPolylineOptions,
   Polyline as DGPolyline
} from '@2gis/mapgl/types';
import { BaseFigureOptions } from '../interfaces/base_figure_options';

import { useDGisMap } from '../contexts_hooks';
import { defaults } from '../constants/defaults';

export type PolylineHandlers = {
   [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
}

type BasePolylineOptions = BaseFigureOptions<DGPolyline> & DGPolylineOptions;

interface PolylineOptions extends BasePolylineOptions {
   handlers?: PolylineHandlers;
}

export function Polyline(props: PolylineOptions): null {
   const map = useDGisMap();

   React.useEffect(() => {
      let polyline: DGPolyline;

      if (map) {
         load().then(mapgl => {
            polyline = new mapgl.Polyline(map, {
               coordinates: props.coordinates,
               width: props.width ?? defaults.polyline.width,
               color: props.color ?? defaults.polyline.color,
               zIndex: props.zIndex ?? 101
            });

            if (props.handlers) {
               Object.keys(props.handlers).forEach((event: keyof PolylineHandlers) => {
                  polyline.on(event, props.handlers![event]!);
               });
            }

            if (props.onCreate) props.onCreate(polyline);
         });
      }

      return () => {
         if (polyline) {
            if (props.onDestroy) props.onDestroy(polyline);
            polyline.destroy();
         }
      }
   }, [ map ]);

   return null;
}

export default Polyline;