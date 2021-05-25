import React from 'react';
import { load } from '@2gis/mapgl';
import { useDGisMap } from '../contexts_hooks';
import { defaults } from '../constants/defaults';
export function Polyline(props) {
    var map = useDGisMap();
    React.useEffect(function () {
        var polyline;
        if (map) {
            load().then(function (mapgl) {
                var _a, _b, _c;
                polyline = new mapgl.Polyline(map, {
                    coordinates: props.coordinates,
                    width: (_a = props.width) !== null && _a !== void 0 ? _a : defaults.polyline.width,
                    color: (_b = props.color) !== null && _b !== void 0 ? _b : defaults.polyline.color,
                    zIndex: (_c = props.zIndex) !== null && _c !== void 0 ? _c : 101
                });
                if (props.handlers) {
                    Object.keys(props.handlers).forEach(function (event) {
                        polyline.on(event, props.handlers[event]);
                    });
                }
                if (props.onCreate)
                    props.onCreate(polyline);
            });
        }
        return function () {
            if (polyline) {
                if (props.onDestroy)
                    props.onDestroy(polyline);
                polyline.destroy();
            }
        };
    }, [map, props.coordinates.length]);
    return null;
}
export default Polyline;
