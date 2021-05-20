import React from 'react';
import { load } from '@2gis/mapgl';
import {
   HtmlMarkerOptions as DGHtmlMarkerOptions,
   HtmlMarker as DGHtmlMarker
} from '@2gis/mapgl/types';

import { useDGisMap } from '../contexts_hooks';

export type HtmlMarkerHandlers = {
   [P in keyof HTMLElementEventMap]?: (e: HTMLElementEventMap[P]) => any | void;
}

interface HtmlMarkerOptions extends DGHtmlMarkerOptions {
   handlers?: HtmlMarkerHandlers;
}

export function HtmlMarker(props: HtmlMarkerOptions): null {
   const map = useDGisMap();

   React.useEffect(() => {
      let marker: DGHtmlMarker;

      if (map) {
         load().then(mapgl => {
            marker = new mapgl.HtmlMarker(map, {
               html: props.html,
               coordinates: props.coordinates,
               zIndex: props.zIndex ?? 102
            });

            const html = marker.getContent();

            if (props.handlers) {
               Object.keys(props.handlers).forEach((event: keyof HtmlMarkerHandlers) => {
                  html.addEventListener(event, props.handlers![event]!);
               });
            }
         });
      }

      return () => map && marker && marker.destroy();
   }, [ map, props.coordinates ]);

   return null;
}

export default HtmlMarker;