'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = getAndApplyExtension;
// https://github.com/yiwenl/Alfrid/blob/master/src/alfrid/utils/getAndApplyExtension.js

function getAndApplyExtension(gl, name) {
	var ext = gl.getExtension(name);
	if (!ext) {
		return false;
	}

	var suffix = name.split('_')[0];
	var suffixRE = new RegExp(suffix + '$');

	for (var key in ext) {
		var val = ext[key];
		if (typeof val === 'function') {
			var unsuffixedKey = key.replace(suffixRE, '');
			if (key.substring) {
				gl[unsuffixedKey] = ext[key].bind(ext);
			}
		}
	}

	return true;
}
module.exports = exports['default'];
//# sourceMappingURL=getAndApplyExtension.js.map