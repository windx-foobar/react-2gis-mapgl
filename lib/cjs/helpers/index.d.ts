export interface Bound {
    lat: number;
    lon?: number;
    lng?: number;
}
export declare function createBoundTuple(bound: Bound): [number, number];
