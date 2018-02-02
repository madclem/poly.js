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

var tempArray1 = [];
var tempArray2 = [];

var Line = function (_Mesh) {
    _inherits(Line, _Mesh);

    function Line(program) {
        var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var state = arguments[2];
        var drawType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;

        _classCallCheck(this, Line);

        // data = data || {};

        var _this = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, program, state, drawType));

        if (points.length <= 0) {
            points = [[0, 0, 0], [100 / 200, 250 / 200, 0], [50 / 200, 200 / 200, 0], [0, 200 / 200, 0], [-100 / 200, 220 / 200, 0], [-70 / 200, 300 / 200, 0]];
        }

        _this.positions = [];
        _this.directions = [];
        _this.indicesArray = [];
        _this.counters = [];
        _this.width = [];
        _this.uvs = [];
        _this.previous = [];
        _this.next = [];

        _this.points = points;

        _this.line();
        return _this;
    }

    _createClass(Line, [{
        key: 'line',
        value: function line() {
            var needsUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            var v = this.points;

            this.positions.length = v.length * 2;
            this.counters.length = v.length * 2;

            var index = 0;
            var indexC = 0;
            var indexP = 0;
            var indexN = 0;

            this.previous.length = this.positions.length;
            this.next.length = this.positions.length;

            for (var i = 0; i < v.length; i++) {

                if (needsUpdate) {
                    var c = i / v.length;
                    this.counters[indexC++] = [c];
                    this.counters[indexC++] = [c];
                }

                this.positions[index++] = v[i][0];
                this.positions[index++] = v[i][1];
                this.positions[index++] = v[i][2];

                this.positions[index++] = v[i][0];
                this.positions[index++] = v[i][1];
                this.positions[index++] = v[i][2];
            }

            this.process(needsUpdate);
        }
    }, {
        key: 'compareV3',
        value: function compareV3(a, b) {
            var aa = a * 6;
            var ab = b * 6;

            return this.positions[aa] === this.positions[ab] && this.positions[aa + 1] === this.positions[ab + 1] && this.positions[aa + 2] === this.positions[ab + 2];
        }
    }, {
        key: 'copyV3',
        value: function copyV3(a, out) {
            if (!out) out = tempArray1;
            var aa = a * 6;
            out[0] = this.positions[aa];
            out[1] = this.positions[aa + 1];
            out[2] = this.positions[aa + 2];
        }
    }, {
        key: 'process',
        value: function process(needsUpdate) {
            var l = this.positions.length / 6;
            var v = void 0,
                index = 0,
                indexN = 0;
            if (this.compareV3(0, l - 1)) {
                this.copyV3(l - 2);
            } else {
                this.copyV3(0);
            }

            this.previous[index++] = tempArray1[0];
            this.previous[index++] = tempArray1[1];
            this.previous[index++] = tempArray1[2];

            this.previous[index++] = tempArray1[0];
            this.previous[index++] = tempArray1[1];
            this.previous[index++] = tempArray1[2];

            for (var i = 0; i < l; i++) {
                // caluclate pos and next
                this.copyV3(i, tempArray1);

                if (i > 0) {
                    // we can fill the nexts
                    this.next[indexN++] = tempArray1[0];
                    this.next[indexN++] = tempArray1[1];
                    this.next[indexN++] = tempArray1[2];

                    this.next[indexN++] = tempArray1[0];
                    this.next[indexN++] = tempArray1[1];
                    this.next[indexN++] = tempArray1[2];

                    this.previous[index++] = tempArray2[0];
                    this.previous[index++] = tempArray2[1];
                    this.previous[index++] = tempArray2[2];

                    this.previous[index++] = tempArray2[0];
                    this.previous[index++] = tempArray2[1];
                    this.previous[index++] = tempArray2[2];
                }

                tempArray2[0] = tempArray1[0];
                tempArray2[1] = tempArray1[1];
                tempArray2[2] = tempArray1[2];
            }

            if (this.compareV3(l - 1, 0)) {
                this.copyV3(1, tempArray1);
            } else {
                this.copyV3(l - 1, tempArray1);
            }

            this.next[indexN++] = tempArray1[0];
            this.next[indexN++] = tempArray1[1];
            this.next[indexN++] = tempArray1[2];

            this.next[indexN++] = tempArray1[0];
            this.next[indexN++] = tempArray1[1];
            this.next[indexN++] = tempArray1[2];

            index = 0;
            this.addPosition(this.positions, 'position');
            this.addAttribute(this.next, 'aNext');
            this.addAttribute(this.previous, 'aPrevious');

            if (needsUpdate) {
                index = 0;
                this.uvs = [];
                var w = void 0;

                for (var j = 0; j < l; j++) {
                    if (this.widthCallback) {
                        w = this.widthCallback(j / (l - 1));
                    } else {
                        w = .1;
                    }

                    this.width[index++] = w;
                    this.width[index++] = w;

                    this.uvs.push(j / (l - 1), 0);
                    this.uvs.push(j / (l - 1), 1);
                }

                index = 0;
                this.indicesArray = [];

                for (var _j = 0; _j < l - 1; _j++) {
                    var n = _j * 2;

                    this.indicesArray[index++] = n;
                    this.indicesArray[index++] = n + 1;
                    this.indicesArray[index++] = n + 2;

                    this.indicesArray[index++] = n + 2;
                    this.indicesArray[index++] = n + 1;
                    this.indicesArray[index++] = n + 3;
                }

                index = 0;
                this.directions = [];

                for (var _i = 0; _i < this.positions.length; _i++) {
                    if (_i % 2 === 0) {
                        this.directions[index++] = 1;
                    } else {
                        this.directions[index++] = -1;
                    }
                }

                this.addIndices(this.indicesArray, false);
                // this.addAttribute(this.width, 'width');
                this.addAttribute(this.directions, 'direction', 1);
                this.addAttribute(this.uvs, 'aUv', 2);
                this.addAttribute(this.counters, 'aCounters', 1);
            }
        }
    }, {
        key: 'update',
        value: function update(points) {
            var needsUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            this.points = points || this.points;
            this.line(needsUpdate);
        }
    }]);

    return Line;
}(_Mesh3.default);

exports.default = Line;
module.exports = exports['default'];
//# sourceMappingURL=Line.js.map