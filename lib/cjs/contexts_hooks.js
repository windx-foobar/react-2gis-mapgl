"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDGisMap = exports.useDGisContext = exports.ItisDGisProvider = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var ItisDGisContext = react_1.default.createContext([
    undefined,
    function (map) { return map; }
]);
exports.ItisDGisProvider = ItisDGisContext.Provider;
function useDGisContext() {
    var context = react_1.default.useContext(ItisDGisContext);
    if (context == null) {
        throw new Error('No context provided: useLeafletContext() can only be used in a descendant of <ItisNavitel>');
    }
    return context;
}
exports.useDGisContext = useDGisContext;
function useDGisMap() {
    //@ts-ignore
    return useDGisContext()[0];
}
exports.useDGisMap = useDGisMap;
