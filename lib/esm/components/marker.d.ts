import { DynamicObjectEventTable as DGDynamicObjectEventTable, MarkerOptions as DGMarkerOptions } from '@2gis/mapgl/types';
export declare type MarkerHandlers = {
    [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
};
interface MarkerOptions extends DGMarkerOptions {
    handlers?: MarkerHandlers;
}
export declare function Marker(props: MarkerOptions): null;
export default Marker;
