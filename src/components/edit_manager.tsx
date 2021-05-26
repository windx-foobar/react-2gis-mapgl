import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Circle, CirclePoints, CircleHandlers } from './circle';
import { HtmlMarker, HtmlMarkerHandlers } from './marker_html';
import Polyline from './polyline';
import Polygon from './polygon';
import * as allFigures from '../constants/figures';
import { useDGisMap } from '../contexts_hooks';
import { MapHandlers } from '../handlers';
import {
   HtmlMarkerHtml,
   HtmlCircleMarkerHtml,
   initialCircle,
} from './draw_manager';
import { createBoundTuple, destructBoundTuple, Bound } from '../helpers';

interface EditManagerProps {
   figureData: {
      points?: Bound[],
      radius?: number,
      lat?: number,
      lon?: number,
      lng?: number,
      southWest: Bound,
      northEast: Bound
   };
   figureType: number;
   setData: React.Dispatch<React.SetStateAction<any>>;
   destructPolyline?: boolean;
   destructCircle?: boolean;
   destructPolygon?: boolean;
   onUpdate?: (message: string) => any;
}

interface HtmlCustomHandlers extends Omit<HtmlMarkerHandlers, 'click'> {
   click?: (e: MouseEvent, currentIdx: number) => any;
}

export function EditManager(props: EditManagerProps) {
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

   const [ initFirstMarker, setInitFirstMarker ] = React.useState(false);
   const [ showMarkers, setShowMarkers ] = React.useState(true);

   const mapHandlers = React.useMemo(
      (): MapHandlers => ({
         click(e) {
            if (!showMarkers) return showMarkers;

            if (polylineCreate) {
               setPolylineModel((model) => [ ...model, e.lngLat ]);
               return true;
            }

            if (polygonCreate) {
               setPolygonModel((model) => [ ...model, e.lngLat ]);
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

   const circleCenterMarkerHandlers = React.useMemo(
      (): HtmlMarkerHandlers => ({
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

            if (props.onUpdate) props.onUpdate('Круг успешно отредактирован');
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
      }),
      [ circleModel ]
   );

   const circleHandlers = React.useMemo(
      (): CircleHandlers => ({
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
      }),
      [ circleMoving ]
   );

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

                  if (props.onUpdate) props.onUpdate('Полигон успешно отредактирован');
                  return true;
               }

               props.setData({
                  points: polylineModel
                     .map(bound => props.destructPolyline ? destructBoundTuple(bound) : bound)
               });

               if (props.onUpdate) props.onUpdate('Линия успешно отредактирована');
               return true;
            }

            return false;
         }
      }),
      [
         initFirstMarker,
         polylineCreate,
         polygonCreate,
         polylineModel,
         polygonModel
      ]
   );

   const lineAllMarkerHandlers = React.useMemo(
      (): HtmlCustomHandlers => ({
         click(e, currentIdx) {
            if (polygonCreate) {
               setPolygonModel(prev => prev.filter((_, idx) => idx !== currentIdx));
               return true;
            }

            if (polylineCreate) {
               setPolylineModel(prev => prev.filter((_, idx) => idx !== currentIdx));
               return true;
            }

            return false;
         }
      }),
      [
         initFirstMarker,
         polylineCreate,
         polygonCreate,
         polylineModel.length,
         polygonModel.length
      ]
   );

   React.useEffect(
      () => {
         switch (props.figureType) {
            case allFigures.Circle:
               setCircleCreate(true);
               setCircleModel({
                  coordinates: [ props.figureData!.lon ?? props.figureData!.lng ?? 0, props.figureData!.lat! ],
                  radius: props.figureData!.radius!
               });
               break;
            case allFigures.Polygon:
               setPolygonCreate(true);
               let points = props.figureData!.points!.map(bound => createBoundTuple(bound));
               let [ first, last ] = [ points[0], points[points.length - 1] ];

               if (first[0] === last[0] && first[1] === last[1]) {
                  setPolygonModel(() => points.filter(
                     (_, idx, all) => idx !== all.length - 1)
                  );
               } else {
                  setPolygonModel(() => points);
               }
               break;
            case allFigures.Polyline:
               setPolylineCreate(true);
               setPolylineModel(() => props.figureData!.points!.map(bound => createBoundTuple(bound)));
               break;
         }

         return () => {
            setCircleCreate(false);
            setPolygonCreate(false);
            setPolylineCreate(false);
         }
      },
      [
         props.figureType,
         props.figureData
      ]
   );

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
                     <HtmlMarker
                        coordinates={ circleModel.coordinates }
                        html={ ReactDOMServer.renderToString(<HtmlCircleMarkerHtml />) }
                        handlers={ circleCenterMarkerHandlers }
                        zIndex={ 300 }
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
               { showMarkers && polylineModel.map((bound, idx, models) => (
                  <HtmlMarker
                     coordinates={ bound }
                     html={ ReactDOMServer.renderToString(<HtmlMarkerHtml last={ idx === models.length - 1 } />) }
                     handlers={ idx === models.length - 1 ? lineLastMarkerHandlers : {
                        ...lineAllMarkerHandlers,
                        click: (e) => lineAllMarkerHandlers.click!(e, idx)
                     } }
                     key={ bound[0] + bound[1] }
                  />
               )) }
               <Polyline coordinates={ polylineModel } />
            </React.Fragment>
         ) }
         { polygonCreate && !!polygonModel[0].filter(lngLat => lngLat > 0).length && (
            <React.Fragment>
               { showMarkers && polygonModel.map((bound, idx, models) => (
                  <HtmlMarker
                     coordinates={ bound }
                     html={ ReactDOMServer.renderToString(<HtmlMarkerHtml last={ idx === models.length - 1 } />) }
                     handlers={ idx === models.length - 1 ? lineLastMarkerHandlers : {
                        ...lineAllMarkerHandlers,
                        click: (e) => lineAllMarkerHandlers.click!(e, idx)
                     } }
                     key={ bound[0] + bound[1] }
                  />
               )) }
               <Polygon coordinates={ [ polygonModel ] } />
            </React.Fragment>
         ) }
      </React.Fragment>
   )
}

export default EditManager;