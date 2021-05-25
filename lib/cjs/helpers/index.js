"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destructBoundTuple = exports.createBoundTuple = void 0;
function createBoundTuple(bound) {
    var _a, _b;
    return [
        (_b = (_a = bound.lon) !== null && _a !== void 0 ? _a : bound.lng) !== null && _b !== void 0 ? _b : 0,
        bound.lat
    ];
}
exports.createBoundTuple = createBoundTuple;
function destructBoundTuple(tupleBound, lngMode) {
    if (lngMode === void 0) { lngMode = false; }
    if (lngMode) {
        return { lat: tupleBound[1], lng: tupleBound[0] };
    }
    return { lat: tupleBound[1], lon: tupleBound[0] };
}
exports.destructBoundTuple = destructBoundTuple;
