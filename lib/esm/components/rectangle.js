import { __spreadArray } from "tslib";
import React from 'react';
import { load } from '@2gis/mapgl';
import { useDGisMap } from '../contexts_hooks';
import { defaults } from '../constants/defaults';
export function Rectangle(props) {
    var map = useDGisMap();
    React.useEffect(function () {
        var rectangle;
        var bound = [
            [props.northEast[0], props.northEast[1]],
            [props.southWest[0], props.northEast[1]],
            [props.southWest[0], props.southWest[1]],
            [props.northEast[0], props.southWest[1]]
        ];
        if (map) {
            load().then(function (mapgl) {
                var _a, _b, _c, _d;
                rectangle = new mapgl.Polygon(map, {
                    coordinates: [__spreadArray(__spreadArray([], bound), [bound[0]])],
                    strokeColor: (_a = props.strokeColor) !== null && _a !== void 0 ? _a : defaults.rectangle.strokeColor,
                    strokeWidth: (_b = props.strokeWidth) !== null && _b !== void 0 ? _b : defaults.rectangle.strokeWidth,
                    color: (_c = props.color) !== null && _c !== void 0 ? _c : defaults.rectangle.color,
                    zIndex: (_d = props.zIndex) !== null && _d !== void 0 ? _d : 101
                });
            });
        }
        return function () { return map && rectangle && rectangle.destroy(); };
    }, [map, props.northEast, props.southWest]);
    return null;
}
export default Rectangle;
