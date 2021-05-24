import React from 'react';
import {
   Clusterer,
   ClustererOptions,
   InputMarker,
   ClusterStyle
} from '@2gis/mapgl-clusterer';

import { useDGisMap } from '../contexts_hooks';
import { BaseFigureOptions } from '../interfaces/base_figure_options';

type BaseClustererOptions = ClustererOptions & BaseFigureOptions<Clusterer>;

interface ClusterOptions extends BaseClustererOptions {
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

         if (props.onCreate) props.onCreate(clusterer);
      }

      return () => {
         if (clusterer) {
            clusterer.destroy();

            if (props.onDestroy) props.onDestroy(clusterer);
         }
      }
   }, [ map, props.markers, props.radius ]);

   return null;
}

export default Cluster;