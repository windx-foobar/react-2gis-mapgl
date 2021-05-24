import React from 'react';
interface DrawManagerProps {
    figureType: number;
    setData: React.Dispatch<React.SetStateAction<any>>;
    destructPolyline?: boolean;
    destructCircle?: boolean;
    destructPolygon?: boolean;
}
export declare function DrawManager(props: DrawManagerProps): JSX.Element;
export default DrawManager;
