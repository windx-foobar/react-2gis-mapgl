export interface Bound {
   lat: number,
   lon?: number,
   lng?: number
}

export function createBoundTuple(bound: Bound): [ number, number ] {
   return [
      bound.lon ?? bound.lng ?? 0,
      bound.lat
   ];
}