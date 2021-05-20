import { MapEventTable as DGMapEventTable } from '@2gis/mapgl/types';
export declare type MapHandlers = {
    [P in keyof DGMapEventTable]?: (e: DGMapEventTable[P]) => any | void;
};
interface EventHandlersProps {
    handlers: MapHandlers;
}
export declare function EventHandlers(props: EventHandlersProps): null;
export default EventHandlers;
