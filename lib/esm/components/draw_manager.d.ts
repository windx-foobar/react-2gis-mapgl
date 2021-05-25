import React from 'react';
import { CirclePoints } from './circle';
export interface DrawManagerProps {
    figureType: number;
    setData: React.Dispatch<React.SetStateAction<any>>;
    destructPolyline?: boolean;
    destructCircle?: boolean;
    destructPolygon?: boolean;
    onCreate?: (message: string) => any;
}
export declare const initialCircle: CirclePoints;
export declare function HtmlCircleMarkerHtml(): JSX.Element;
export declare function HtmlMarkerHtml(props: {
    last?: boolean;
}): JSX.Element;
export declare function DrawManager(props: DrawManagerProps): JSX.Element;
export default DrawManager;
