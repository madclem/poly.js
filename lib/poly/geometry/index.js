'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Mesh = require('./Mesh');

var _Mesh2 = _interopRequireDefault(_Mesh);

var _Cube = require('./mesh/Cube');

var _Cube2 = _interopRequireDefault(_Cube);

var _Sphere = require('./mesh/Sphere');

var _Sphere2 = _interopRequireDefault(_Sphere);

var _BigTriangle = require('./mesh/BigTriangle');

var _BigTriangle2 = _interopRequireDefault(_BigTriangle);

var _Quad = require('./mesh/Quad');

var _Quad2 = _interopRequireDefault(_Quad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	Mesh: _Mesh2.default,
	Cube: _Cube2.default,
	Sphere: _Sphere2.default,
	BigTriangle: _BigTriangle2.default,
	Quad: _Quad2.default
};
module.exports = exports['default'];
//# sourceMappingURL=index.js.map