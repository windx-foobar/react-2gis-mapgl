import { DynamicObjectEventTable as DGDynamicObjectEventTable, CircleOptions as DGCircleOptions, Circle as DGCircle } from '@2gis/mapgl/types';
import { BaseFigureOptions } from '../interfaces/base_figure_options';
export declare type CircleHandlers = {
    [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
};
export declare type CirclePoints = {
    radius: DGCircleOptions['radius'];
    coordinates: DGCircleOptions['coordinates'];
};
declare type BaseCircleOptions = DGCircleOptions & BaseFigureOptions<DGCircle>;
interface CircleOptions extends BaseCircleOptions {
    handlers?: CircleHandlers;
}
export declare function Circle(props: CircleOptions): null;
export default Circle;
