import { HtmlMarkerOptions as DGHtmlMarkerOptions } from '@2gis/mapgl/types';
export declare type HtmlMarkerHandlers = {
    [P in keyof HTMLElementEventMap]?: (e: HTMLElementEventMap[P]) => any | void;
};
interface HtmlMarkerOptions extends DGHtmlMarkerOptions {
    handlers?: HtmlMarkerHandlers;
}
export declare function HtmlMarker(props: HtmlMarkerOptions): null;
export default HtmlMarker;
