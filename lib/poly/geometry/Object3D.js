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

        var position = new _core2.default.Vector();
        var scale = new _core2.default.Vector();
        var rotation = new _core2.default.Vector();

        this._rotation = _glMatrix.vec3.create();
        this._scale = _glMatrix.vec3.create();
        this._position = _glMatrix.vec3.create();

        this._createGetterSetterUniforms([position, scale, rotation], ['position', 'scale', 'rotation']);
    }

    _createClass(Object3D, [{
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

                        return target[name];
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