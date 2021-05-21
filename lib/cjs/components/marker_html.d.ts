import { HtmlMarkerOptions as DGHtmlMarkerOptions, HtmlMarker as DGHtmlMarker } from '@2gis/mapgl/types';
export declare type HtmlMarkerHandlers = {
    [P in keyof HTMLElementEventMap]?: (e: HTMLElementEventMap[P]) => any | void;
};
export interface HtmlMarkerOptions extends DGHtmlMarkerOptions {
    handlers?: HtmlMarkerHandlers;
    throwDestroy?: (marker: DGHtmlMarker | null | undefined) => any;
    throwCreate?: (marker: DGHtmlMarker | null | undefined) => any;
}
export declare function HtmlMarker(props: HtmlMarkerOptions): null;
export default HtmlMarker;
