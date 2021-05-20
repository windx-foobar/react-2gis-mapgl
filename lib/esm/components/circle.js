import React from 'react';
import { load } from '@2gis/mapgl';
import { useDGisMap } from '../contexts_hooks';
import { defaults } from '../constants/defaults';
export function Circle(props) {
    var map = useDGisMap();
    React.useEffect(function () {
        var circle;
        if (map) {
            load().then(function (mapgl) {
                var _a, _b, _c, _d;
                circle = new mapgl.Circle(map, {
                    coordinates: props.coordinates,
                    radius: props.radius,
                    strokeColor: (_a = props.strokeColor) !== null && _a !== void 0 ? _a : defaults.circle.strokeColor,
                    strokeWidth: (_b = props.strokeWidth) !== null && _b !== void 0 ? _b : defaults.circle.strokeWidth,
                    color: (_c = props.color) !== null && _c !== void 0 ? _c : defaults.circle.color,
                    zIndex: (_d = props.zIndex) !== null && _d !== void 0 ? _d : 101
                });
                if (props.handlers) {
                    Object.keys(props.handlers).forEach(function (event) {
                        circle.on(event, props.handlers[event]);
                    });
                }
            });
        }
        return function () { return map && circle && circle.destroy(); };
    }, [map, props.coordinates, props.handlers, props.radius]);
    return null;
}
export default Circle;
