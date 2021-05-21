import React from 'react';
import { load } from '@2gis/mapgl';
import {
   DynamicObjectEventTable as DGDynamicObjectEventTable,
   Polygon as DGPolygon
} from '@2gis/mapgl/types';
import { BaseFigureOptions } from '../interfaces/base_figure_options';

import { useDGisMap } from '../contexts_hooks';
import { defaults } from '../constants/defaults';
import { MarkerHandlers } from './marker';

export type RectangleHandlers = {
   [P in keyof DGDynamicObjectEventTable]: (e: DGDynamicObjectEventTable[P]) => any | void;
}

export interface RectanglePoints {
   southWest: number[];
   northEast: number[];
}

type BaseRectangleOptions = BaseFigureOptions<DGPolygon> & RectanglePoints;

interface RectangleOptions extends BaseRectangleOptions {
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

            if (props.handlers) {
               Object.keys(props.handlers).forEach((event: keyof MarkerHandlers) => {
                  rectangle.on(event, props.handlers![event]!);
               });
            }

            if (props.throwCreate) {
               props.throwCreate(rectangle);
            }


         });
      }

      return () => {
         if (rectangle) {
            if (props.throwDestroy) {
               props.throwDestroy(rectangle);
            }

            rectangle.destroy();
         }
      }
   }, [ map ]);

   return null;
}

export default Rectangle;