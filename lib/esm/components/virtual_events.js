import React from 'react';
import { useDGisMap } from '../index';
export function VirtualEvents(props) {
    var map = useDGisMap();
    React.useEffect(function () {
        if (map)
            map.setCenter(props.center);
    }, [map, props.center]);
    React.useEffect(function () {
        if (map)
            map.setZoom(props.zoom);
    }, [map, props.zoom]);
    React.useEffect(function () {
        if (map) {
            window.addEventListener('resize', function () {
                map.invalidateSize();
            });
        }
    }, [map]);
    return null;
}
export default VirtualEvents;
