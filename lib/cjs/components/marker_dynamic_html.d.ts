import { HtmlMarkerOptions as DGHtmlMarkerOptions, HtmlMarker as DGHtmlMarker } from '@2gis/mapgl/types';
import { BaseFigureOptions } from '../interfaces/base_figure_options';
declare type _HtmlMarkerHandlers = {
    [P in keyof HTMLElementEventMap]?: (e: HTMLElementEventMap[P]) => any | void;
};
export declare type HtmlMarkerHandlers = _HtmlMarkerHandlers & {
    close?: () => void;
};
declare type BaseHtmlMarkerOptions = BaseFigureOptions<DGHtmlMarker> & DGHtmlMarkerOptions;
export interface HtmlMarkerOptions extends BaseHtmlMarkerOptions {
    handlers?: HtmlMarkerHandlers;
}
export declare function HtmlDynamicMarker(props: HtmlMarkerOptions): null;
export default HtmlDynamicMarker;
