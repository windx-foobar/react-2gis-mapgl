/// <reference types="react" />
import { MarkerOptions } from './marker';
import { HtmlMarkerOptions } from './marker_html';
export interface MarkerWithTooltipHandlers {
    click(...args: any): any | void;
}
interface TooltipProps {
    tooltip: {
        text: string;
        minWidth?: string;
        maxWidth?: string;
        offsetTop?: string;
        offsetLeft?: string;
        showTip?: boolean;
        padding?: string;
        cursor?: string;
        throwCreate?: HtmlMarkerOptions['throwCreate'];
        throwDestroy?: HtmlMarkerOptions['throwDestroy'];
    };
}
interface MarkerWithTooltipOptions {
    tooltipHandlers?: MarkerWithTooltipHandlers;
}
declare type MarkerWithTooltipProps = MarkerOptions & MarkerWithTooltipOptions & TooltipProps;
export declare function MarkerWithTooltip(props: MarkerWithTooltipProps): JSX.Element;
export default MarkerWithTooltip;
