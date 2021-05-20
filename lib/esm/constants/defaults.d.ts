declare const defaults: {
    map: {
        zoom: number;
        center: number[];
        lang: string;
    };
    clusterer: {
        radius: number;
    };
    polyline: {
        width: number;
        color: string;
    };
    circle: {
        strokeWidth: number;
        strokeColor: string;
        color: string;
    };
    polygon: {
        strokeWidth: number;
        strokeColor: string;
        color: string;
    };
    rectangle: {
        strokeWidth: number;
        strokeColor: string;
        color: string;
    };
};
export default defaults;
export { defaults };
