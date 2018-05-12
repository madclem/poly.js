'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Ray.js (https://github.com/yiwenl/Alfrid/blob/master/src/alfrid/math/Ray.js)

var _glMatrix = require('gl-matrix');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const mat4 = glm.mat4;
// const vec3 = glm.vec3;

var a = _glMatrix.vec3.create();
var b = _glMatrix.vec3.create();
var c = _glMatrix.vec3.create();
var target = _glMatrix.vec3.create();
var edge1 = _glMatrix.vec3.create();
var edge2 = _glMatrix.vec3.create();
var normal = _glMatrix.vec3.create();
var diff = _glMatrix.vec3.create();

var Ray = function () {
	function Ray(origin, direction) {
		_classCallCheck(this, Ray);

		this.origin = origin ? _glMatrix.vec3.clone(origin) : _glMatrix.vec3.create();
		this.direction = direction ? _glMatrix.vec3.clone(direction) : _glMatrix.vec3.create();
	}

	_createClass(Ray, [{
		key: 'at',
		value: function at(t) {
			_glMatrix.vec3.copy(target, this.direction);
			_glMatrix.vec3.scale(target, target, t);
			_glMatrix.vec3.add(target, target, this.origin);

			return target;
		}
	}, {
		key: 'lookAt',
		value: function lookAt(mTarget) {
			_glMatrix.vec3.sub(this.direction, mTarget, this.origin);
			_glMatrix.vec3.normalize(this.origin, this.origin);
		}
	}, {
		key: 'closestPointToPoint',
		value: function closestPointToPoint(mPoint) {
			var result = _glMatrix.vec3.create();
			_glMatrix.vec3.sub(mPoint, this.origin);
			var directionDistance = _glMatrix.vec3.dot(result, this.direction);

			if (directionDistance < 0) {
				return _glMatrix.vec3.clone(this.origin);
			}

			_glMatrix.vec3.copy(result, this.direction);
			_glMatrix.vec3.scale(result, result, directionDistance);
			_glMatrix.vec3.add(result, result, this.origin);

			return result;
		}
	}, {
		key: 'distanceToPoint',
		value: function distanceToPoint(mPoint) {
			return Math.sqrt(this.distanceSqToPoint(mPoint));
		}
	}, {
		key: 'distanceSqToPoint',
		value: function distanceSqToPoint(mPoint) {
			var v1 = _glMatrix.vec3.create();

			_glMatrix.vec3.sub(v1, mPoint, this.origin);
			var directionDistance = _glMatrix.vec3.dot(v1, this.direction);

			if (directionDistance < 0) {
				return _glMatrix.vec3.squaredDistance(this.origin, mPoint);
			}

			_glMatrix.vec3.copy(v1, this.direction);
			_glMatrix.vec3.scale(v1, v1, directionDistance);
			_glMatrix.vec3.add(v1, v1, this.origin);
			return _glMatrix.vec3.squaredDistance(v1, mPoint);
		}
	}, {
		key: 'intersectsSphere',
		value: function intersectsSphere(mCenter, mRadius) {
			return this.distanceToPoint(mCenter) <= mRadius;
		}
	}, {
		key: 'intersectSphere',
		value: function intersectSphere(mCenter, mRadius) {
			var v1 = _glMatrix.vec3.create();
			_glMatrix.vec3.sub(v1, mCenter, this.origin);
			var tca = _glMatrix.vec3.dot(v1, this.direction);
			var d2 = _glMatrix.vec3.dot(v1, v1) - tca * tca;
			var radius2 = mRadius * mRadius;

			if (d2 > radius2) return null;

			var thc = Math.sqrt(radius2 - d2);

			var t0 = tca - thc;

			var t1 = tca + thc;

			if (t0 < 0 && t1 < 0) return null;

			if (t0 < 0) return this.at(t1);

			return this.at(t0);
		}
	}, {
		key: 'distanceToPlane',
		value: function distanceToPlane(mPlaneCenter, mNormal) {
			var denominator = _glMatrix.vec3.dot(mNormal, this.direction);

			if (denominator === 0) {}
		}
	}, {
		key: 'intersectTriangle',
		value: function intersectTriangle(mPA, mPB, mPC) {
			var backfaceCulling = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

			_glMatrix.vec3.copy(a, mPA);
			_glMatrix.vec3.copy(b, mPB);
			_glMatrix.vec3.copy(c, mPC);

			// const edge1 = vec3.create();
			// const edge2 = vec3.create();
			// const normal = vec3.create();
			// const diff = vec3.create();

			_glMatrix.vec3.sub(edge1, b, a);
			_glMatrix.vec3.sub(edge2, c, a);
			_glMatrix.vec3.cross(normal, edge1, edge2);

			var DdN = _glMatrix.vec3.dot(this.direction, normal);
			var sign = void 0;

			if (DdN > 0) {
				if (backfaceCulling) {
					return null;
				}
				sign = 1;
			} else if (DdN < 0) {
				sign = -1;
				DdN = -DdN;
			} else {
				return null;
			}

			_glMatrix.vec3.sub(diff, this.origin, a);

			_glMatrix.vec3.cross(edge2, diff, edge2);
			var DdQxE2 = sign * _glMatrix.vec3.dot(this.direction, edge2);
			if (DdQxE2 < 0) {
				return null;
			}

			_glMatrix.vec3.cross(edge1, edge1, diff);
			var DdE1xQ = sign * _glMatrix.vec3.dot(this.direction, edge1);
			if (DdE1xQ < 0) {
				return null;
			}

			if (DdQxE2 + DdE1xQ > DdN) {
				return null;
			}

			var Qdn = -sign * _glMatrix.vec3.dot(diff, normal);
			if (Qdn < 0) {
				return null;
			}

			return this.at(Qdn / DdN);
		}
	}]);

	return Ray;
}();

exports.default = Ray;
module.exports = exports['default'];
//# sourceMappingURL=Ray.js.map