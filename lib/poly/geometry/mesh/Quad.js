'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Mesh2 = require('../Mesh');

var _Mesh3 = _interopRequireDefault(_Mesh2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quad = function (_Mesh) {
	_inherits(Quad, _Mesh);

	function Quad(program) {
		var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var state = arguments[2];
		var drawType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;

		_classCallCheck(this, Quad);

		var _this = _possibleConstructorReturn(this, (Quad.__proto__ || Object.getPrototypeOf(Quad)).call(this, program, state, drawType));

		_this.addPosition([-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0]);

		_this.addAttribute([1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0], 'aUv', 2);
		//
		_this.addIndices([0, 1, 2, 0, 2, 3]);
		return _this;
	}

	return Quad;
}(_Mesh3.default);

exports.default = Quad;
module.exports = exports['default'];
//# sourceMappingURL=Quad.js.map