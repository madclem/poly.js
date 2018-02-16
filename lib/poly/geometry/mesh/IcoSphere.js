'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mesh2 = require('../Mesh');

var _Mesh3 = _interopRequireDefault(_Mesh2);

var _FacesSeparator = require('../../utils/FacesSeparator');

var _FacesSeparator2 = _interopRequireDefault(_FacesSeparator);

var _FacesMultiplicator = require('../../utils/FacesMultiplicator');

var _FacesMultiplicator2 = _interopRequireDefault(_FacesMultiplicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IcoSphere = function (_Mesh) {
  _inherits(IcoSphere, _Mesh);

  function IcoSphere(program) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var state = arguments[2];
    var drawType = arguments[3];

    _classCallCheck(this, IcoSphere);

    var _this = _possibleConstructorReturn(this, (IcoSphere.__proto__ || Object.getPrototypeOf(IcoSphere)).call(this, program, state, drawType));

    data = data || {};

    _this.options = {
      subdivision: data.subdivision || 1,
      radius: data.radius || 1,
      positionAttributeName: data.positionAttributeName || 'aPosition'
    };

    _this.icosphere();
    return _this;
  }

  _createClass(IcoSphere, [{
    key: 'icosphere',
    value: function icosphere() {
      var vertices = [];
      var faces = [];
      // let vertices = [];
      var indices = [];
      var radius = 1;
      // create 12 vertices of a icosahedron
      var t = (1.0 + Math.sqrt(5.0)) / 2.0 * radius;

      this.positions = [];

      this.addVertex([-1 * radius, t, 0], vertices);
      this.addVertex([1 * radius, t, 0], vertices);
      this.addVertex([-1 * radius, -t, 0], vertices);
      this.addVertex([1 * radius, -t, 0], vertices);

      this.addVertex([0, -1 * radius, t], vertices);
      this.addVertex([0, 1 * radius, t], vertices);
      this.addVertex([0, -1 * radius, -t], vertices);
      this.addVertex([0, 1 * radius, -t], vertices);

      this.addVertex([t, 0, -1 * radius], vertices);
      this.addVertex([t, 0, 1 * radius], vertices);
      this.addVertex([-t, 0, -1 * radius], vertices);
      this.addVertex([-t, 0, 1 * radius], vertices);

      // create 20 triangles of the icosahedron
      faces.push([0, 11, 5]);
      faces.push([0, 5, 1]);
      faces.push([0, 1, 7]);
      faces.push([0, 7, 10]);
      faces.push([0, 10, 11]);

      faces.push([1, 5, 9]);
      faces.push([5, 11, 4]);
      faces.push([11, 10, 2]);
      faces.push([10, 7, 6]);
      faces.push([7, 1, 8]);

      faces.push([3, 9, 4]);
      faces.push([3, 4, 2]);
      faces.push([3, 2, 6]);
      faces.push([3, 6, 8]);
      faces.push([3, 8, 9]);

      faces.push([4, 9, 5]);
      faces.push([2, 4, 11]);
      faces.push([6, 2, 10]);
      faces.push([8, 6, 7]);
      faces.push([9, 8, 1]);

      faces = _FacesMultiplicator2.default.multiplyTriangles(this.options.subdivision, faces, vertices);

      var data = _FacesSeparator2.default.separate(faces, vertices);
      var newVertices = data.vertices;
      var triangles = data.faces;

      var finalPositions = [];
      for (var i = 0; i < newVertices.length; i++) {
        var v = newVertices[i];
        v[0] *= this.options.radius;
        v[1] *= this.options.radius;
        v[2] *= this.options.radius;
        finalPositions.push(v[0], v[1], v[2]);
      }
      // this.uvs = uv;

      this.addPosition(finalPositions, this.options.positionAttributeName);
      this.addIndices(triangles, false);
    }
  }, {
    key: 'addVertex',
    value: function addVertex(position, out) {
      var length = Math.sqrt(position[0] * position[0] + position[1] * position[1] + position[2] * position[2]);
      out.push([position[0] / length, position[1] / length, position[2] / length]);
    }
  }, {
    key: 'render',
    value: function render() {}
  }]);

  return IcoSphere;
}(_Mesh3.default);

exports.default = IcoSphere;
module.exports = exports['default'];
//# sourceMappingURL=IcoSphere.js.map