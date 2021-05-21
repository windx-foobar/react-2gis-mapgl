import { DynamicObjectEventTable as DGDynamicObjectEventTable, PolylineOptions as DGPolylineOptions, Polyline as DGPolyline } from '@2gis/mapgl/types';
import { BaseFigureOptions } from '../interfaces/base_figure_options';
export declare type PolylineHandlers = {
    [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
};
declare type BasePolylineOptions = BaseFigureOptions<DGPolyline> & DGPolylineOptions;
interface PolylineOptions extends BasePolylineOptions {
    handlers?: PolylineHandlers;
}
export declare function Polyline(props: PolylineOptions): null;
export default Polyline;
