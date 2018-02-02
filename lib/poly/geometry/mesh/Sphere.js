'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mesh2 = require('../Mesh');

var _Mesh3 = _interopRequireDefault(_Mesh2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sphere = function (_Mesh) {
  _inherits(Sphere, _Mesh);

  function Sphere(program) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var state = arguments[2];
    var drawType = arguments[3];

    _classCallCheck(this, Sphere);

    var _this = _possibleConstructorReturn(this, (Sphere.__proto__ || Object.getPrototypeOf(Sphere)).call(this, program, state, drawType));

    data = data || {};

    _this.options = {
      nbVert: data.nbVert || 10,
      radius: data.radius || 1,
      positionAttributeName: data.positionAttributeName || 'aPosition'
    };

    _this.sphere();
    return _this;
  }

  _createClass(Sphere, [{
    key: 'sphere',
    value: function sphere() {
      var positions = [];
      var indices = [];
      var index = 0;
      var uv = [];
      var offset = 0;

      var dTex = 1 / this.options.nbVert;

      var angle = void 0;
      for (var i = 0; i < this.options.nbVert; i++) {
        for (var j = 0; j < this.options.nbVert; j++) {
          angle = this.getAngle(i, j);
          positions.push(angle[0], angle[1], angle[2]);

          angle = this.getAngle(i + 1, j);
          positions.push(angle[0], angle[1], angle[2]);

          angle = this.getAngle(i + 1, j + 1);
          positions.push(angle[0], angle[1], angle[2]);

          angle = this.getAngle(i, j + 1);
          positions.push(angle[0], angle[1], angle[2]);

          var u = j / this.options.nbVert;
          var v = i / this.options.nbVert;
          uv.push(1.0 - u, v);
          uv.push(1.0 - u, v + dTex);
          uv.push(1.0 - u - dTex, v + dTex);
          uv.push(1.0 - u - dTex, v);

          indices.push(index * 4 + 0);
          indices.push(index * 4 + 1);
          indices.push(index * 4 + 2);
          indices.push(index * 4 + 0);
          indices.push(index * 4 + 2);
          indices.push(index * 4 + 3);
          index++;
        }
      }

      this.uvs = uv;

      this.addPosition(positions, this.options.positionAttributeName);
      this.addIndices(indices, false);
    }
  }, {
    key: 'getAngle',
    value: function getAngle(i, j) {
      var isNormal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      //	rx : -90 ~ 90 , ry : 0 ~ 360
      var ry = j / this.options.nbVert * Math.PI * 2 - Math.PI;
      var rx = i / this.options.nbVert * Math.PI - Math.PI * 0.5;
      var r = this.options.radius;
      var pos = [];
      pos[1] = Math.sin(rx) * r;
      var t = Math.cos(rx) * r;
      pos[0] = Math.cos(ry) * t;
      pos[2] = Math.sin(ry) * t;

      return [pos[0], pos[1], pos[2]];
    }
  }, {
    key: 'render',
    value: function render() {}
  }]);

  return Sphere;
}(_Mesh3.default);

exports.default = Sphere;
module.exports = exports['default'];
//# sourceMappingURL=Sphere.js.map