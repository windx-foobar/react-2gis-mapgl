import React from 'react';
import { load } from '@2gis/mapgl';
import {
   DynamicObjectEventTable as DGDynamicObjectEventTable,
   MarkerOptions as DGMarkerOptions,
   Marker as DGMarker
} from '@2gis/mapgl/types';
import { BaseFigureOptions } from '../interfaces/base_figure_options';

import { useDGisMap } from '../contexts_hooks';

type BaseMarkerOptions = BaseFigureOptions<DGMarker> & DGMarkerOptions;

export type MarkerHandlers = {
   [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
}

export interface MarkerOptions extends BaseMarkerOptions {
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
            if (props.label) options.label = props.label;
            marker = new mapgl.Marker(map, options);

            if (props.handlers) {
               Object.keys(props.handlers).forEach((event: keyof MarkerHandlers) => {
                  marker.on(event, props.handlers![event]!);
               });
            }

            if (props.throwCreate) {
               props.throwCreate(marker);
            }
         });
      }

      return () => {
         if (marker) {
            marker.destroy();

            if (props.throwDestroy) {
               props.throwDestroy(marker);
            }
         }
      }
   }, [ map, props.coordinates[0], props.coordinates[1] ]);

   return null;
}

export default Marker;