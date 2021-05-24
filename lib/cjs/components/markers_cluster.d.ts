import { Clusterer, ClustererOptions, InputMarker, ClusterStyle } from '@2gis/mapgl-clusterer';
import { BaseFigureOptions } from '../interfaces/base_figure_options';
declare type BaseClustererOptions = ClustererOptions & BaseFigureOptions<Clusterer>;
interface ClusterOptions extends BaseClustererOptions {
    radius: number;
    markers: InputMarker[];
    clusterStyle?: ClusterStyle;
}
export declare function Cluster(props: ClusterOptions): null;
export default Cluster;
