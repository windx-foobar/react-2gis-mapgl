import { DynamicObjectEventTable as DGDynamicObjectEventTable, MarkerOptions as DGMarkerOptions, Marker as DGMarker } from '@2gis/mapgl/types';
import { BaseFigureOptions } from '../interfaces/base_figure_options';
declare type BaseMarkerOptions = BaseFigureOptions<DGMarker> & DGMarkerOptions;
export declare type MarkerHandlers = {
    [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
};
export interface MarkerOptions extends BaseMarkerOptions {
    handlers?: MarkerHandlers;
}
export declare function Marker(props: MarkerOptions): null;
export default Marker;
