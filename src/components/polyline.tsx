import React from 'react';
import { load } from '@2gis/mapgl';
import {
   DynamicObjectEventTable as DGDynamicObjectEventTable,
   PolylineOptions as DGPolylineOptions,
   Polyline as DGPolyline
} from '@2gis/mapgl/types';

import { useDGisMap } from '../contexts_hooks';
import { defaults } from '../constants/defaults';

export type PolylineHandlers = {
   [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
}

interface MarkerOptions extends DGPolylineOptions {
   handlers?: PolylineHandlers;
}

export function Polyline(props: MarkerOptions): null {
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
         });
      }

      return () => {
         if (map && polyline) {
            polyline.destroy();
         }
      }
   }, [ map, props.coordinates ]);

   return null;
}

export default Polyline;