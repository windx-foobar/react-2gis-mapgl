import { DynamicObjectEventTable as DGDynamicObjectEventTable, PolygonOptions as DGPolygonOptions, Polygon as DGPolygon } from '@2gis/mapgl/types';
import { BaseFigureOptions } from '../interfaces/base_figure_options';
export declare type PolygonHandlers = {
    [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
};
declare type BasePolygonOptions = BaseFigureOptions<DGPolygon> & DGPolygonOptions;
interface PolygonOptions extends BasePolygonOptions {
    handlers?: PolygonHandlers;
}
export declare function Polygon(props: PolygonOptions): null;
export default Polygon;
