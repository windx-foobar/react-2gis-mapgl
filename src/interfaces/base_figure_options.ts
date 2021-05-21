export interface BaseFigureOptions<T> {
   throwDestroy?: (figure: T | null | undefined) => any;
   throwCreate?: (figure: T | null | undefined) => any;
}