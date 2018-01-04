'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PolyGL = require('./PolyGL');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App(canvas) {
        _classCallCheck(this, App);

        this._gl = _PolyGL.PolyGL;

        this._canvas = canvas;

        this._gl.reset(this._canvas);
    }

    _createClass(App, [{
        key: 'resize',
        value: function resize() {
            this._gl.resize();
        }
    }]);

    return App;
}();

exports.default = App;
module.exports = exports['default'];
//# sourceMappingURL=App.js.map