import React from 'react';
import { load } from '@2gis/mapgl';
import {
   DynamicObjectEventTable as DGDynamicObjectEventTable,
   MarkerOptions as DGMarkerOptions,
   Marker as DGMarker
} from '@2gis/mapgl/types';

import { useDGisMap } from '../contexts_hooks';

export type MarkerHandlers = {
   [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
}

interface MarkerOptions extends DGMarkerOptions {
   handlers?: MarkerHandlers;
}

export function Marker(props: MarkerOptions): null {
   const map = useDGisMap();

   React.useEffect(() => {
      let marker: DGMarker;

      if (map) {
         load().then(mapgl => {
            const options: DGMarkerOptions = {
               coordinates: props.coordinates,
               zIndex: props.zIndex ?? 102,
            }

            if (props.icon) options.icon = props.icon;
            if (props.size) options.size = props.size;
            marker = new mapgl.Marker(map, options);

            if (props.handlers) {
               Object.keys(props.handlers).forEach((event: keyof MarkerHandlers) => {
                  marker.on(event, props.handlers![event]!);
               });
            }
         });
      }

      return () => map && marker && marker.destroy();
   }, [ map, props.coordinates ]);

   return null;
}

export default Marker;