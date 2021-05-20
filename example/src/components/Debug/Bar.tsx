import React, { Dispatch, SetStateAction } from 'react';
import { LatLngExpression } from 'leaflet';
import { LngLat, RectanglePoints, CirclePoints, allFigures } from 'itis-dgis';
import { CarMarkerPoint } from '../../App';

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
   setCarMarkers: Dispatch<SetStateAction<CarMarkerPoint[]>>;
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
      }
      /*polylineHandler(db = null) {
         props.setMarkers([]);
         if (db) {
            const half = db.length / 2;

            props.setIdxWayPoints(0);
            props.setWayPoints(db);
            props.setMapCenter([ db[half].lon, db[half].lat ]);
         } else {
            props.setIdxWayPoints(null);
            props.setWayPoints([]);
            props.setIdxInfo(null);
         }
      },
      logDb() {
         console.log(db);
      },
      geozonesHandler() {
         props.setMarkers([]);
         props.setWayPoints([]);
         props.setIdxWayPoints(null);
         props.setIdxInfo(null);

         graphQLClient.request(queryGeozones).then((data) => {
            const { geozones } = data;
            props.setGeozoneObjects(geozones);
            props.setMapPage(_ => ({ pageGeozone: false, pageGeozoneObjects: true }));
         });
      },
      geozoneHandler(name) {
         props.setMarkers([]);
         props.setWayPoints([]);
         props.setIdxWayPoints(null);
         props.setIdxInfo(null);

         graphQLClient.request(queryGeozoneByName, {
            name: name ?? 'Наб. Челны'
         }).then((data) => {
            const { geozoneByName: geozone } = data;

            mapI.setCenter([ geozone.data.lon, geozone.data.lat ]);

            props.setGeozoneObject(geozone);
            props.setMapPage(_ => ({ pageGeozone: true, pageGeozoneObjects: false }));
         })
      },
      resetGeozonesHandler() {
         props.setGeozoneObject({});
         props.setGeozoneObjects([]);
         props.setMarkers([]);
         props.setMapPage(_ => ({ pageGeozone: false, pageGeozoneObjects: true }));
      },
      graphQLTest() {
         graphQLClient.request(queryGeozones).then(data => {
            console.log(data);
         }).catch(err => {
            console.log(err);
         });
      },
      createCircleGeozone() {
         props.setMarkers([]);
         props.setWayPoints([]);
         props.setIdxWayPoints(null);
         props.setIdxInfo(null);
         props.setGeozoneObject({});
         props.setGeozoneObjects([]);
         props.setMapPage(prev => ({
            ...prev,
            pageGeozone: false,
            pageGeozoneObjects: false,
            pageGeozoneCreate: true
         }));
         props.setDrawingFigure(prev => ({
            ...prev,
            figure: Circle,
         }));
      },
      createPolylineGeozone() {
         props.setMarkers([]);
         props.setWayPoints([]);
         props.setIdxWayPoints(null);
         props.setIdxInfo(null);
         props.setGeozoneObject({});
         props.setGeozoneObjects([]);
         props.setMapPage(prev => ({
            ...prev,
            pageGeozone: false,
            pageGeozoneObjects: false,
            pageGeozoneCreate: true
         }));
         props.setDrawingFigure(prev => ({
            ...prev,
            figure: Polyline,
         }));
      },
      createPolygonGeozone() {
         props.setMarkers([]);
         props.setWayPoints([]);
         props.setIdxWayPoints(null);
         props.setIdxInfo(null);
         props.setGeozoneObject({});
         props.setGeozoneObjects([]);
         props.setMapPage(prev => ({
            ...prev,
            pageGeozone: false,
            pageGeozoneObjects: false,
            pageGeozoneCreate: true
         }));
         props.setDrawingFigure(prev => ({
            ...prev,
            figure: Polygon,
         }));
      },
      destroyBuilding() {
         props.setMapPage(prev => ({
            ...prev,
            pageGeozoneCreate: false
         }));
         props.setDrawingFigure(_ => ({
            figure: null,
         }));
      }*/
   }

   return (
      <div className={ classes.root }>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.markerHandler(56.249142, 50.913278, 'B173CH 716') }
            >
               Установить маркер 1
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.markerHandler(55.871768, 50.371617, 'B280CH 716') }
            >
               Установить маркер 2
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.markerHandler(56.941435, 49.087209, 'B511CH 716') }
            >
               Установить маркер 3
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.markerHandler(56.871589, 60.665767, 'B173CH 716', false) }
            >
               Установить с сохранением маркер 4
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.markerHandler(55.446793, 65.329814, 'B280CH 716', false) }
            >
               Установить с сохранением маркер 5
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.markerHandler(58.57096, 49.363564, 'B511CH 716', false) }
            >
               Установить с сохранением маркер 6
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.markerHandler() }
            >
               Удалить все маркеры
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
               Построить прямую Челны - Казань - Москва
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
               Построить прямую Челны - Казань - Москва - Питер
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.polylineHandler(true, [
                  [ 52.408468, 55.730915 ],
                  [ 51.809728, 55.619533 ]
               ]) }
            >
               Добавить прямую Челны - Нижнекамск
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.polylineHandler(true, [
                  [ 52.408468, 55.730915 ],
                  [ 56.017821, 54.77546 ]
               ]) }
            >
               Добавить прямую Челны - Уфа
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.polylineHandler() }
            >
               Удалить все линии
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.circleHandler(true, {
                  radius: 4000,
                  coordinates: [ 48.74687907736965, 55.751014778026374 ]
               }) }
            >
               Построить круг вокруг Иннополиса
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.circleHandler(false, {
                  radius: 10000,
                  coordinates: [ 49.123276023979244, 55.800209574895604 ]
               }) }
            >
               Добавить круг вокруг Казани
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.circleHandler() }
            >
               Удалить круги
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
               Построить полигон вокруг Челнов
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
               Добавить полигон вокруг Челнов
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.polygonHandler() }
            >
               Удалить полигоны
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.rectangleHandler(true, {
                  northEast: [ 49.72327037361487, 58.62484785229232 ],
                  southWest: [ 49.545216597735056, 58.59501495969932 ],
               }) }
            >
               Построить прямоугольник в Кирове
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.rectangleHandler(false, {
                  northEast: [ 49.684868112828916, 58.56445449110284 ],
                  southWest: [ 49.68520145243108, 58.56587009741261 ],
               }) }
            >
               Добавить прямоугольник на улице Ленина
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.rectangleHandler() }
            >
               Удалить прямоугольники
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.clusterHandler() }
            >
               Удалить маркеры в кластере
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.managerHandler(true, allFigures.Circle) }
            >
               Создать круг
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.managerHandler(true, allFigures.Polyline) }
            >
               Создать полилайн
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.managerHandler(true, allFigures.Polygon) }
            >
               Создать полигон
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.resetAlLFigures() }
            >
               Удалить все элементы
            </button>
         </div>
         <div className={ classes.buttonWrapper }>
            <button
               onClick={ () => handlers.managerHandler(false) }
            >
               Отменить создание фигуры
            </button>
         </div>
         {/*<Info />*/ }
      </div>
   )
}