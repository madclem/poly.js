'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Matrices = require('../utils/Matrices');

var _Matrices2 = _interopRequireDefault(_Matrices);

var _glMatrix = require('gl-matrix');

var _glMatrix2 = _interopRequireDefault(_glMatrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
  function Camera() {
    _classCallCheck(this, Camera);

    // camera
    this.aspectRatio = _glMatrix2.default.mat4.create();
    this.matrix = _glMatrix2.default.mat4.create();
    this.inverseViewMatrix = _glMatrix2.default.mat4.create();
    this.projection = _glMatrix2.default.mat4.create();
    this.orientation = _glMatrix2.default.mat4.create();

    this.mRX = _glMatrix2.default.mat4.create();
    this.mRY = _glMatrix2.default.mat4.create();
    this.mRZ = _glMatrix2.default.mat4.create();
    this.mT = _glMatrix2.default.mat4.create();

    this.position = _glMatrix2.default.vec3.create();
  }

  _createClass(Camera, [{
    key: 'lookAt',
    value: function lookAt(target) {
      var up = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 1, 0];

      // this.position = glmatrix.vec3.clone(position);
      // this._center = glmatrix.vec3.clone(target);

      // glmatrix.mat4.identity(this.matrix);
      _glMatrix2.default.mat4.lookAt(this.matrix, this.position, target, up);
      // console.log(this.matrix);
    }
  }, {
    key: 'rotateY',
    value: function rotateY(angle) {
      _glMatrix2.default.mat4.identity(this.mRY);
      _glMatrix2.default.mat4.fromYRotation(this.mRY, angle);

      // glmatrix.mat4.translate(this.matrix, this.matrix, this.position);
      // glmatrix.mat4.rotateY(this.matrix, this.matrix, angle)
    }
  }, {
    key: 'rotateX',
    value: function rotateX(angle) {
      _glMatrix2.default.mat4.identity(this.mRX);
      _glMatrix2.default.mat4.fromXRotation(this.mRX, angle);

      // glmatrix.mat4.translate(this.matrix, this.matrix, this.position);
      // glmatrix.mat4.rotateX(this.matrix, this.matrix, angle)
    }
  }, {
    key: 'rotateZ',
    value: function rotateZ(angle) {
      _glMatrix2.default.mat4.identity(this.mRZ);
      _glMatrix2.default.mat4.fromXRotation(this.mRZ, angle);
    }
  }, {
    key: 'setRotation',
    value: function setRotation(x, y, z) {}
  }, {
    key: 'setPosition',
    value: function setPosition(x, y, z) {
      this.position = [x, y, z];
      // glmatrix.mat4.identity(this.matrix);
      // glmatrix.mat4.translate(this.matrix, this.matrix, [x, y, z]);
      _glMatrix2.default.mat4.identity(this.mT, this.mT);
      _glMatrix2.default.mat4.translate(this.mT, this.mT, [x, y, z]);
      // var translation = vec3.create();
      // vec3.set (translation, 0, 0, -1.0);
      // mat4.translate (mvMatrix, mvMatrix, translation);

      // glmatrix.mat4.fromRotationTranslation(this._matrix, 0, translation)
      // glmatrix.mat4.translate(this._matrix, this._matrix, translation);
    }
  }, {
    key: 'setAspectRatio',
    value: function setAspectRatio(aspectRatio) {
      this.aspectRatio = aspectRatio;
      this.perspective(this.fov, aspectRatio, this.near, this.far);
    }

    // perspective(fov, aspect, near, far, dst) {
    //   this.fov = fov;
    //   this.near = near;
    //   this.far = far;
    //
    //   dst = dst || new Float32Array(16);
    //   var f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
    //   var rangeInv = 1.0 / (near - far);
    //
    //   dst[ 0] = f / aspect;
    //   dst[ 1] = 0;
    //   dst[ 2] = 0;
    //   dst[ 3] = 0;
    //   dst[ 4] = 0;
    //   dst[ 5] = f;
    //   dst[ 6] = 0;
    //   dst[ 7] = 0;
    //   dst[ 8] = 0;
    //   dst[ 9] = 0;
    //   dst[10] = (near + far) * rangeInv;
    //   dst[11] = -1;
    //   dst[12] = 0;
    //   dst[13] = 0;
    //   dst[14] = near * far * rangeInv * 2;
    //   dst[15] = 0;
    //
    //   // this.projection = Matrices.multiply(dst, Matrices.inverse(this.matrix)) ;
    //
    //   this.projection = dst;
    //
    //   return Matrices.multiply(dst, Matrices.inverse(this.matrix));
    // }

  }, {
    key: 'perspective',
    value: function perspective(fov, aspect, near, far) {

      _glMatrix2.default.mat4.identity(this.matrix);

      _glMatrix2.default.mat4.perspective(this.projection, fov, aspect, near, far);

      this.fov = fov;
      this.near = near;
      this.far = far;
      this.aspect = aspect;
    }
  }, {
    key: 'orthographic',
    value: function orthographic(left, right, bottom, top, near, far, dst) {
      dst = dst || new Float32Array(16);

      dst[0] = 2 / (right - left);
      dst[1] = 0;
      dst[2] = 0;
      dst[3] = 0;
      dst[4] = 0;
      dst[5] = 2 / (top - bottom);
      dst[6] = 0;
      dst[7] = 0;
      dst[8] = 0;
      dst[9] = 0;
      dst[10] = 2 / (near - far);
      dst[11] = 0;
      dst[12] = (left + right) / (left - right);
      dst[13] = (bottom + top) / (bottom - top);
      dst[14] = (near + far) / (near - far);
      dst[15] = 1;

      return dst;
    }
  }]);

  return Camera;
}();

// const  gh = new Camera();

// export default gh;


exports.default = Camera;
module.exports = exports['default'];
//# sourceMappingURL=Camera.js.map