'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mesh2 = require('../geometry/Mesh');

var _Mesh3 = _interopRequireDefault(_Mesh2);

var _Program = require('../Program');

var _Program2 = _interopRequireDefault(_Program);

var _State = require('../State');

var _State2 = _interopRequireDefault(_State);

var _planesDot = require('../shaders/planes-dot.vert');

var _planesDot2 = _interopRequireDefault(_planesDot);

var _simpleColor = require('../shaders/simpleColor.frag');

var _simpleColor2 = _interopRequireDefault(_simpleColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BatchPlanes = function (_Mesh) {
    _inherits(BatchPlanes, _Mesh);

    function BatchPlanes() {
        var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 25;

        _classCallCheck(this, BatchPlanes);

        var program = new _Program2.default(_planesDot2.default, _simpleColor2.default, {
            color: {
                type: 'vec3',
                value: [1., 1., 1.]
            },
            opacity: {
                type: 'float',
                value: .6
            }
        });
        var state = new _State2.default(POLY.gl);
        state.depthTest = true;

        var _this = _possibleConstructorReturn(this, (BatchPlanes.__proto__ || Object.getPrototypeOf(BatchPlanes)).call(this, program, state, 0));

        var index = 0;
        var positions = [];
        var indices = [];

        for (var i = -size; i < size; i++) {
            for (var j = -size; j < size; j++) {
                positions.push(i, j, 0);
                indices.push(index);
                index++;

                positions.push(i, 0, j);
                indices.push(index);
                index++;
            }
        }

        _this.addPosition(positions, 'aPosition');
        _this.addIndices(indices);
        return _this;
    }

    _createClass(BatchPlanes, [{
        key: 'draw',
        value: function draw() {
            this.program.bind();
            POLY.GL.draw(this);
        }
    }]);

    return BatchPlanes;
}(_Mesh3.default);

exports.default = BatchPlanes;
module.exports = exports['default'];
//# sourceMappingURL=BatchPlanes.js.map