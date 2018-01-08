'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
  function Camera() {
    _classCallCheck(this, Camera);

    this.aspectRatio = _glMatrix.mat4.create();
    this.matrix = _glMatrix.mat4.create();
    this.viewMatrix = _glMatrix.mat4.create();
    this.inverseViewMatrix = _glMatrix.mat4.create();
    this.projection = _glMatrix.mat4.create();
    this.orientation = _glMatrix.mat4.create();

    this.mRX = _glMatrix.mat4.create();
    this.mRY = _glMatrix.mat4.create();
    this.mRZ = _glMatrix.mat4.create();
    this.mT = _glMatrix.mat4.create();

    this.position = _glMatrix.vec3.create();
  }

  _createClass(Camera, [{
    key: 'lookAt',
    value: function lookAt(target) {
      var up = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 1, 0];

      _glMatrix.mat4.lookAt(this.matrix, this.position, target, up);
    }
  }, {
    key: 'rotateY',
    value: function rotateY(angle) {
      _glMatrix.mat4.identity(this.mRY);
      _glMatrix.mat4.fromYRotation(this.mRY, angle);
    }
  }, {
    key: 'rotateX',
    value: function rotateX(angle) {
      _glMatrix.mat4.identity(this.mRX);
      _glMatrix.mat4.fromXRotation(this.mRX, angle);
    }
  }, {
    key: 'rotateZ',
    value: function rotateZ(angle) {
      _glMatrix.mat4.identity(this.mRZ);
      _glMatrix.mat4.fromXRotation(this.mRZ, angle);
    }
  }, {
    key: 'setRotation',
    value: function setRotation(x, y, z) {}
  }, {
    key: 'setPosition',
    value: function setPosition(x, y, z) {
      this.position = [x, y, z];
      _glMatrix.mat4.identity(this.mT, this.mT);
      _glMatrix.mat4.translate(this.mT, this.mT, [x, y, z]);
    }
  }, {
    key: 'setAspectRatio',
    value: function setAspectRatio(aspectRatio) {
      this.aspectRatio = aspectRatio;
      this.perspective(this.fov, aspectRatio, this.near, this.far);
    }
  }, {
    key: 'perspective',
    value: function perspective(fov, aspect, near, far) {
      _glMatrix.mat4.identity(this.matrix);

      _glMatrix.mat4.perspective(this.projection, fov, aspect, near, far);

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

exports.default = Camera;
module.exports = exports['default'];
//# sourceMappingURL=Camera.js.map