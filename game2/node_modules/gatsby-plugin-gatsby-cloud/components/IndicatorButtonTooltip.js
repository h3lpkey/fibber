"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

const IndicatorButtonTooltip = ({
  onClick,
  tooltipLinkImage,
  tooltipLink,
  overrideShowTooltip,
  showTooltip,
  tooltipText,
  tooltipIcon,
  toolTipOffset,
  testId
}) => /*#__PURE__*/_react.default.createElement("div", {
  onClick: onClick // toolTipOffset needs to be 40 * button possition (0 indexed) + 12
  // This will align the tooltip with its correct button
  // The first button is (40 * 0) + 12
  // The second button is (40 * 1) + 12 ...
  ,
  style: {
    top: `${(toolTipOffset || 0) + 12}px`
  },
  "data-gatsby-preview-indicator": "tooltip",
  "data-gatsby-preview-indicator-visible": `${overrideShowTooltip || showTooltip}`,
  "data-testid": `${testId}-tooltip`
}, tooltipIcon, tooltipText, tooltipLink && /*#__PURE__*/_react.default.createElement("p", {
  "data-gatsby-preview-indicator": "tooltip-link"
}, tooltipLink), tooltipLinkImage && /*#__PURE__*/_react.default.createElement("div", {
  "data-gatsby-preview-indicator": "tooltip-svg"
}, tooltipLinkImage));

var _default = IndicatorButtonTooltip;
exports.default = _default;