import { DynamicObjectEventTable as DGDynamicObjectEventTable, PolygonOptions as DGPolygonOptions } from '@2gis/mapgl/types';
export declare type PolygonHandlers = {
    [P in keyof DGDynamicObjectEventTable]?: (e: DGDynamicObjectEventTable[P]) => any | void;
};
interface PolygonOptions extends DGPolygonOptions {
    handlers?: PolygonHandlers;
}
export declare function Polygon(props: PolygonOptions): null;
export default Polygon;
