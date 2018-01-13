"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FacesMultiplicator = function () {
  function FacesMultiplicator() {
    _classCallCheck(this, FacesMultiplicator);

    this.indexUniq = 0;
    this.middlePointIndexCache = {};
    this.vertices = [];
    this.isNormalised = true;
  }

  _createClass(FacesMultiplicator, [{
    key: "multiplyTriangles",
    value: function multiplyTriangles(n, indices, vertices) {
      this.indexUniq = vertices.length;
      this.vertices = vertices;
      var faces = indices.slice();

      this.isNormalised = true;
      for (var i = 0; i < this.vertices.length; i++) {
        if (!this.isNormalised) break;

        for (var k = 0; k < this.vertices[i].length; k++) {
          if (Math.abs(this.vertices[i][k]) > 1) {
            this.isNormalised = false;
          }
        }
      }
      for (var i = 0; i < n; i++) {
        var faces2 = [];
        for (var k = 0; k < faces.length; k++) {
          var tri = faces[k];

          var a = this.getMiddlePoint(tri[0], tri[1]);
          var b = this.getMiddlePoint(tri[1], tri[2]);
          var c = this.getMiddlePoint(tri[2], tri[0]);

          faces2.push([tri[0], a, c]);
          faces2.push([tri[1], b, a]);
          faces2.push([tri[2], b, c]);
          faces2.push([a, b, c]);
        }

        faces = faces2.slice();
      }

      return faces;
    }
  }, {
    key: "addVertex",
    value: function addVertex(position) {
      var length = this.isNormalised ? Math.sqrt(position[0] * position[0] + position[1] * position[1] + position[2] * position[2]) : 1;
      this.vertices.push([position[0] / length, position[1] / length, position[2] / length]);

      return this.indexUniq++;
    }
  }, {
    key: "getMiddlePoint",
    value: function getMiddlePoint(p1, p2) {
      var firstPointIsSmaller = p1 < p2;
      var smallerIndex = firstPointIsSmaller ? p1 : p2;
      var greaterIndex = firstPointIsSmaller ? p2 : p1;
      var key = (smallerIndex << 32) + greaterIndex;

      var point1 = this.vertices[p1];
      var point2 = this.vertices[p2];
      var middle = [(point1[0] + point2[0]) / 2.0, (point1[1] + point2[1]) / 2.0, (point1[2] + point2[2]) / 2.0];

      var i = this.addVertex(middle);
      this.middlePointIndexCache[key] = i;

      return i;
    }
  }]);

  return FacesMultiplicator;
}();

exports.default = new FacesMultiplicator();
module.exports = exports['default'];
//# sourceMappingURL=FaceMultiplicator.js.map