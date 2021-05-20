import { DynamicObjectEventTable as DGDynamicObjectEventTable } from '@2gis/mapgl/types';
export declare type RectangleHandlers = {
    [P in keyof DGDynamicObjectEventTable]: (e: DGDynamicObjectEventTable[P]) => any | void;
};
export interface RectanglePoints {
    southWest: number[];
    northEast: number[];
}
interface RectangleOptions extends RectanglePoints {
    zIndex?: number;
    minZoom?: number;
    maxZoom?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    interactive?: boolean;
    handlers?: RectangleHandlers;
}
export declare function Rectangle(props: RectangleOptions): null;
export default Rectangle;
