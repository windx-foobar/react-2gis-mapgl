import { DynamicObjectEventTable as DGDynamicObjectEventTable, Polygon as DGPolygon } from '@2gis/mapgl/types';
import { BaseFigureOptions } from '../interfaces/base_figure_options';
export declare type RectangleHandlers = {
    [P in keyof DGDynamicObjectEventTable]: (e: DGDynamicObjectEventTable[P]) => any | void;
};
export interface RectanglePoints {
    southWest: number[];
    northEast: number[];
}
declare type BaseRectangleOptions = BaseFigureOptions<DGPolygon> & RectanglePoints;
interface RectangleOptions extends BaseRectangleOptions {
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
