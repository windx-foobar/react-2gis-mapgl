import React from 'react';
import { load } from '@2gis/mapgl';
import { useDGisMap } from '../contexts_hooks';
export function Marker(props) {
    var map = useDGisMap();
    React.useEffect(function () {
        var marker;
        if (map) {
            load().then(function (mapgl) {
                var _a;
                var options = {
                    coordinates: props.coordinates,
                    zIndex: (_a = props.zIndex) !== null && _a !== void 0 ? _a : 102,
                };
                if (props.icon)
                    options.icon = props.icon;
                if (props.size)
                    options.size = props.size;
                marker = new mapgl.Marker(map, options);
                if (props.handlers) {
                    Object.keys(props.handlers).forEach(function (event) {
                        marker.on(event, props.handlers[event]);
                    });
                }
            });
        }
        return function () { return map && marker && marker.destroy(); };
    }, [map, props.coordinates]);
    return null;
}
export default Marker;
