import React from 'react';
import { load } from '@2gis/mapgl';
import {
   HtmlMarkerOptions as DGHtmlMarkerOptions,
   HtmlMarker as DGHtmlMarker
} from '@2gis/mapgl/types';
import { BaseFigureOptions } from '../interfaces/base_figure_options';

import { useDGisMap } from '../contexts_hooks';

export type HtmlMarkerHandlers = {
   [P in keyof HTMLElementEventMap]?: (e: HTMLElementEventMap[P]) => any | void;
}

type BaseHtmlMarkerOptions = BaseFigureOptions<DGHtmlMarker> & DGHtmlMarkerOptions;

export interface HtmlMarkerOptions extends BaseHtmlMarkerOptions {
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

            if (props.throwCreate) props.throwCreate(marker);
         });
      }

      return () => {
         if (marker) {
            if (props.throwDestroy) props.throwDestroy(marker);
            marker.destroy();
         }
      }
   }, [ map, props.coordinates[0], props.coordinates[1] ]);

   return null;
}

export default HtmlMarker;