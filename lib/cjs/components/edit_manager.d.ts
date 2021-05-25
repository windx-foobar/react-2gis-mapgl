import React from 'react';
import { Bound } from '../helpers';
interface EditManagerProps {
    figureData: {
        points?: Bound[];
        radius?: number;
        lat?: number;
        lon?: number;
        lng?: number;
        southWest: Bound;
        northEast: Bound;
    };
    figureType: number;
    setData: React.Dispatch<React.SetStateAction<any>>;
    destructPolyline?: boolean;
    destructCircle?: boolean;
    destructPolygon?: boolean;
    onUpdate?: (message: string) => any;
}
export declare function EditManager(props: EditManagerProps): JSX.Element;
export default EditManager;
