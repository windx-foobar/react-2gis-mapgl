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

export function destructBoundTuple(tupleBound: [ number, number ] | number[], lngMode: boolean = false): Bound {
   if (lngMode) {
      return { lat: tupleBound[1], lng: tupleBound[0] }
   }

   return { lat: tupleBound[1], lon: tupleBound[0] }
}