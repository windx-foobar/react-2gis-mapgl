import React from 'react';
import { useDGisMap } from './contexts_hooks';
import { MapEventTable as DGMapEventTable } from '@2gis/mapgl/types';

export type MapHandlers = {
   [P in keyof DGMapEventTable]?: (e: DGMapEventTable[P]) => any | void;
}

interface EventHandlersProps {
   handlers: MapHandlers;
}

export function EventHandlers(props: EventHandlersProps): null {
   const map = useDGisMap();

   React.useEffect(() => {
      if (map) {
         Object.keys(props.handlers).forEach((event: keyof DGMapEventTable) => {
            map.on(event, props.handlers[event]!);
         });
      }

      return () => {
         if (map) {
            Object.keys(props.handlers).forEach((event: keyof DGMapEventTable) => {
               map.off(event, props.handlers[event]!);
            });
         }
      }
   }, [ map, props.handlers ]);

   return null;
}

export default EventHandlers;