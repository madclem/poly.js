'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UniformGroup = function UniformGroup(data, program) {
    _classCallCheck(this, UniformGroup);

    for (var p in data) {
        this[p] = data[p];
    }

    this.__data = {};

    var self = this;

    for (var p in self) {
        if (p === '__data') {
            return;
        }

        self.__data[p] = self[p];

        (function (name) {
            Object.defineProperty(self, name, {
                get: function get() {
                    return self.__data[name].value;
                },
                set: function set(value) {
                    self.__data[name].value = value;

                    var type = self.__data[name].type;
                    var glFunction = POLY.CONST.uniformTypes[type];

                    var gl = program.gl;
                    if (type.indexOf('mat') === -1) {
                        if (type === 'texture') {
                            gl[glFunction](program.getUniformLocation(name), value, self.__data[name].index);
                        } else {
                            gl[glFunction](program.getUniformLocation(name), value);
                        }
                    } else {
                        gl[glFunction](program.getUniformLocation(name), false, value);
                    }
                }
            });
        })(p);
    }
};

exports.default = UniformGroup;
module.exports = exports['default'];
//# sourceMappingURL=UniformGroup.js.map