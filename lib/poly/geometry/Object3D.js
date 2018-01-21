'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Object3D = function () {
    function Object3D() {
        _classCallCheck(this, Object3D);

        this._matrix = _glMatrix.mat4.create();
        this._needsUpdate = false;

        this.position = new _core2.default.Vector(this._onPropertyUpdate.bind(this));
        this.scale = new _core2.default.Vector(this._onPropertyUpdate.bind(this));
        this.scale.set(1, 1, 1);
        this.rotation = new _core2.default.Vector(this._onPropertyUpdate.bind(this));

        this._rotation = _glMatrix.vec3.create();
        this._scale = _glMatrix.vec3.fromValues(1, 1, 1);
        this._position = _glMatrix.vec3.create();
    }

    _createClass(Object3D, [{
        key: '_onPropertyUpdate',
        value: function _onPropertyUpdate() {
            this._needsUpdate = true;
        }
    }, {
        key: '_updateMatrix',
        value: function _updateMatrix() {
            _glMatrix.vec3.set(this._scale, this.scale.x, this.scale.y, this.scale.z);
            _glMatrix.vec3.set(this._position, this.position.x, this.position.y, this.position.z);
            _glMatrix.vec3.set(this._rotation, this.rotation.x, this.rotation.y, this.rotation.z);

            _glMatrix.mat4.identity(this._matrix, this._matrix);
            _glMatrix.mat4.translate(this._matrix, this._matrix, this._position);
            _glMatrix.mat4.rotateX(this._matrix, this._matrix, this._rotation[0]);
            _glMatrix.mat4.rotateY(this._matrix, this._matrix, this._rotation[1]);
            _glMatrix.mat4.rotateZ(this._matrix, this._matrix, this._rotation[2]);
            _glMatrix.mat4.scale(this._matrix, this._matrix, this._scale);
        }
    }, {
        key: 'update',
        value: function update() {
            if (this._needsUpdate) {
                this._updateMatrix();
            }
        }
    }]);

    return Object3D;
}();

exports.default = Object3D;
module.exports = exports['default'];
//# sourceMappingURL=Object3D.js.map