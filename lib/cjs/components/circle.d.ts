import { DynamicObjectEventTable as DGDynamicObjectEventTable, CircleOptions as DGCircleOptions } from '@2gis/mapgl/types';
export declare type CircleHandlers = {
    [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
};
export declare type CirclePoints = {
    radius: DGCircleOptions['radius'];
    coordinates: DGCircleOptions['coordinates'];
};
interface CircleOptions extends DGCircleOptions {
    handlers?: CircleHandlers;
}
export declare function Circle(props: CircleOptions): null;
export default Circle;
