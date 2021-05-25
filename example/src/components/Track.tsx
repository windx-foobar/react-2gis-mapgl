import React from 'react';
import { Polyline, MarkerWithTooltip, MarkerWithTooltipHandlers, HtmlMarker, Bound } from 'itis-dgis';

interface TrackProps {
   wayPoints?: Bound[];
   firstPoint?: Bound;
   lastPoint?: Bound;
}

const tooltipSettings = {
   minWidth: 'auto',
   offsetTop: '-180%',
   offsetLeft: '-50%',
   showTip: false,
   padding: '5px 10px',
   cursor: 'pointer'
}

export function Track(props: TrackProps) {
   const markerHandlers = React.useMemo(
      (): MarkerWithTooltipHandlers => ({
         click(e, idx, setShowTooltip) {
            setShowTooltip(false);
         }
      }),
      []
   );

   if (props.wayPoints && props.firstPoint && props.lastPoint) {
      return (
         <React.Fragment>
            <MarkerWithTooltip
               coordinates={ [ props.firstPoint.lon ?? props.firstPoint.lng ?? 0, props.firstPoint.lat ] }
               tooltip={ {
                  text: 'А',
                  ...tooltipSettings
               } }
               tooltipHandlers={ {
                  click: (e, setShow) => markerHandlers.click(e, 0, setShow)
               } }
            />
            <Polyline coordinates={ props.wayPoints.map(point => [ point.lon ?? point.lng ?? 0, point.lat ]) } />
            <MarkerWithTooltip
               coordinates={ [ props.lastPoint.lon ?? props.lastPoint.lng ?? 0, props.lastPoint.lat ] }
               tooltip={ {
                  text: 'Б',
                  ...tooltipSettings
               } }
               tooltipHandlers={ {
                  click: (e, setShow) => markerHandlers.click(e, props.wayPoints!.length - 1, setShow)
               } }
            />
         </React.Fragment>
      );
   }

   return null;
}

export default Track;