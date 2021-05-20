import React from 'react';
import { Map as DGMap } from '@2gis/mapgl/types';

const ItisDGisContext = React.createContext([
   undefined,
   (map: any): any => map
]);
export const ItisDGisProvider = ItisDGisContext.Provider;

export function useDGisContext() {
   const context = React.useContext(ItisDGisContext);

   if (context == null) {
      throw new Error('No context provided: useLeafletContext() can only be used in a descendant of <ItisNavitel>');
   }

   return context;
}

export function useDGisMap(): DGMap {
   //@ts-ignore
   return useDGisContext()[0];
}