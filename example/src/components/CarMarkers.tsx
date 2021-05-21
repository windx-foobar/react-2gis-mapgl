import React from 'react';
import { Marker } from 'itis-dgis';
import { CarMarkerPointWithName } from '../App';

interface CarMarkersProps {
   cars: CarMarkerPointWithName[];
}

export function CarMarkers(props: CarMarkersProps): JSX.Element | null {
   if (props.cars.length) {
      return (
         <React.Fragment>
            { props.cars.map((car) => (
               <Marker
                  coordinates={ [ car.lon ?? car.lng ?? 0, car.lat ] }
                  label={ {
                     text: car.name,
                     zIndex: 103,
                  } }
                  zIndex={ 102 }
               />
            )) }
         </React.Fragment>
      );
   }

   return null;
}

export default CarMarkers;