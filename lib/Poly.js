'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _App = require('./poly/App');

var _App2 = _interopRequireDefault(_App);

var _Scene = require('./poly/Scene');

var _Scene2 = _interopRequireDefault(_Scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Poly = function Poly() {
    _classCallCheck(this, Poly);

    this.App = _App2.default;
    this.Scene = _Scene2.default;
};

exports.default = new Poly();
module.exports = exports['default'];
//# sourceMappingURL=Poly.js.map