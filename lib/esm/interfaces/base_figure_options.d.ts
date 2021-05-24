export interface BaseFigureOptions<T> {
    onDestroy?: (figure: T | null | undefined) => any;
    onCreate?: (figure: T | null | undefined) => any;
}
