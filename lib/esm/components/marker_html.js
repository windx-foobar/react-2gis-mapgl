import React from 'react';
import { load } from '@2gis/mapgl';
import { useDGisMap } from '../contexts_hooks';
export function HtmlMarker(props) {
    var map = useDGisMap();
    React.useEffect(function () {
        var marker;
        if (map) {
            load().then(function (mapgl) {
                var _a;
                marker = new mapgl.HtmlMarker(map, {
                    html: props.html,
                    coordinates: props.coordinates,
                    zIndex: (_a = props.zIndex) !== null && _a !== void 0 ? _a : 102
                });
                var html = marker.getContent();
                if (props.handlers) {
                    Object.keys(props.handlers).forEach(function (event) {
                        html.addEventListener(event, props.handlers[event]);
                    });
                }
            });
        }
        return function () { return map && marker && marker.destroy(); };
    }, [map, props.coordinates]);
    return null;
}
export default HtmlMarker;
