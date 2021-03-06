import React, { Dispatch, SetStateAction } from 'react';
import { LatLngExpression } from 'leaflet';
import { LngLat, RectanglePoints, CirclePoints, allFigures, destructBoundTuple } from 'itis-dgis';
import { CarMarkerPointWithName } from '../../App';
import {
   polylines as _polylines,
   circles as _circles,
   polygons as _polygons,
} from '../../constants/mock';

import clsx from 'clsx';
import useStyles from './Bar.style';

interface Bar {
   setMarkers: Dispatch<SetStateAction<LngLat[] | number[][]>>;
   setMapCenter: Dispatch<SetStateAction<LngLat | number[]>>;
   setZoom: Dispatch<SetStateAction<number>>;
   setPolylines: Dispatch<SetStateAction<number[][][]>>;
   setCluster: Dispatch<SetStateAction<number[][]>>;
   setPolygon: Dispatch<SetStateAction<number[][][][]>>;
   setRectangle: Dispatch<SetStateAction<RectanglePoints[]>>;
   setCircle: Dispatch<SetStateAction<CirclePoints[]>>;
   setDrawManager: Dispatch<SetStateAction<boolean>>;
   setDrawManagerFigure: Dispatch<SetStateAction<number>>;
   setDrawManagerData: Dispatch<SetStateAction<any>>;
   setCarMarkers: Dispatch<SetStateAction<CarMarkerPointWithName[]>>;
   setEditManager: Dispatch<SetStateAction<boolean>>;
   setEditManagerFigure: Dispatch<SetStateAction<number>>;
   setEditManagerData: Dispatch<SetStateAction<any>>;
}

export const Bar = (props: Bar) => {
   const classes = useStyles();

   const handlers = {
      markerHandler(lat?: number, lng?: number, name?: string, update: boolean = true): boolean {
         // props.setWayPoints([]);
         // props.setIdxWayPoints(null);
         // props.setIdxInfo(null);

         if (!lat && !lng && !name) {
            props.setMarkers([]);
            return false;
         }

         if (lat && lng) {
            props.setMapCenter([ lng, lat ]);

            if (name) {
               if (update) {
                  props.setMarkers(markers => [ [ lng, lat ] ]);
                  return false;
               }

               props.setMarkers(markers => [ ...markers, [ lng, lat ] ]);
               return true;
            }
         }

         return false;
      },
      polylineHandler(update: boolean = true, ...points: number[][][]): boolean {
         if (points && points.length) {
            if (update) {
               props.setPolylines(prev => [
                  ...prev,
                  ...points
               ]);

               return false;
            }

            props.setPolylines(() => points);

            return true;
         }

         props.setPolylines(() => []);

         return false;
      },
      clusterHandler(update: boolean = true, ...markers: number[][]): boolean {
         if (markers.length) {
            if (update) {
               props.setCluster(markers);
               return false;
            }

            props.setCluster(cluster => [ ...cluster, ...markers ]);
            return true;
         }

         props.setCluster([]);
         return false;
      },
      polygonHandler(update: boolean = true, polygon?: number[][][]): boolean {
         if (polygon) {
            if (update) {
               props.setPolygon(polygons => [ polygon ]);
               return false;
            }

            props.setPolygon(polygons => [ ...polygons, polygon ]);
            return true;
         }

         props.setPolygon([]);
         return false;
      },
      rectangleHandler(update: boolean = true, rectangle?: RectanglePoints): boolean {
         if (rectangle) {
            if (update) {
               props.setRectangle(rects => [ rectangle ]);
               return false;
            }

            props.setRectangle(rects => [ ...rects, rectangle ]);
            return true;
         }

         props.setRectangle([]);
         return false;
      },
      circleHandler(update: boolean = true, circle?: CirclePoints): boolean {
         if (circle) {
            if (update) {
               props.setCircle(() => [ circle ]);
               return false;
            }

            props.setCircle(circles => [ ...circles, circle ]);
            return true;
         }

         props.setCircle([]);
         return false;
      },
      resetAlLFigures() {
         this.markerHandler();
         this.clusterHandler();
         this.polygonHandler();
         this.polylineHandler();
         this.rectangleHandler();
         this.circleHandler();
         props.setCarMarkers([]);
      },
      managerHandler(active: boolean, figure: number = 1) {
         this.resetAlLFigures();

         if (!active) {
            props.setDrawManagerData(null);
         }

         props.setDrawManager(active);
         props.setDrawManagerFigure(figure);
      },
      editorHandler(active: boolean, figure: number = 1, data: any = null) {
         this.resetAlLFigures();

         props.setEditManagerData(data);
         props.setEditManager(active);
         props.setEditManagerFigure(figure);
      },
   }

   return (
      <div className={ classes.root }>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.markerHandler(56.249142, 50.913278, 'B173CH 716') }
            >
               ???????????????????? ???????????? 1
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.markerHandler(55.871768, 50.371617, 'B280CH 716') }
            >
               ???????????????????? ???????????? 2
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.markerHandler(56.941435, 49.087209, 'B511CH 716') }
            >
               ???????????????????? ???????????? 3
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.markerHandler(56.871589, 60.665767, 'B173CH 716', false) }
            >
               ???????????????????? ?? ?????????????????????? ???????????? 4
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.markerHandler(55.446793, 65.329814, 'B280CH 716', false) }
            >
               ???????????????????? ?? ?????????????????????? ???????????? 5
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.markerHandler(58.57096, 49.363564, 'B511CH 716', false) }
            >
               ???????????????????? ?? ?????????????????????? ???????????? 6
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.markerHandler() }
            >
               ?????????????? ?????? ??????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.polylineHandler(false, [
                  [ 52.408468, 55.730915 ],
                  [ 49.146709, 55.839746 ],
                  [ 37.622627, 55.751856 ]
               ]) }
            >
               ?????????????????? ???????????? ?????????? - ???????????? - ????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.polylineHandler(false, [
                  [ 52.408468, 55.730915 ],
                  [ 49.146709, 55.839746 ],
                  [ 37.622627, 55.751856 ],
                  [ 30.294951, 59.942665 ]
               ]) }
            >
               ?????????????????? ???????????? ?????????? - ???????????? - ???????????? - ??????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.polylineHandler(true, [
                  [ 52.408468, 55.730915 ],
                  [ 51.809728, 55.619533 ]
               ]) }
            >
               ???????????????? ???????????? ?????????? - ????????????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.polylineHandler(true, [
                  [ 52.408468, 55.730915 ],
                  [ 56.017821, 54.77546 ]
               ]) }
            >
               ???????????????? ???????????? ?????????? - ??????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.polylineHandler() }
            >
               ?????????????? ?????? ??????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.circleHandler(true, {
                  radius: 4000,
                  coordinates: [ 48.74687907736965, 55.751014778026374 ]
               }) }
            >
               ?????????????????? ???????? ???????????? ????????????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.circleHandler(false, {
                  radius: 10000,
                  coordinates: [ 49.123276023979244, 55.800209574895604 ]
               }) }
            >
               ???????????????? ???????? ???????????? ????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.circleHandler() }
            >
               ?????????????? ??????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.polygonHandler(true, [
                  [
                     [ 52.001277, 55.956086 ],
                     [ 51.92097, 55.696094 ],
                     [ 52.523556, 55.48219 ],
                     [ 52.945682, 55.484709 ],
                     [ 53.036524, 55.765094 ],
                     [ 52.890319, 56.107784 ],
                  ]
               ]) }
            >
               ?????????????????? ?????????????? ???????????? ????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.polygonHandler(false, [
                  [
                     [ 52.001277, 55.956086 ],
                     [ 51.92097, 55.696094 ],
                     [ 52.523556, 55.48219 ],
                     [ 52.945682, 55.484709 ],
                     [ 53.036524, 55.765094 ],
                     [ 52.890319, 56.107784 ],
                  ]
               ]) }
            >
               ???????????????? ?????????????? ???????????? ????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.polygonHandler() }
            >
               ?????????????? ????????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.rectangleHandler(true, {
                  northEast: [ 49.72327037361487, 58.62484785229232 ],
                  southWest: [ 49.545216597735056, 58.59501495969932 ],
               }) }
            >
               ?????????????????? ?????????????????????????? ?? ????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.rectangleHandler(false, {
                  northEast: [ 49.684868112828916, 58.56445449110284 ],
                  southWest: [ 49.68520145243108, 58.56587009741261 ],
               }) }
            >
               ???????????????? ?????????????????????????? ???? ?????????? ????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.rectangleHandler() }
            >
               ?????????????? ????????????????????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.clusterHandler() }
            >
               ?????????????? ?????????????? ?? ????????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.managerHandler(true, allFigures.Circle) }
            >
               ?????????????? ????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.managerHandler(true, allFigures.Polyline) }
            >
               ?????????????? ????????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.managerHandler(true, allFigures.Polygon) }
            >
               ?????????????? ??????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.editorHandler(true, allFigures.Circle, {
                  radius: _circles[0].radius,
                  lat: _circles[0].coordinates[1],
                  lon: _circles[0].coordinates[0]
               }) }
            >
               ???????????????? ????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.editorHandler(true, allFigures.Polyline, {
                  points: _polylines[0].map(bound => destructBoundTuple(bound))
               }) }
            >
               ???????????????? ????????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.editorHandler(true, allFigures.Polygon, {
                  points: _polygons[0][0].map(bound => destructBoundTuple(bound))
               }) }
            >
               ???????????????? ??????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.resetAlLFigures() }
            >
               ?????????????? ?????? ????????????????
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => {
                  handlers.managerHandler(false)
                  handlers.editorHandler(false)
               } }
            >
               ???????????????? ???????????????? ????????????
            </button>
         </div>
         {/*<Info />*/ }
      </div>
   )
}