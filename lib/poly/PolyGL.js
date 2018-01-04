"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PolyGL = function () {
    function PolyGL() {
        _classCallCheck(this, PolyGL);

        this._gl = null;
    }

    _createClass(PolyGL, [{
        key: "reset",
        value: function reset(canvas) {
            this._canvas = canvas;

            var gl = this._canvas.getContext("webgl");
            this._gl = gl;

            if (!this._gl) {
                console.warn("Application doesn't support webgl");
            }
        }
    }, {
        key: "resize",
        value: function resize() {
            var canvas = _this.canvas;
            var displayWidth = this.canvas.clientWidth;
            var displayHeight = this.canvas.clientHeight;

            if (this.canvas.width != displayWidth || this.canvas.height != displayHeight) {
                this.canvas.width = displayWidth;
                this.canvas.height = displayHeight;
            }

            this._gl.viewport(0, 0, canvas.width, canvas.height);
        }
    }]);

    return PolyGL;
}();

exports.default = new PolyGL();
module.exports = exports['default'];
//# sourceMappingURL=PolyGL.js.map