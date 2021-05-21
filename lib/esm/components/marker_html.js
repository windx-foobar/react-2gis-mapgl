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
                if (props.throwCreate)
                    props.throwCreate(marker);
            });
        }
        return function () {
            if (marker) {
                if (props.throwDestroy)
                    props.throwDestroy(marker);
                marker.destroy();
            }
        };
    }, [map, props.coordinates[0], props.coordinates[1]]);
    return null;
}
export default HtmlMarker;
