'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FrameBuffer = exports.geometry = exports.State = exports.control = exports.cameras = exports.CONST = exports.DataTexture = exports.Texture = exports.utils = exports.GL = exports.Program = exports.init = undefined;

var _Program = require('./poly/Program');

var _Program2 = _interopRequireDefault(_Program);

var _geometry = require('./poly/geometry');

var _geometry2 = _interopRequireDefault(_geometry);

var _FrameBuffer = require('./poly/FrameBuffer');

var _FrameBuffer2 = _interopRequireDefault(_FrameBuffer);

var _GLTool = require('./poly/GLTool');

var _GLTool2 = _interopRequireDefault(_GLTool);

var _Texture = require('./poly/texture/Texture');

var _Texture2 = _interopRequireDefault(_Texture);

var _DataTexture = require('./poly/texture/DataTexture');

var _DataTexture2 = _interopRequireDefault(_DataTexture);

var _camera = require('./poly/camera');

var _camera2 = _interopRequireDefault(_camera);

var _control = require('./poly/control');

var _control2 = _interopRequireDefault(_control);

var _State = require('./poly/State');

var _State2 = _interopRequireDefault(_State);

var _const = require('./poly/const');

var _const2 = _interopRequireDefault(_const);

var _utils = require('./poly/utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init(canvas) {
    var gl = void 0;
    try {
        gl = canvas.getContext("experimental-webgl");

        POLY.gl = gl;
        POLY.GL.init(gl);
    } catch (e) {}

    if (!gl) {
        console.warn("Could not initialise WebGL");
    }
};

exports.init = init;
exports.Program = _Program2.default;
exports.GL = _GLTool2.default;
exports.utils = utils;
exports.Texture = _Texture2.default;
exports.DataTexture = _DataTexture2.default;
exports.CONST = _const2.default;
exports.cameras = _camera2.default;
exports.control = _control2.default;
exports.State = _State2.default;
exports.geometry = _geometry2.default;
exports.FrameBuffer = _FrameBuffer2.default;


global.POLY = exports; // eslint-disable-line
//# sourceMappingURL=Poly.js.map