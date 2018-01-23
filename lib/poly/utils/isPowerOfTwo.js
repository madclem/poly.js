"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var isPowerOfTwo = function isPowerOfTwo(value) {

	if (!(value & value - 1)) {
		return true;
	}

	return false;
	// return !!(value & (value - 1) == 0);
};

exports.default = isPowerOfTwo;
module.exports = exports['default'];
//# sourceMappingURL=isPowerOfTwo.js.map