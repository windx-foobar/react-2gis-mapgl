import React from 'react';
import { Clusterer } from '@2gis/mapgl-clusterer';
import { useDGisMap } from '../contexts_hooks';
export function Cluster(props) {
    var map = useDGisMap();
    React.useEffect(function () {
        var _a;
        var clusterer;
        if (map && props.markers.length) {
            clusterer = new Clusterer(map, {
                radius: props.radius,
                clusterStyle: (_a = props.clusterStyle) !== null && _a !== void 0 ? _a : {},
            });
            clusterer.load(props.markers);
            if (props.onCreate)
                props.onCreate(clusterer);
        }
        return function () {
            if (clusterer) {
                clusterer.destroy();
                if (props.onDestroy)
                    props.onDestroy(clusterer);
            }
        };
    }, [map, props.markers, props.radius]);
    return null;
}
export default Cluster;
