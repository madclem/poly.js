"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Program = exports.init = undefined;

var _Program = require("./poly/Program");

var _Program2 = _interopRequireDefault(_Program);

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


global.POLY = exports; // eslint-disable-line
//# sourceMappingURL=Poly.js.map