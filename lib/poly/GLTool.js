"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = new (function () {
	function GLTool() {
		_classCallCheck(this, GLTool);

		this._lastMesh = null;
	}

	_createClass(GLTool, [{
		key: "_bindBuffers",
		value: function _bindBuffers(mesh) {
			var gl = mesh.program.gl;

			for (var i = 0; i < mesh._attributes.length; i++) {
				var attrib = mesh._attributes[i];
				gl.bindBuffer(gl.ARRAY_BUFFER, attrib.buffer);
				gl.vertexAttribPointer(mesh.program.getAttributeLocation(attrib.name), attrib.itemSize, gl.FLOAT, false, 0, 0);
			}

			if (mesh.indexBuffer) {
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
			}
		}
	}, {
		key: "draw",
		value: function draw(mesh) {
			if (this._lastMesh !== mesh) {
				this._bindBuffers(mesh);
				this._lastMesh = mesh;
			}

			var gl = mesh.program.gl;

			if (mesh.indexBuffer) {
				gl.drawElements(gl.TRIANGLES, mesh._indices.length, gl.UNSIGNED_SHORT, 0);
			} else {
				gl.drawArrays(gl.TRIANGLES, 0, mesh._numItems);
			}
		}
	}, {
		key: "resize",
		value: function resize(w, h) {
			var gl = POLY.gl;
			gl.canvas.width = w;
			gl.canvas.height = h;
		}
	}]);

	return GLTool;
}())();
module.exports = exports['default'];
//# sourceMappingURL=GLTool.js.map