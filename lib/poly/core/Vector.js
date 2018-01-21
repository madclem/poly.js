"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
    function Vector(cb) {
        _classCallCheck(this, Vector);

        this.cb = cb;

        this._x = 0;
        this._y = 0;
        this._z = 0;

        return this;
    }

    _createClass(Vector, [{
        key: "set",
        value: function set(x, y, z) {
            if (!x) x = 0;

            if (y === undefined) {
                y = z = x;
            }

            this._x = x;
            this._y = y;
            this._z = z;

            if (this.cb) this.cb();
        }
    }, {
        key: "x",
        get: function get() {
            return this._x;
        },
        set: function set(value) {
            this._x = value;
            if (this.cb) this.cb();
        }
    }, {
        key: "y",
        get: function get() {
            return this._y;
        },
        set: function set(value) {
            this._y = value;
            if (this.cb) this.cb();
        }
    }, {
        key: "z",
        get: function get() {
            return this._z;
        },
        set: function set(value) {
            this._z = value;
            if (this.cb) this.cb();
        }
    }]);

    return Vector;
}();

exports.default = Vector;
module.exports = exports['default'];
//# sourceMappingURL=Vector.js.map