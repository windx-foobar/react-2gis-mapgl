import React from 'react';
import { LngLat, useDGisMap } from '../index';

interface VirutalEventsProps {
   center: LngLat | number[];
   zoom: number;
}

export function VirtualEvents(props: VirutalEventsProps): null {
   const map = useDGisMap();

   React.useEffect(() => {
      if (map) map.setCenter(props.center);
   }, [ map, props.center ]);

   React.useEffect(() => {
      if (map) map.setZoom(props.zoom);
   }, [ map, props.zoom ]);

   React.useEffect(() => {
      if (map) {
         window.addEventListener('resize', () => {
            map.invalidateSize();
         });
      }
   }, [ map ]);

   return null;
}

export default VirtualEvents;