"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataTexture = function () {
	function DataTexture(data) {
		_classCallCheck(this, DataTexture);

		this.gl = POLY.gl;
		var gl = this.gl;

		this._texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this._texture);

		// Fill the texture with a 1x1 blue pixel.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

		// fill texture with 3x2 pixels
		var level = 0;
		var internalFormat = gl.LUMINANCE;
		var width = 3;
		var height = 2;
		var border = 0;
		var format = gl.LUMINANCE;
		var type = gl.UNSIGNED_BYTE;
		gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, data);

		// set the filtering so we don't need mips and it's not filtered
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	}

	_createClass(DataTexture, [{
		key: "bind",
		value: function bind() {
			var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

			var gl = this.gl;
			gl.activeTexture(gl.TEXTURE0 + index);
			gl.bindTexture(gl.TEXTURE_2D, this._texture);
		}
	}]);

	return DataTexture;
}();

exports.default = DataTexture;
module.exports = exports['default'];
//# sourceMappingURL=DataTexture.js.map