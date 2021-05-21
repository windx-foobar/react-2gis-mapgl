"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkerWithTooltip = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var server_1 = tslib_1.__importDefault(require("react-dom/server"));
var marker_1 = require("./marker");
var marker_html_1 = require("./marker_html");
var marker_with_tooltip_style_1 = tslib_1.__importDefault(require("./marker_with_tooltip.style"));
function Tooltip(props) {
    var classes = marker_with_tooltip_style_1.default();
    return (react_1.default.createElement("div", { className: classes.root, style: {
            maxWidth: props.tooltip.maxWidth,
            minWidth: props.tooltip.minWidth,
            transform: "translate(" + props.tooltip.offsetLeft + ", " + props.tooltip.offsetTop + ")",
            cursor: props.tooltip.cursor
        } },
        react_1.default.createElement("div", { className: classes.content, style: {
                padding: props.tooltip.padding
            } },
            react_1.default.createElement("span", null, props.tooltip.text)),
        props.tooltip.showTip && (react_1.default.createElement("div", { className: classes.tip }))));
}
function MarkerWithTooltip(props) {
    var _a = react_1.default.useState(true), showTooltip = _a[0], setShowTooltip = _a[1];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(marker_1.Marker, { coordinates: props.coordinates, handlers: {
                click: function (e) { var _a; return (_a = props.tooltipHandlers) === null || _a === void 0 ? void 0 : _a.click(e, setShowTooltip); }
            }, throwCreate: props.throwCreate, throwDestroy: props.throwDestroy }),
        showTooltip && (react_1.default.createElement(marker_html_1.HtmlMarker, { coordinates: props.coordinates, html: server_1.default.renderToString(react_1.default.createElement(Tooltip, { tooltip: props.tooltip })), handlers: {
                click: function (e) { var _a; return (_a = props.tooltipHandlers) === null || _a === void 0 ? void 0 : _a.click(e, setShowTooltip); }
            } }))));
}
exports.MarkerWithTooltip = MarkerWithTooltip;
exports.default = MarkerWithTooltip;
