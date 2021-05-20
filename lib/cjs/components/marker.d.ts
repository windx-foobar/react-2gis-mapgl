import { DynamicObjectEventTable as DGDynamicObjectEventTable, MarkerOptions as DGMarkerOptions, Marker as DGMarker } from '@2gis/mapgl/types';
export declare type MarkerHandlers = {
    [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
};
interface MarkerOptions extends DGMarkerOptions {
    handlers?: MarkerHandlers;
    throwDestroy?: (marker: DGMarker | null | undefined) => any;
    throwCreate?: (marker: DGMarker | null | undefined) => any;
}
export declare function Marker(props: MarkerOptions): null;
export default Marker;
