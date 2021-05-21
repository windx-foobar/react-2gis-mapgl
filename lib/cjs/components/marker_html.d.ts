import { HtmlMarkerOptions as DGHtmlMarkerOptions, HtmlMarker as DGHtmlMarker } from '@2gis/mapgl/types';
import { BaseFigureOptions } from '../interfaces/base_figure_options';
export declare type HtmlMarkerHandlers = {
    [P in keyof HTMLElementEventMap]?: (e: HTMLElementEventMap[P]) => any | void;
};
declare type BaseHtmlMarkerOptions = BaseFigureOptions<DGHtmlMarker> & DGHtmlMarkerOptions;
export interface HtmlMarkerOptions extends BaseHtmlMarkerOptions {
    handlers?: HtmlMarkerHandlers;
}
export declare function HtmlMarker(props: HtmlMarkerOptions): null;
export default HtmlMarker;
