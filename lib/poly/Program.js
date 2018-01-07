"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Program = function () {
    function Program(vertShader, fragShader) {
        _classCallCheck(this, Program);

        var gl = POLY.gl;
        this.gl = gl;

        var program = gl.createProgram();
        this.program = program;

        var vert = this._createShader(vertShader, true);
        var frag = this._createShader(fragShader, false);

        this._attachShaders(vert, frag);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw "Couldn't initialise program";
        }

        gl.useProgram(program);

        program.vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.vertexPositionAttribute);

        program.pMatrixUniform = gl.getUniformLocation(program, "uPMatrix");
        program.mvMatrixUniform = gl.getUniformLocation(program, "uMVMatrix");
    }

    _createClass(Program, [{
        key: "_attachShaders",
        value: function _attachShaders(vert, frag) {
            this.gl.attachShader(this.program, vert);
            this.gl.attachShader(this.program, frag);
        }
    }, {
        key: "_createShader",
        value: function _createShader(src, isVertex) {
            var gl = this.gl;
            var shader = void 0;
            if (isVertex) {
                shader = gl.createShader(gl.VERTEX_SHADER);
            } else {
                shader = gl.createShader(gl.FRAGMENT_SHADER);
            }

            this.gl.shaderSource(shader, src);
            this.gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw "Couldn't initialise shader, ", gl.getShaderInfoLog(shader);
                return null;
            }

            return shader;
        }
    }]);

    return Program;
}();

exports.default = Program;
module.exports = exports['default'];
//# sourceMappingURL=Program.js.map