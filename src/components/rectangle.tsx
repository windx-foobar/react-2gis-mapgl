import React from 'react';
import { load } from '@2gis/mapgl';
import {
   DynamicObjectEventTable as DGDynamicObjectEventTable,
   Polygon as DGPolygon
} from '@2gis/mapgl/types';

import { useDGisMap } from '../contexts_hooks';
import { defaults } from '../constants/defaults';

export type RectangleHandlers = {
   [P in keyof DGDynamicObjectEventTable]: (e: DGDynamicObjectEventTable[P]) => any | void;
}

export interface RectanglePoints {
   southWest: number[];
   northEast: number[];
}

interface RectangleOptions extends RectanglePoints {
   zIndex?: number;
   minZoom?: number;
   maxZoom?: number;
   color?: string;
   strokeColor?: string;
   strokeWidth?: number;
   interactive?: boolean;
   handlers?: RectangleHandlers;
}

export function Rectangle(props: RectangleOptions): null {
   const map = useDGisMap();

   React.useEffect(() => {
      let rectangle: DGPolygon;

      const bound = [
         [ props.northEast[0], props.northEast[1] ],
         [ props.southWest[0], props.northEast[1] ],
         [ props.southWest[0], props.southWest[1] ],
         [ props.northEast[0], props.southWest[1] ]
      ];

      if (map) {
         load().then(mapgl => {
            rectangle = new mapgl.Polygon(map, {
               coordinates: [ [ ...bound, bound[0] ] ],
               strokeColor: props.strokeColor ?? defaults.rectangle.strokeColor,
               strokeWidth: props.strokeWidth ?? defaults.rectangle.strokeWidth,
               color: props.color ?? defaults.rectangle.color,
               zIndex: props.zIndex ?? 101
            });
         });
      }

      return () => map && rectangle && rectangle.destroy();
   }, [ map, props.northEast, props.southWest ]);

   return null;
}

export default Rectangle;