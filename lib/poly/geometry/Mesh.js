'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mesh = function () {
	function Mesh(program) {
		var drawType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

		_classCallCheck(this, Mesh);

		this.program = program;
		this.drawType = drawType;
		this._attributes = [];
		this._vertices = [];
		this._indices = [];
		this._vertexSize = 0;
		this._numItems = 0;
		this.indexBuffer = null;
	}

	_createClass(Mesh, [{
		key: 'addIndices',
		value: function addIndices(indices, dynamic) {
			var gl = this.program.gl;
			var drawType = dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
			this._indices = indices;

			this.indexBuffer = gl.createBuffer();

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), drawType);
		}
	}, {
		key: 'addPosition',
		value: function addPosition(data) {
			var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'aPosition';

			this._vertices = data;
			this._vertexSize = this._vertices.length;
			this._numItems = this._vertexSize / 3;
			this.addAttribute(data, name);
		}
	}, {
		key: 'addAttribute',
		value: function addAttribute(data, name) {
			var itemSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;

			var gl = this.program.gl;
			var buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

			this._attributes.push({
				name: name,
				data: data,
				itemSize: itemSize,
				numItems: this._numItems,
				buffer: buffer
			});

			this.program.addAttributeLocation(name);
		}
	}]);

	return Mesh;
}();

exports.default = Mesh;
module.exports = exports['default'];
//# sourceMappingURL=Mesh.js.map