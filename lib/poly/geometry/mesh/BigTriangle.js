'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Mesh2 = require('../Mesh');

var _Mesh3 = _interopRequireDefault(_Mesh2);

var _FacesMultiplicator = require('../../utils/FacesMultiplicator');

var _FacesMultiplicator2 = _interopRequireDefault(_FacesMultiplicator);

var _FacesSeparator = require('../../utils/FacesSeparator');

var _FacesSeparator2 = _interopRequireDefault(_FacesSeparator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BigTriangle = function (_Mesh) {
  _inherits(BigTriangle, _Mesh);

  function BigTriangle(program) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var state = arguments[2];
    var drawType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;

    _classCallCheck(this, BigTriangle);

    var _this = _possibleConstructorReturn(this, (BigTriangle.__proto__ || Object.getPrototypeOf(BigTriangle)).call(this, program, state, drawType));

    var indices = [2, 1, 0];
    var positions = [-1, -1, -1, 4, 4, -1];

    _this.addPosition(positions, 'aPosition', 2);
    _this.addIndices(indices, false);
    return _this;
  }

  return BigTriangle;
}(_Mesh3.default);

exports.default = BigTriangle;
module.exports = exports['default'];
//# sourceMappingURL=BigTriangle.js.map