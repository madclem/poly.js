'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = new (function () {
	function Loop() {
		_classCallCheck(this, Loop);

		this._loops = [];
		this._idLoop = 1;

		this._active = false;
	}

	_createClass(Loop, [{
		key: 'add',
		value: function add(func, scope) {
			var id = this._idLoop;
			this._loops.push({
				func: func,
				id: id,
				scope: scope
			});

			if (!this._active) {
				window.requestAnimationFrame(this._update.bind(this));
				this.start();
			}

			this._idLoop++;

			return id;
		}
	}, {
		key: 'remove',
		value: function remove(id) {
			console.log('try to remove');
			for (var i = 0; i < this._loops.length; i++) {
				if (this._loops[i].id === id) {
					console.log('remove here');
					this._loops.splice(i, 1);
					break;
				}
			}
		}
	}, {
		key: 'clear',
		value: function clear() {
			this._loops = [];
			this.stop();
		}
	}, {
		key: 'start',
		value: function start() {
			this._active = true;
		}
	}, {
		key: 'stop',
		value: function stop() {
			this._active = false;
		}
	}, {
		key: '_update',
		value: function _update() {
			if (this._active) {
				window.requestAnimationFrame(this._update.bind(this));

				if (this._loops.length > 0) {
					for (var i = 0; i < this._loops.length; i++) {
						this._loops[i].func(this._loops[i]);
					}
				} else {
					this.stop();
				}
			}
		}
	}]);

	return Loop;
}())();
module.exports = exports['default'];
//# sourceMappingURL=Loop.js.map