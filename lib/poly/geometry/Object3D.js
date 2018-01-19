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

        var position = new _core2.default.Vector();
        var scale = new _core2.default.Vector();
        var rotation = new _core2.default.Vector();

        this._rotation = _glMatrix.vec3.create();
        this._scale = _glMatrix.vec3.fromValues(1, 1, 1);
        this._position = _glMatrix.vec3.create();

        this._createGetterSetterUniforms([position, scale, rotation], ['position', 'scale', 'rotation']);
    }

    _createClass(Object3D, [{
        key: '_updateMatrix',
        value: function _updateMatrix() {
            _glMatrix.mat4.identity(this._matrix, this._matrix);

            _glMatrix.mat4.translate(this._matrix, this._matrix, this._position);
            _glMatrix.mat4.rotateX(this._matrix, this._matrix, this._rotation[0]);
            _glMatrix.mat4.rotateY(this._matrix, this._matrix, this._rotation[1]);
            _glMatrix.mat4.rotateZ(this._matrix, this._matrix, this._rotation[2]);
            _glMatrix.mat4.scale(this._matrix, this._matrix, this._scale);
        }
    }, {
        key: 'setScale',
        value: function setScale(x, y, z) {
            if (!y && !z) {
                y = z = x;
            }
            this._scale[0] = x;
            this._scale[1] = y;
            this._scale[2] = z;

            this._needsUpdate = true;
        }
    }, {
        key: 'update',
        value: function update() {
            if (this._needsUpdate) {
                this._updateMatrix();
            }
        }
    }, {
        key: '_createGetterSetterUniforms',
        value: function _createGetterSetterUniforms(objects, nameProperties) {
            var _this2 = this;

            var map = { x: 0, y: 1, z: 2 };
            var _this = this;

            var _loop = function _loop() {
                var o = objects[i];
                var nameProperty = nameProperties[i];

                _this2[nameProperties[i]] = new Proxy(o, {
                    get: function get(target, name) {
                        if (!(name in target)) {
                            console.log("Getting non-existant property '" + name + "'");
                            return undefined;
                        }

                        return target[name];
                    },
                    set: function set(target, name, value) {
                        if (!(name in target)) {
                            console.log("Setting non-existant property '" + name + "', initial value: " + value);
                            return false;
                        }

                        target[name] = value;
                        _this['_' + nameProperty][map[name]] = value;
                        _this._needsUpdate = true;

                        return true; //target[name];
                    }
                });
            };

            for (var i = 0; i < objects.length; i++) {
                _loop();
            }
        }
    }]);

    return Object3D;
}();

exports.default = Object3D;
module.exports = exports['default'];
//# sourceMappingURL=Object3D.js.map