import { ClustererOptions, InputMarker, ClusterStyle } from '@2gis/mapgl-clusterer';
interface ClusterOptions extends ClustererOptions {
    radius: number;
    markers: InputMarker[];
    clusterStyle?: ClusterStyle;
}
export declare function Cluster(props: ClusterOptions): null;
export default Cluster;
