/// <reference types="react" />
import { Property } from 'csstype';
import { MarkerOptions } from './marker';
import { HtmlMarkerOptions } from './marker_html';
export interface MarkerWithTooltipHandlers {
    click(...args: any): any | void;
}
interface TooltipProps {
    tooltip: {
        text: string | null;
        minWidth?: Property.MinWidth;
        maxWidth?: Property.MaxWidth;
        offsetTop?: string;
        offsetLeft?: string;
        showTip?: boolean;
        padding?: Property.Padding;
        cursor?: Property.Cursor;
        onCreate?: HtmlMarkerOptions['onCreate'];
        onDestroy?: HtmlMarkerOptions['onDestroy'];
        textTransform?: Property.TextTransform;
        textAlign?: Property.TextAlign;
        fontWeight?: Property.FontWeight;
        fontSize?: Property.FontSize;
    };
}
interface MarkerWithTooltipOptions {
    tooltipHandlers?: MarkerWithTooltipHandlers;
}
declare type MarkerWithTooltipProps = MarkerOptions & MarkerWithTooltipOptions & TooltipProps;
export declare function MarkerWithTooltip(props: MarkerWithTooltipProps): JSX.Element;
export default MarkerWithTooltip;
