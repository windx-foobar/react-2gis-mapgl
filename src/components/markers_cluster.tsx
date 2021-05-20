import React from 'react';
import {
   Clusterer,
   ClustererOptions,
   InputMarker,
   ClusterStyle
} from '@2gis/mapgl-clusterer';

import { useDGisMap } from '../contexts_hooks';

interface ClusterOptions extends ClustererOptions {
   radius: number;
   markers: InputMarker[];
   clusterStyle?: ClusterStyle
}

export function Cluster(props: ClusterOptions): null {
   const map = useDGisMap();

   React.useEffect(() => {
      let clusterer: Clusterer;

      if (map && props.markers.length) {
         clusterer = new Clusterer(map, {
            radius: props.radius,
            clusterStyle: props.clusterStyle ?? {},
         });

         clusterer.load(props.markers);
      }

      return () => map && clusterer && clusterer.destroy();
   }, [ map, props.markers, props.radius ]);

   return null;
}

export default Cluster;