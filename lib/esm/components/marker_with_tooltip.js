import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Marker } from './marker';
import { HtmlMarker } from './marker_html';
import useStyles from './marker_with_tooltip.style';
function Tooltip(props) {
    var classes = useStyles();
    return (React.createElement("div", { className: classes.root, style: {
            maxWidth: props.tooltip.maxWidth,
            minWidth: props.tooltip.minWidth,
            transform: "translate(" + props.tooltip.offsetLeft + ", " + props.tooltip.offsetTop + ")",
            cursor: props.tooltip.cursor,
            textTransform: props.tooltip.textTransform,
            textAlign: props.tooltip.textAlign,
            fontWeight: props.tooltip.fontWeight,
            fontSize: props.tooltip.fontSize,
        } },
        React.createElement("div", { className: classes.content, style: {
                padding: props.tooltip.padding
            } },
            React.createElement("span", null, props.tooltip.text)),
        props.tooltip.showTip && (React.createElement("div", { className: classes.tip }))));
}
export function MarkerWithTooltip(props) {
    var _a = React.useState(true), showTooltip = _a[0], setShowTooltip = _a[1];
    return (React.createElement(React.Fragment, null,
        React.createElement(Marker, { coordinates: props.coordinates, handlers: {
                click: function (e) { var _a; return (_a = props.tooltipHandlers) === null || _a === void 0 ? void 0 : _a.click(e, setShowTooltip); }
            }, throwCreate: props.throwCreate, throwDestroy: props.throwDestroy }),
        showTooltip && (React.createElement(HtmlMarker, { coordinates: props.coordinates, html: ReactDOMServer.renderToString(React.createElement(Tooltip, { tooltip: props.tooltip })), handlers: {
                click: function (e) { var _a; return (_a = props.tooltipHandlers) === null || _a === void 0 ? void 0 : _a.click(e, setShowTooltip); }
            } }))));
}
export default MarkerWithTooltip;
