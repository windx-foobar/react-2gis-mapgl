import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Circle, CirclePoints, CircleHandlers } from './circle';
import { HtmlMarker, HtmlMarkerHandlers } from './marker_html';
import HtmlDynamicMarker from './marker_dynamic_html';
import Polyline from './polyline';
import Polygon from './polygon';
import * as allFigures from '../constants/figures';
import { useDGisMap } from '../contexts_hooks';
import { MapHandlers } from '../handlers';
import { destructBoundTuple } from '../helpers';

export interface DrawManagerProps {
   figureType: number;
   setData: React.Dispatch<React.SetStateAction<any>>;
   destructPolyline?: boolean;
   destructCircle?: boolean;
   destructPolygon?: boolean;
   onCreate?: (message: string) => any;
}

export const initialCircle: CirclePoints = {
   coordinates: [],
   radius: 45000
};

export function HtmlCircleMarkerHtml(): JSX.Element {
   return (
      <div
         style={ {
            backgroundColor: 'white',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            border: '3px solid #0081F2',
            borderRadius: '100%',
            transform: 'translate(-14px, -20px)'
         } }
      />
   );
}

export function HtmlMarkerHtml(props: { last?: boolean }): JSX.Element {
   if (props.last) {
      return (
         <div
            style={ {
               backgroundColor: 'white',
               width: '25px',
               height: '25px',
               cursor: 'pointer',
               border: '3px solid #0081F2',
               borderRadius: '100%',
               transform: 'translate(-12px, -10px)'
            } }
         >
            <div
               style={ {
                  backgroundColor: 'white',
                  width: '15px',
                  height: '15px',
                  cursor: 'pointer',
                  border: '2px solid #0081F2',
                  borderRadius: '100%',
                  transform: 'translate(2px, 2px)'
               } }
            />
         </div>
      );
   }

   return (
      <div
         style={ {
            backgroundColor: 'white',
            width: '25px',
            height: '25px',
            cursor: 'pointer',
            border: '3px solid #0081F2',
            borderRadius: '100%',
            transform: 'translate(-12px, -10px)'
         } }
      />
   );
}

export function DrawManager(props: DrawManagerProps) {
   const map = useDGisMap();

   const [ circleCreate, setCircleCreate ] = React.useState(false);
   const [ circleModel, setCircleModel ] = React.useState(initialCircle);
   const [ circleMoving, setCircleMoving ] = React.useState(false);

   const [ polylineCreate, setPolylineCreate ] = React.useState(false);
   const [ polylineModel, setPolylineModel ] = React.useState([
      [ 0, 0 ]
   ]);

   const [ polygonCreate, setPolygonCreate ] = React.useState(false);
   const [ polygonModel, setPolygonModel ] = React.useState([
      [ 0, 0 ]
   ]);

   const [ initFirstMarker, setInitFirstMarker ] = React.useState(true);
   const [ showMarkers, setShowMarkers ] = React.useState(true);

   const mapHandlers = React.useMemo(
      (): MapHandlers => ({
         click(e) {
            if (!showMarkers) return showMarkers;

            if (circleCreate) {
               if (initFirstMarker) {
                  setCircleModel(model => ({
                     ...model,
                     coordinates: e.lngLat
                  }));

                  setInitFirstMarker(false);
                  return true;
               }

               return initFirstMarker;
            }

            if (polylineCreate) {
               if (initFirstMarker) {
                  setPolylineModel([ e.lngLat ]);
                  setInitFirstMarker(false);
               } else {
                  setPolylineModel((model) => [ ...model, e.lngLat ]);
               }
               return true;
            }

            if (polygonCreate) {
               if (initFirstMarker) {
                  setPolygonModel([ e.lngLat ]);
                  setInitFirstMarker(false);
               } else {
                  setPolygonModel((model) => [ ...model, e.lngLat ]);
               }
               return true;
            }

            return false;
         },
         mousemove(e) {
            if (circleMoving) {
               setCircleModel(model => ({
                  ...model,
                  coordinates: e.lngLat
               }))
            }
         },
         mouseup(e) {
            if (circleMoving) {
               setCircleMoving(false);
               return true;
            }

            return false;
         }
      }),
      [
         circleCreate,
         circleMoving,
         polylineCreate,
         polygonCreate,
         initFirstMarker,
         showMarkers
      ]
   );

   const circleCenterMarkerHandlers = React.useMemo((): HtmlMarkerHandlers => ({
      mousedown() {
         setCircleMoving(true);
      },
      mouseup() {
         setCircleMoving(false);
      },
      click() {
         setShowMarkers(false);
         if (props.destructCircle) {
            props.setData({
               ...destructBoundTuple(circleModel.coordinates),
               radius: circleModel.radius
            });
         } else {
            props.setData(circleModel);
         }

         if (props.onCreate) props.onCreate('???????? ?????????????? ????????????');
      },
      wheel(e) {
         e.preventDefault();
         let down = e.deltaY > 0;

         setCircleModel(model => {
            let newRadius = model.radius / 100;

            if (down) {
               let newVal = model.radius - (newRadius > 500 ? newRadius : 500);
               return {
                  ...model,
                  radius: newVal <= 100 ? 100 : newVal
               }
            }

            return {
               ...model,
               radius: model.radius + (newRadius > 500 ? newRadius : 500)
            }
         });
      }
   }), [ circleModel ]);

   const circleHandlers = React.useMemo((): CircleHandlers => ({
      mousemove(e) {
         if (circleMoving) {
            setCircleModel(model => ({
               ...model,
               coordinates: e.lngLat
            }))
         }
      },
      mouseup() {
         if (circleMoving) {
            setCircleMoving(false);
            return true;
         }

         return false;
      }
   }), [ circleMoving ]);

   const lineLastMarkerHandlers = React.useMemo(
      (): HtmlMarkerHandlers => ({
         click() {
            if (!initFirstMarker) {
               setShowMarkers(false);

               if (polygonCreate) {
                  props.setData({
                     points: [ ...polygonModel, polygonModel[0] ]
                        .map(bound => props.destructPolygon ? destructBoundTuple(bound) : bound)
                  });
                  if (props.onCreate) props.onCreate('?????????????? ?????????????? ????????????');
                  return true;
               }

               props.setData({
                  points: polylineModel
                     .map(bound => props.destructPolyline ? destructBoundTuple(bound) : bound)
               });
               if (props.onCreate) props.onCreate('?????????? ?????????????? ??????????????');
               return true;
            }

            return false;
         }
      }),
      [ initFirstMarker, polylineCreate, polygonCreate, polylineModel, polygonModel ]
   );

   React.useEffect(() => {
      switch (props.figureType) {
         case allFigures.Circle:
            setCircleCreate(true);
            break;
         case allFigures.Polygon:
            setPolygonCreate(true);
            break;
         case allFigures.Polyline:
            setPolylineCreate(true);
            break;
      }

      return () => {
         setCircleCreate(false);
         setPolygonCreate(false);
         setPolylineCreate(false);
      }
   }, [ props.figureType ]);

   React.useEffect(
      () => {
         if (map) {
            map.on('click', mapHandlers.click!);

            if (circleMoving) {
               map.on('mouseup', mapHandlers.mouseup!);
               map.on('mousemove', mapHandlers.mousemove!);
            }
         }

         return () => {
            if (map) {
               map.off('click', mapHandlers.click!);
               map.off('mouseup', mapHandlers.mouseup!);
               map.off('mousemove', mapHandlers.mousemove!);
            }
         };
      },
      [
         map,
         circleCreate,
         circleMoving,
         polylineCreate,
         polygonCreate,
         initFirstMarker,
         showMarkers
      ]
   );

   return (
      <React.Fragment>
         { circleCreate && circleModel.coordinates.length === 2 && (
            <React.Fragment>
               { showMarkers && circleModel.radius && (
                  <React.Fragment>
                     <HtmlDynamicMarker
                        coordinates={ circleModel.coordinates }
                        html={ ReactDOMServer.renderToString(<HtmlCircleMarkerHtml />) }
                        handlers={ circleCenterMarkerHandlers }
                     />
                  </React.Fragment>
               ) }
               <Circle
                  coordinates={ circleModel.coordinates }
                  radius={ circleModel.radius }
                  handlers={ circleHandlers }
               />
            </React.Fragment>
         ) }
         { polylineCreate && !!polylineModel[0].filter(lngLat => lngLat > 0).length && (
            <React.Fragment>
               { showMarkers && polylineModel.map((model, idx, models) => (
                  <HtmlDynamicMarker
                     coordinates={ model }
                     html={ ReactDOMServer.renderToString(<HtmlMarkerHtml last={ idx === models.length - 1 } />) }
                     handlers={ idx === models.length - 1 ? lineLastMarkerHandlers : undefined }
                     key={ model[0] + model[1] }
                  />
               )) }
               <Polyline coordinates={ polylineModel } />
            </React.Fragment>
         ) }
         { polygonCreate && !!polygonModel[0].filter(lngLat => lngLat > 0).length && (
            <React.Fragment>
               { showMarkers && polygonModel.map((model, idx, models) => (
                  <HtmlDynamicMarker
                     coordinates={ model }
                     html={ ReactDOMServer.renderToString(<HtmlMarkerHtml last={ idx === models.length - 1 } />) }
                     handlers={ idx === models.length - 1 ? lineLastMarkerHandlers : undefined }
                     key={ model[0] + model[1] }
                  />
               )) }
               <Polygon coordinates={ [ polygonModel ] } />
            </React.Fragment>
         ) }
      </React.Fragment>
   )
}

export default DrawManager;