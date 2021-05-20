import React from 'react';
import {
   ItisDGisContainer,
   MapHandlers,
   Marker,
   Polyline,
   Circle,
   Polygon,
   Rectangle,
   Cluster,
   DrawManager,
   allFigures
} from 'itis-dgis';
import { Bar } from './components/Debug/Bar';

// Mocks
import {
   markers as _markers,
   map as _map,
   polylines as _polylines,
   circles as _circles,
   polygons as _polygons,
   rectangles as _rectangles,
   clusterMarkers as _clusterMarkers
} from './constants/mock';

function App(): JSX.Element {
   const [ markers, setMarkers ] = React.useState(_markers);
   const [ clusterMarkers, setClusterMarkers ] = React.useState(_clusterMarkers);
   const [ polylines, setPolylines ] = React.useState(_polylines);
   const [ circles, setCircles ] = React.useState(_circles);
   const [ polygons, setPolygons ] = React.useState(_polygons);
   const [ rectangles, setRectangles ] = React.useState(_rectangles);
   const [ center, setCenter ] = React.useState(_map.center);
   const [ zoom, setZoom ] = React.useState(5);

   const [ drawManagerInit, setDrawManagerInit ] = React.useState(false);
   const [ drawManagerFigure, setDrawManagerFigure ] = React.useState(allFigures.Circle);
   const [ drawManagerData, setDrawManagerData ] = React.useState(null);

   const mapHandlers = React.useMemo(
      (): MapHandlers => ({
         click(e) {
            console.log(e.lngLat);
         }
      }),
      []
   );

   return (
      <React.Fragment>
         <Bar
            setMarkers={ setMarkers }
            setMapCenter={ setCenter }
            setZoom={ setZoom }
            setPolylines={ setPolylines }
            setCluster={ setClusterMarkers }
            setPolygon={ setPolygons }
            setRectangle={ setRectangles }
            setCircle={ setCircles }
            setDrawManager={ setDrawManagerInit }
            setDrawManagerFigure={ setDrawManagerFigure }
            setDrawManagerData={ setDrawManagerData }
         />
         <ItisDGisContainer
            apiKey="ec3385df-fb03-4a76-89cb-84eb0362488c"
            handlers={ mapHandlers }
            locale="ru"
            center={ center }
            zoom={ zoom }
         >
            { markers.map((marker) => (
               <Marker
                  coordinates={ marker }
                  key={ marker[0] + marker[1] }
               />
            )) }
            { polylines.map(polyline => (
               <Polyline
                  coordinates={ polyline }
                  key={ polyline.toString() }
               />
            )) }
            { circles.map(circle => (
               <Circle
                  coordinates={ circle.coordinates }
                  radius={ circle.radius }
                  key={ circle.coordinates[0] + circle.radius }
               />
            )) }
            { polygons.map(polygon => (
               <Polygon
                  coordinates={ polygon }
                  key={ polygon.toString() }
               />
            )) }
            { rectangles.map(rectangle => (
               <Rectangle
                  southWest={ rectangle.southWest }
                  northEast={ rectangle.northEast }
                  key={ rectangle.southWest[0] + rectangle.northEast[0] }
               />
            )) }
            <Cluster
               radius={ 80 }
               markers={
                  clusterMarkers.map((marker) => (
                     { coordinates: marker }
                  ))
               }
            />
            { drawManagerInit && (
               <DrawManager
                  figureType={ drawManagerFigure }
                  setData={ setDrawManagerData }
               />
            ) }
         </ItisDGisContainer>
      </React.Fragment>
   );
}

export default App;