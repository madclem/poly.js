"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataTexture = function () {
	function DataTexture(data) {
		var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;
		var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 256;
		var format = arguments[3];

		_classCallCheck(this, DataTexture);

		this.gl = POLY.gl;
		var gl = this.gl;

		format = format || gl.RGBA;

		this._texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this._texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, gl.UNSIGNED_BYTE, data);

		if (POLY.utils.isPowerOfTwo(width) && POLY.utils.isPowerOfTwo(height)) {
			gl.generateMipmap(gl.TEXTURE_2D);
		}

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		// gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT ) ;
		// gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT ) ;
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