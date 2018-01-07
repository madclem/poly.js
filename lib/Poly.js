'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.utils = exports.GL = exports.Mesh = exports.Program = exports.init = undefined;

var _Program = require('./poly/Program');

var _Program2 = _interopRequireDefault(_Program);

var _Mesh = require('./poly/geometry/Mesh');

var _Mesh2 = _interopRequireDefault(_Mesh);

var _GLTool = require('./poly/GLTool');

var _GLTool2 = _interopRequireDefault(_GLTool);

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


global.POLY = exports; // eslint-disable-line
//# sourceMappingURL=Poly.js.map