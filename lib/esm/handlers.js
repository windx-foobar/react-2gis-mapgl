import React from 'react';
import { useDGisMap } from './contexts_hooks';
export function EventHandlers(props) {
    var map = useDGisMap();
    React.useEffect(function () {
        if (map) {
            Object.keys(props.handlers).forEach(function (event) {
                map.on(event, props.handlers[event]);
            });
        }
        return function () {
            if (map) {
                Object.keys(props.handlers).forEach(function (event) {
                    map.off(event, props.handlers[event]);
                });
            }
        };
    }, [map, props.handlers]);
    return null;
}
export default EventHandlers;
