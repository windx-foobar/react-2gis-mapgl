import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Marker, MarkerOptions } from './marker';
import { HtmlMarker, HtmlMarkerOptions } from './marker_html';

import useStyles from './marker_with_tooltip.style';

export interface MarkerWithTooltipHandlers {
   click(...args: any): any | void
}

interface TooltipProps {
   tooltip: {
      text: string,
      minWidth?: string,
      maxWidth?: string,
      offsetTop?: string,
      offsetLeft?: string,
      showTip?: boolean,
      padding?: string,
      cursor?: string,
      throwCreate?: HtmlMarkerOptions['throwCreate'],
      throwDestroy?: HtmlMarkerOptions['throwDestroy'],
   }
}

interface MarkerWithTooltipOptions {
   tooltipHandlers?: MarkerWithTooltipHandlers;
}

type MarkerWithTooltipProps = MarkerOptions & MarkerWithTooltipOptions & TooltipProps;

function Tooltip(props: TooltipProps) {
   const classes = useStyles();

   return (
      <div
         className={ classes.root }
         style={
            {
               maxWidth: props.tooltip.maxWidth,
               minWidth: props.tooltip.minWidth,
               transform: `translate(${ props.tooltip.offsetLeft }, ${ props.tooltip.offsetTop })`,
               cursor: props.tooltip.cursor
            }
         }
      >
         <div
            className={ classes.content }
            style={ {
               padding: props.tooltip.padding
            } }
         >
            <span>{ props.tooltip.text }</span>
         </div>
         { props.tooltip.showTip && (<div className={ classes.tip } />) }
      </div>
   );
}

export function MarkerWithTooltip(props: MarkerWithTooltipProps) {
   const [ showTooltip, setShowTooltip ] = React.useState(true);

   return (
      <React.Fragment>
         <Marker
            coordinates={ props.coordinates }
            handlers={ {
               click: (e) => props.tooltipHandlers?.click(e, setShowTooltip)
            } }
            throwCreate={ props.throwCreate }
            throwDestroy={ props.throwDestroy }
         />
         { showTooltip && (
            <HtmlMarker
               coordinates={ props.coordinates }
               html={ ReactDOMServer.renderToString(<Tooltip tooltip={ props.tooltip } />) }
               handlers={ {
                  click: (e) => props.tooltipHandlers?.click(e, setShowTooltip)
               } }
            />
         ) }
      </React.Fragment>
   )
}

export default MarkerWithTooltip;