export interface Bound {
    lat: number;
    lon?: number;
    lng?: number;
}
export declare function createBoundTuple(bound: Bound): [number, number];
export declare function destructBoundTuple(tupleBound: [number, number] | number[], lngMode?: boolean): Bound;
