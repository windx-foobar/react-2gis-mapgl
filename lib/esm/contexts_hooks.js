import React from 'react';
var ItisDGisContext = React.createContext([
    undefined,
    function (map) { return map; }
]);
export var ItisDGisProvider = ItisDGisContext.Provider;
export function useDGisContext() {
    var context = React.useContext(ItisDGisContext);
    if (context == null) {
        throw new Error('No context provided: useLeafletContext() can only be used in a descendant of <ItisNavitel>');
    }
    return context;
}
export function useDGisMap() {
    //@ts-ignore
    return useDGisContext()[0];
}
