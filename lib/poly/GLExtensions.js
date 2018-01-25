'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = require('./const');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = new (function () {
    function GLExtensions() {
        _classCallCheck(this, GLExtensions);

        this.extensions = {};
    }

    _createClass(GLExtensions, [{
        key: 'init',
        value: function init() {
            var gl = POLY.gl;

            for (var i = 0; i < _const.extensions.length; i++) {
                this.extensions[_const.extensions[i]] = gl.getExtension(_const.extensions[i]);
            }
        }
    }, {
        key: 'checkExtension',
        value: function checkExtension(id) {
            return !!this.extensions[id];
        }
    }, {
        key: 'getExtension',
        value: function getExtension(id) {
            return this.extensions[id];
        }
    }]);

    return GLExtensions;
}())();
module.exports = exports['default'];
//# sourceMappingURL=GLExtensions.js.map