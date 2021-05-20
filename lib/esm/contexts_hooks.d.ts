import React from 'react';
import { Map as DGMap } from '@2gis/mapgl/types';
export declare const ItisDGisProvider: React.Provider<(((map: any) => any) | undefined)[]>;
export declare function useDGisContext(): (((map: any) => any) | undefined)[];
export declare function useDGisMap(): DGMap;
