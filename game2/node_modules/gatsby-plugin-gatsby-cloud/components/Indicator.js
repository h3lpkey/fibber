"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = Indicator;

var _react = _interopRequireWildcard(require("react"));

var _getBuildInfo = _interopRequireDefault(require("../utils/getBuildInfo"));

var _trackEvent = _interopRequireDefault(require("../utils/trackEvent"));

var _Style = _interopRequireDefault(require("./Style"));

var _GatsbyIndicatorButton = _interopRequireDefault(require("./GatsbyIndicatorButton"));

var _LinkIndicatorButton = _interopRequireDefault(require("./LinkIndicatorButton"));

var _InfoIndicatorButton = _interopRequireDefault(require("./InfoIndicatorButton"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const POLLING_INTERVAL = process.env.GATSBY_PREVIEW_POLL_INTERVAL || 3000;

function Indicator({
  children
}) {
  const [buildInfo, setBuildInfo] = (0, _react.useState)();
  const timeoutRef = (0, _react.useRef)();
  const shouldPoll = (0, _react.useRef)(false);
  let trackedInitialLoad;
  let buildId;
  const pollData = (0, _react.useCallback)(async function pollData() {
    const prettyUrlRegex = /^preview-/;
    const host = window.location.hostname; // currentBuild is the most recent build that is not QUEUED.
    // latestBuild is the most recent build that finished running (ONLY status ERROR or SUCCESS)

    const isOnPrettyUrl = prettyUrlRegex.test(host);
    const {
      siteInfo,
      currentBuild,
      latestBuild
    } = await (0, _getBuildInfo.default)();

    if (!buildId) {
      if (isOnPrettyUrl) {
        buildId = latestBuild === null || latestBuild === void 0 ? void 0 : latestBuild.id;
      } else {
        // Match UUID from preview build URL https://build-af44185e-b8e5-11eb-8529-0242ac130003.gtsb.io
        const buildIdMatch = host.match(/build-(.*?(?=\.))/);
        buildId = buildIdMatch && buildIdMatch[1];
      }
    }

    const defaultBuildInfo = {
      createdAt: currentBuild === null || currentBuild === void 0 ? void 0 : currentBuild.createdAt,
      orgId: siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.orgId,
      siteId: siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.siteId,
      buildId,
      isOnPrettyUrl,
      sitePrefix: siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.sitePrefix
    };

    if (!trackedInitialLoad) {
      (0, _trackEvent.default)({
        eventType: `PREVIEW_INDICATOR_LOADED`,
        orgId: defaultBuildInfo.orgId,
        siteId: defaultBuildInfo.siteId,
        buildId
      });
      trackedInitialLoad = true;
    }

    if ((currentBuild === null || currentBuild === void 0 ? void 0 : currentBuild.buildStatus) === `BUILDING`) {
      setBuildInfo({
        status: `BUILDING`,
        ...defaultBuildInfo
      });
    } else if ((currentBuild === null || currentBuild === void 0 ? void 0 : currentBuild.buildStatus) === `ERROR`) {
      setBuildInfo({
        status: `ERROR`,
        errorBuildId: currentBuild === null || currentBuild === void 0 ? void 0 : currentBuild.id,
        ...defaultBuildInfo
      });
    } else if (buildId === (currentBuild === null || currentBuild === void 0 ? void 0 : currentBuild.id)) {
      setBuildInfo({
        status: `UPTODATE`,
        ...defaultBuildInfo
      });
    } else if (buildId !== (latestBuild === null || latestBuild === void 0 ? void 0 : latestBuild.id) && (latestBuild === null || latestBuild === void 0 ? void 0 : latestBuild.buildStatus) === `SUCCESS`) {
      setBuildInfo({
        status: `SUCCESS`,
        ...defaultBuildInfo
      });
    }

    if (shouldPoll.current) {
      setTimeout(pollData, POLLING_INTERVAL);
    }
  }, []);
  (0, _react.useEffect)(() => {
    shouldPoll.current = true;
    pollData();
    return function cleanup() {
      shouldPoll.current = false;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Style.default, null), /*#__PURE__*/_react.default.createElement("div", {
    "data-testid": "preview-status-indicator",
    "data-gatsby-preview-indicator": "root",
    "aria-live": "assertive"
  }, /*#__PURE__*/_react.default.createElement(_GatsbyIndicatorButton.default, buildInfo), /*#__PURE__*/_react.default.createElement(_LinkIndicatorButton.default, buildInfo), /*#__PURE__*/_react.default.createElement(_InfoIndicatorButton.default, buildInfo)), children);
}