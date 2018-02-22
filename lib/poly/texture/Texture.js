'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Texture = function () {
	function Texture(image, isTexture) {
		_classCallCheck(this, Texture);

		this.gl = POLY.gl;
		var gl = this.gl;

		if (isTexture) {
			this._texture = image;
		} else {
			this._texture = gl.createTexture();

			this.image = new Image();
			this.image.src = image;

			this.image.addEventListener('load', this.onImageLoaded.bind(this, this.image));
		}
	}

	_createClass(Texture, [{
		key: 'onImageLoaded',
		value: function onImageLoaded(image) {
			var gl = this.gl;

			gl.bindTexture(gl.TEXTURE_2D, this._texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

			if (POLY.utils.isPowerOfTwo(image.width) && POLY.utils.isPowerOfTwo(image.height)) {
				gl.generateMipmap(gl.TEXTURE_2D);
			}

			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}, {
		key: 'bind',
		value: function bind() {
			var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

			var gl = this.gl;
			gl.activeTexture(gl.TEXTURE0 + index);
			gl.bindTexture(gl.TEXTURE_2D, this._texture);
		}
	}]);

	return Texture;
}();

exports.default = Texture;
module.exports = exports['default'];
//# sourceMappingURL=Texture.js.map