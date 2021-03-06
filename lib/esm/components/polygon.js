import { __spreadArray } from "tslib";
import React from 'react';
import { load } from '@2gis/mapgl';
import { isEqual, last, first } from 'lodash';
import { useDGisMap } from '../contexts_hooks';
import { defaults } from '../constants/defaults';
export function Polygon(props) {
    var map = useDGisMap();
    React.useEffect(function () {
        var polygon, coordinates;
        coordinates = props.coordinates[0];
        if (!isEqual(first(props.coordinates[0]), last(props.coordinates[0]))) {
            coordinates = __spreadArray(__spreadArray([], coordinates), [first(coordinates)]);
        }
        if (map) {
            load().then(function (mapgl) {
                var _a, _b, _c, _d;
                polygon = new mapgl.Polygon(map, {
                    coordinates: [coordinates],
                    strokeColor: (_a = props.strokeColor) !== null && _a !== void 0 ? _a : defaults.polygon.strokeColor,
                    strokeWidth: (_b = props.strokeWidth) !== null && _b !== void 0 ? _b : defaults.polygon.strokeWidth,
                    color: (_c = props.color) !== null && _c !== void 0 ? _c : defaults.polygon.color,
                    zIndex: (_d = props.zIndex) !== null && _d !== void 0 ? _d : 101
                });
                if (props.handlers) {
                    Object.keys(props.handlers).forEach(function (event) {
                        polygon.on(event, props.handlers[event]);
                    });
                }
                if (props.onCreate)
                    props.onCreate(polygon);
            });
        }
        return function () {
            if (polygon) {
                if (props.onDestroy)
                    props.onDestroy(polygon);
                polygon.destroy();
            }
        };
    }, [map, props.coordinates[0].length]);
    return null;
}
export default Polygon;
