import React from 'react';
import { load } from '@2gis/mapgl';
import {
   DynamicObjectEventTable as DGDynamicObjectEventTable,
   PolygonOptions as DGPolygonOptions,
   Polygon as DGPolygon
} from '@2gis/mapgl/types';

import { isEqual, last, first } from 'lodash';

import { useDGisMap } from '../contexts_hooks';
import { defaults } from '../constants/defaults';

export type PolygonHandlers = {
   [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
}

interface PolygonOptions extends DGPolygonOptions {
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
         });
      }

      return () => map && polygon && polygon.destroy();
   }, [ map, props.coordinates ]);

   return null;
}

export default Polygon;