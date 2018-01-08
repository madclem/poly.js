'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.control = exports.cameras = exports.CONST = exports.Texture = exports.utils = exports.GL = exports.Mesh = exports.Program = exports.init = undefined;

var _Program = require('./poly/Program');

var _Program2 = _interopRequireDefault(_Program);

var _Mesh = require('./poly/geometry/Mesh');

var _Mesh2 = _interopRequireDefault(_Mesh);

var _GLTool = require('./poly/GLTool');

var _GLTool2 = _interopRequireDefault(_GLTool);

var _Texture = require('./poly/Texture');

var _Texture2 = _interopRequireDefault(_Texture);

var _camera = require('./poly/camera');

var _camera2 = _interopRequireDefault(_camera);

var _control = require('./poly/control');

var _control2 = _interopRequireDefault(_control);

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
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        POLY.gl = gl;
    } catch (e) {}
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
};

exports.init = init;
exports.Program = _Program2.default;
exports.Mesh = _Mesh2.default;
exports.GL = _GLTool2.default;
exports.utils = utils;
exports.Texture = _Texture2.default;
exports.CONST = _const2.default;
exports.cameras = _camera2.default;
exports.control = _control2.default;


global.POLY = exports; // eslint-disable-line
//# sourceMappingURL=Poly.js.map