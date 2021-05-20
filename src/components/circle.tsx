import React from 'react';
import { load } from '@2gis/mapgl';
import {
   DynamicObjectEventTable as DGDynamicObjectEventTable,
   CircleOptions as DGCircleOptions,
   Circle as DGCircle
} from '@2gis/mapgl/types';

import { useDGisMap } from '../contexts_hooks';
import { defaults } from '../constants/defaults';
import { MapEventTable as DGMapEventTable } from '@2gis/mapgl/types/types/events';

export type CircleHandlers = {
   [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
}

export type CirclePoints = {
   radius: DGCircleOptions['radius'];
   coordinates: DGCircleOptions['coordinates'];
}

interface CircleOptions extends DGCircleOptions {
   handlers?: CircleHandlers;
}

export function Circle(props: CircleOptions): null {
   const map = useDGisMap();

   React.useEffect(() => {
      let circle: DGCircle;

      if (map) {
         load().then(mapgl => {
            circle = new mapgl.Circle(map, {
               coordinates: props.coordinates,
               radius: props.radius,
               strokeColor: props.strokeColor ?? defaults.circle.strokeColor,
               strokeWidth: props.strokeWidth ?? defaults.circle.strokeWidth,
               color: props.color ?? defaults.circle.color,
               zIndex: props.zIndex ?? 101
            });

            if (props.handlers) {
               Object.keys(props.handlers).forEach((event: keyof CircleHandlers) => {
                  circle.on(event, props.handlers![event]!);
               });
            }
         });
      }

      return () => map && circle && circle.destroy();
   }, [ map, props.coordinates, props.handlers, props.radius ]);

   return null;
}

export default Circle;