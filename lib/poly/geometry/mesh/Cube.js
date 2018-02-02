'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var Cube = function (_Mesh) {
  _inherits(Cube, _Mesh);

  function Cube(program) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var state = arguments[2];
    var drawType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;

    _classCallCheck(this, Cube);

    var _this = _possibleConstructorReturn(this, (Cube.__proto__ || Object.getPrototypeOf(Cube)).call(this, program, state, drawType));

    data = data || {};

    _this.options = {
      w: data.w || 1,
      h: data.h || 1,
      d: data.d || 1,
      multiFace: data.multiFace,
      subdivision: data.subdivision || 0,
      positionAttributeName: data.positionAttributeName || 'aPosition'
    };

    _this.multiFace = _this.options.multiFace;

    _this.subdivision = _this.options.subdivision;
    _this.width = _this.options.w;
    _this.height = _this.options.h;
    _this.depth = _this.options.d;

    _this.cube();
    return _this;
  }

  _createClass(Cube, [{
    key: 'cube',
    value: function cube() {
      var x = this.width / 2;
      var y = this.height / 2;
      var z = this.depth / 2;

      var positions = [];
      var coords = [];
      var indices = [];
      var normals = [];
      var count = 0;

      // BACK
      positions.push(-x, y, -z);
      positions.push(x, y, -z);
      positions.push(x, -y, -z);
      positions.push(-x, -y, -z);

      normals.push(0, 0, -1);
      normals.push(0, 0, -1);
      normals.push(0, 0, -1);
      normals.push(0, 0, -1);

      if (this.multiFace) {
        coords.push(0, 0);
        coords.push(1 / 4, 0);
        coords.push(1 / 4, 1 / 2);
        coords.push(0, 1 / 2);
      } else {
        coords.push(0, 0);
        coords.push(1, 0);
        coords.push(1, 1);
        coords.push(0, 1);
      }

      indices.push(count * 4 + 0);
      indices.push(count * 4 + 1);
      indices.push(count * 4 + 2);
      indices.push(count * 4 + 0);
      indices.push(count * 4 + 2);
      indices.push(count * 4 + 3);

      count++;

      // RIGHT
      positions.push(x, y, -z);
      positions.push(x, y, z);
      positions.push(x, -y, z);
      positions.push(x, -y, -z);

      normals.push(1, 0, 0);
      normals.push(1, 0, 0);
      normals.push(1, 0, 0);
      normals.push(1, 0, 0);

      if (this.multiFace) {
        coords.push(1 / 4, 0);
        coords.push(1 / 4 * 2, 0);
        coords.push(1 / 4 * 2, 1 / 2);
        coords.push(1 / 4, 1 / 2);
      } else {
        coords.push(0, 0);
        coords.push(1, 0);
        coords.push(1, 1);
        coords.push(0, 1);
      }

      indices.push(count * 4 + 0);
      indices.push(count * 4 + 1);
      indices.push(count * 4 + 2);
      indices.push(count * 4 + 0);
      indices.push(count * 4 + 2);
      indices.push(count * 4 + 3);

      count++;

      // FRONT
      positions.push(x, y, z);
      positions.push(-x, y, z);
      positions.push(-x, -y, z);
      positions.push(x, -y, z);

      normals.push(0, 0, 1);
      normals.push(0, 0, 1);
      normals.push(0, 0, 1);
      normals.push(0, 0, 1);

      if (this.multiFace) {
        coords.push(1 / 4 * 2, 0);
        coords.push(1 / 4 * 3, 0);
        coords.push(1 / 4 * 3, 1 / 2);
        coords.push(1 / 4 * 2, 1 / 2);
      } else {
        coords.push(0, 0);
        coords.push(1, 0);
        coords.push(1, 1);
        coords.push(0, 1);
      }

      indices.push(count * 4 + 0);
      indices.push(count * 4 + 1);
      indices.push(count * 4 + 2);
      indices.push(count * 4 + 0);
      indices.push(count * 4 + 2);
      indices.push(count * 4 + 3);

      count++;

      // LEFT
      positions.push(-x, y, z);
      positions.push(-x, y, -z);
      positions.push(-x, -y, -z);
      positions.push(-x, -y, z);

      normals.push(-1, 0, 0);
      normals.push(-1, 0, 0);
      normals.push(-1, 0, 0);
      normals.push(-1, 0, 0);

      if (this.multiFace) {
        coords.push(0, 1 / 2);
        coords.push(1 / 4, 1 / 2);
        coords.push(1 / 4, 1 / 2 * 2);
        coords.push(0, 1 / 2 * 2);
      } else {
        coords.push(0, 0);
        coords.push(1, 0);
        coords.push(1, 1);
        coords.push(0, 1);
      }

      indices.push(count * 4 + 0);
      indices.push(count * 4 + 1);
      indices.push(count * 4 + 2);
      indices.push(count * 4 + 0);
      indices.push(count * 4 + 2);
      indices.push(count * 4 + 3);

      count++;

      // TOP
      positions.push(-x, y, z);
      positions.push(x, y, z);
      positions.push(x, y, -z);
      positions.push(-x, y, -z);

      normals.push(0, 1, 0);
      normals.push(0, 1, 0);
      normals.push(0, 1, 0);
      normals.push(0, 1, 0);

      if (this.multiFace) {
        coords.push(1 / 4, 1 / 2);
        coords.push(1 / 4 * 2, 1 / 2);
        coords.push(1 / 4 * 2, 1 / 2 * 2);
        coords.push(1 / 4, 1 / 2 * 2);
      } else {
        coords.push(0, 0);
        coords.push(1, 0);
        coords.push(1, 1);
        coords.push(0, 1);
      }

      indices.push(count * 4 + 0);
      indices.push(count * 4 + 1);
      indices.push(count * 4 + 2);
      indices.push(count * 4 + 0);
      indices.push(count * 4 + 2);
      indices.push(count * 4 + 3);

      count++;

      // BOTTOM
      positions.push(-x, -y, -z);
      positions.push(x, -y, -z);
      positions.push(x, -y, z);
      positions.push(-x, -y, z);

      normals.push(0, -1, 0);
      normals.push(0, -1, 0);
      normals.push(0, -1, 0);
      normals.push(0, -1, 0);

      if (this.multiFace) {
        coords.push(1 / 4 * 2, 1 / 2);
        coords.push(1 / 4 * 3, 1 / 2);
        coords.push(1 / 4 * 3, 1 / 2 * 2);
        coords.push(1 / 4 * 2, 1 / 2 * 2);
      } else {
        coords.push(0, 0);
        coords.push(1, 0);
        coords.push(1, 1);
        coords.push(0, 1);
      }

      indices.push(count * 4 + 0);
      indices.push(count * 4 + 1);
      indices.push(count * 4 + 2);
      indices.push(count * 4 + 0);
      indices.push(count * 4 + 2);
      indices.push(count * 4 + 3);

      var ind = [];

      for (var i = 0; i < indices.length; i += 3) {
        ind.push(indices[i], indices[i + 1], indices[i + 2]);
      }

      // TODO this is a temporary fix
      var faces = _FacesMultiplicator2.default.multiplyTriangles(this.subdivision, ind, positions);
      var l = positions.length - coords.length;
      for (var i = 0; i < l; i++) {
        coords.push(0, 0);
        normals.push(0, -1, 0);
      }

      this.uvs = coords;
      this.normals = normals;

      this.addPosition(positions, this.options.positionAttributeName);
      this.addIndices(faces, false);
    }
  }]);

  return Cube;
}(_Mesh3.default);

exports.default = Cube;
module.exports = exports['default'];
//# sourceMappingURL=Cube.js.map