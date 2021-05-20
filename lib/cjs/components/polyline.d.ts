import { DynamicObjectEventTable as DGDynamicObjectEventTable, PolylineOptions as DGPolylineOptions } from '@2gis/mapgl/types';
export declare type PolylineHandlers = {
    [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
};
interface MarkerOptions extends DGPolylineOptions {
    handlers?: PolylineHandlers;
}
export declare function Polyline(props: MarkerOptions): null;
export default Polyline;
