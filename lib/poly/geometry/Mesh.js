'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _State = require('../State');

var _State2 = _interopRequireDefault(_State);

var _Object3D2 = require('./Object3D');

var _Object3D3 = _interopRequireDefault(_Object3D2);

var _glMatrix = require('gl-matrix');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mesh = function (_Object3D) {
	_inherits(Mesh, _Object3D);

	function Mesh(program, state) {
		var drawType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

		_classCallCheck(this, Mesh);

		var _this = _possibleConstructorReturn(this, (Mesh.__proto__ || Object.getPrototypeOf(Mesh)).call(this));

		_this.uvs = [];
		_this.normals = [];

		_this.program = program;
		_this.state = state || new _State2.default(_this.program.gl);

		if (!state) {
			_this.state.depthTest = true;
		}

		_this.instanceCount = 0;
		_this.drawType = drawType;
		_this._attributes = [];
		_this._vertices = [];
		_this._indices = [];
		_this.matrix = _glMatrix.mat4.create();
		_this._vertexSize = 0;
		_this._numItems = 0;
		_this.indexBuffer = null;
		return _this;
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
			var instance = arguments[3];

			var gl = this.program.gl;
			var buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

			// console.log('data', data);
			this._attributes.push({
				name: name,
				data: data,
				itemSize: itemSize,
				numItems: this._numItems,
				buffer: buffer,
				instance: instance
			});

			this.program.addAttributeLocation(name);
		}
	}]);

	return Mesh;
}(_Object3D3.default);

exports.default = Mesh;
module.exports = exports['default'];
//# sourceMappingURL=Mesh.js.map