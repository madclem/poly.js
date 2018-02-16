'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mesh2 = require('../Mesh');

var _Mesh3 = _interopRequireDefault(_Mesh2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Plane = function (_Mesh) {
    _inherits(Plane, _Mesh);

    function Plane(program) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var state = arguments[2];
        var drawType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;

        _classCallCheck(this, Plane);

        var _this = _possibleConstructorReturn(this, (Plane.__proto__ || Object.getPrototypeOf(Plane)).call(this, program, state, drawType));

        data = data || {};

        _this.options = {
            w: data.w || 1,
            h: data.h || 1,
            d: data.d || 1,
            axis: data.axis || 'xy',
            positionAttributeName: data.positionAttributeName || 'aPosition',
            subdivision: data.subdivision || 10
        };

        _this.pivotX = -_this.options.w / 2;
        _this.pivotY = -_this.options.h / 2;

        _this.plane(_this.options.w, _this.options.h, _this.options.subdivision, _this.options.axis);
        return _this;
    }

    _createClass(Plane, [{
        key: 'plane',
        value: function plane(w, h, subdivision, axis) {
            var positions = [];
            var indices = [];
            var index = 0;

            var offset = 0;

            // for (let i = subdivision - 1; i > -1; i--) {
            //   for (let j = subdivision - 1; j > -1; j--) {
            var pos = void 0,
                u = void 0,
                v = void 0;
            for (var i = 0; i < subdivision; i++) {
                u = i / subdivision;
                for (var j = 0; j < subdivision; j++) {
                    v = j / subdivision;
                    pos = this.getPos(i, j);
                    positions.push(pos[0], pos[1], pos[2]);
                    pos = this.getPos(i + 1, j);
                    positions.push(pos[0], pos[1], pos[2]);
                    pos = this.getPos(i + 1, j + 1);
                    positions.push(pos[0], pos[1], pos[2]);
                    pos = this.getPos(i, j + 1);
                    positions.push(pos[0], pos[1], pos[2]);

                    indices.push(index * 4 + 0);
                    indices.push(index * 4 + 1);
                    indices.push(index * 4 + 2);
                    indices.push(index * 4 + 0);
                    indices.push(index * 4 + 2);
                    indices.push(index * 4 + 3);

                    index++;

                    this.uvs.push(u, v, u, v, u, v, u, v);
                }
            }

            this.addPosition(positions, this.options.positionAttributeName);
            this.addIndices(indices, false);
        }
    }, {
        key: 'getPos',
        value: function getPos(i, j) {
            var x = this.options.w / this.options.subdivision * i + this.pivotX;
            var y = this.options.h / this.options.subdivision * j + this.pivotY;
            var z = 0;

            if (this.options.axis === "xy") {
                return [x, y, z];
            } else {
                return [x, 0, y];
            }
        }
    }]);

    return Plane;
}(_Mesh3.default);

exports.default = Plane;
module.exports = exports['default'];
//# sourceMappingURL=Plane.js.map