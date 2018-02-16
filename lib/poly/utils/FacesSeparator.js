"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FacesSeparator = function () {
  function FacesSeparator() {
    _classCallCheck(this, FacesSeparator);
  }

  _createClass(FacesSeparator, [{
    key: "separate",
    value: function separate(faces, vertices) {
      var triangles = [];
      var ind = [];

      for (var i = 0; i < faces.length; i++) {
        triangles.push(faces[i][0], faces[i][1], faces[i][2]);
        ind.push(faces[i][0], faces[i][1], faces[i][2]);
      }

      var oldVerts = vertices.slice();
      var newVertices = [];
      for (var _i = 0; _i < triangles.length; _i++) {
        // console.log(oldVerts[triangles[i]]);
        newVertices[_i] = oldVerts[triangles[_i]].slice();
        // newVertices[i * 3] = oldVerts[triangles[i]];
        // newVertices[i * 3 + 1] = oldVerts[triangles[i]];
        // newVertices[i * 3 + 2] = oldVerts[triangles[i]];
        //
        // newVertices[i * 3] = oldVerts[triangles[i * 3]];
        // newVertices[i * 3 + 1] = oldVerts[triangles[i * 3 + 2]];
        // newVertices[i * 3 + 2] = oldVerts[triangles[i * 3 + 1]];

        triangles[_i] = _i;
      }

      return { faces: triangles, vertices: newVertices };
    }
  }]);

  return FacesSeparator;
}();

exports.default = new FacesSeparator();
module.exports = exports['default'];
//# sourceMappingURL=FacesSeparator.js.map