'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _UniformGroup = require('./UniformGroup');

var _UniformGroup2 = _interopRequireDefault(_UniformGroup);

var _basic = require('./shaders/basic.vert');

var _basic2 = _interopRequireDefault(_basic);

var _basic3 = require('./shaders/basic.frag');

var _basic4 = _interopRequireDefault(_basic3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Program = function () {
    function Program(vertShader, fragShader) {
        var uniforms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, Program);

        vertShader = vertShader || _basic2.default;
        fragShader = fragShader || _basic4.default;

        var gl = POLY.gl; // not sure that's great... :p
        this.gl = gl;
        // cache the locations of attributes and uniforms
        this.cacheAttributesLocation = {};
        this.cacheUniformsLocation = {};

        // create the program itself
        this.program = gl.createProgram();

        var vertS = this._createShader(vertShader, true);
        var fragS = this._createShader(fragShader, false);
        this._attachShaders(vertS, fragS);

        gl.linkProgram(this.program);

        // check for errors
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            throw "Couldn't initialise program";
        }

        gl.useProgram(this.program);

        this._checkIfBasicMatrices(uniforms);

        this.uniforms = new _UniformGroup2.default(uniforms, this);
        for (var uniform in uniforms) {
            this.addUniformLocation(uniform);
            var v = uniforms[uniform].value;
            this.uniforms[uniform] = v;
        }

        this.bind();
    }

    _createClass(Program, [{
        key: 'bind',
        value: function bind() {
            this.gl.useProgram(this.program);
        }
    }, {
        key: 'addUniformLocation',
        value: function addUniformLocation(name) {
            this.cacheUniformsLocation[name] = this.gl.getUniformLocation(this.program, name);
        }
    }, {
        key: 'getUniformLocation',
        value: function getUniformLocation(name) {
            if (this.cacheUniformsLocation[name] !== undefined) {
                return this.cacheUniformsLocation[name];
            } else {
                this.addUniformLocation(name);

                return this.getUniformLocation(name);
            }
        }
    }, {
        key: '_checkIfBasicMatrices',
        value: function _checkIfBasicMatrices(uniforms) {
            var matrices = ['projectionMatrix', 'modelMatrix', 'viewMatrix'];

            for (var i = 0; i < matrices.length; i++) {
                if (!uniforms[matrices[i]]) {
                    uniforms[matrices[i]] = {
                        value: _glMatrix.mat4.create(),
                        type: 'mat4'
                    };
                }
            }
        }

        // create a this.uniforms property
        // useful for the setter, we can just update the uniform when it gets changed

    }, {
        key: '_createGetterSetterUniforms',
        value: function _createGetterSetterUniforms(uniforms) {
            var gl = this.gl;
            var program = this.program;
            var _this = this;

            var self = this;

            this.uniforms = uniforms;

            for (var p in self.uniforms) {

                self.uniforms[p] = uniforms[p];

                (function (field_name) {
                    Object.defineProperty(self, field_name, {
                        get: function get() {
                            console.log('GET', field_name);
                            return self.uniforms[field_name];
                        },
                        set: function set(new_value) {
                            console.log('SET', field_name, new_value);
                            self.uniforms[field_name].value = new_value;
                        }
                    });
                })(p);
            }

            // for (var name in this.uniforms) {
            //     Object.defineProperty(_this.uniforms, _name, {
            //         get: function()
            //         {
            //             // if(uniforms[name])
            //             // {
            //             // console.log(name);
            //                 return _this.uniforms[_name];
            //             // }
            //             // else {
            //             //     console.log("Getting non-existant property '" + name + "'");
            //             //
            //             //     return undefined;
            //             // }
            //         },
            //         set: function(value)
            //         {
            //             // if(uniforms[name])
            //             // {
            //                 // /!\ TODO check Wen's GLShader.uniform() when it's not a number, seems more optimised
            //                 // uniforms[name].value = value;
            //                 // let type = uniforms[name].type;
            //                 // let glFunction = POLY.CONST.uniformTypes[type];
            //                 //
            //                 // if(type.indexOf('mat') === -1)
            //                 // {
            //                 //     if(type === 'texture')
            //                 //     {
            //                 //         gl[glFunction](_this.getUniformLocation(name), value, uniforms[name].index);
            //                 //     }
            //                 //     else
            //                 //     {
            //                 //         gl[glFunction](_this.getUniformLocation(name), value);
            //                 //     }
            //                 // }
            //                 // else
            //                 // {
            //                 //     gl[glFunction](_this.getUniformLocation(name), false, value);
            //                 // }
            //
            //                 return true;
            //             // }
            //         },
            //     });
            // }

            // this.uniforms = new Proxy(uniforms, {
            //     get: function(target, name)
            //     {
            //         if (!(name in target))
            //         {
            //             console.log("Getting non-existant property '" + name + "'");
            //             return undefined;
            //         }
            //
            //         return target[name].value;
            //     },
            //     set: function(target, name, value)
            //     {
            //         if (!(name in target))
            //         {
            //             console.log("Setting non-existant property '" + name + "', initial value: " + value);
            //
            //             return false;
            //         }
            //
            //         // /!\ TODO check Wen's GLShader.uniform() when it's not a number, seems more optimised
            //         target[name].value = value;
            //         let type = target[name].type;
            //         let glFunction = POLY.CONST.uniformTypes[type];
            //
            //
            //         if(type.indexOf('mat') === -1)
            //         {
            //             if(type === 'texture')
            //             {
            //                 gl[glFunction](_this.getUniformLocation(name), value, target[name].index);
            //             }
            //             else
            //             {
            //                 gl[glFunction](_this.getUniformLocation(name), value);
            //             }
            //         }
            //         else
            //         {
            //             gl[glFunction](_this.getUniformLocation(name), false, value);
            //         }
            //
            //         return true;
            //     }
            // });
        }
    }, {
        key: 'addAttributeLocation',
        value: function addAttributeLocation(name) {

            //     if(shaderProgram.cacheAttribLoc === undefined) {	shaderProgram.cacheAttribLoc = {};	}
            // if(shaderProgram.cacheAttribLoc[name] === undefined) {
            // 	shaderProgram.cacheAttribLoc[name] = gl.getAttribLocation(shaderProgram, name);
            // }
            //
            // return shaderProgram.cacheAttribLoc[name];
            // console.log(this.cacheAttributesLocation[name], name);

            if (this.cacheAttributesLocation[name] === undefined) {
                this.cacheAttributesLocation[name] = this.gl.getAttribLocation(this.program, name);
            }
        }
    }, {
        key: 'getAttributeLocation',
        value: function getAttributeLocation(name) {
            if (this.cacheAttributesLocation[name] !== undefined) {
                return this.cacheAttributesLocation[name];
            } else {
                this.addAttributeLocation(name);

                return this.getAttributeLocation(name);
            }
        }
    }, {
        key: '_attachShaders',
        value: function _attachShaders(vert, frag) {
            this.gl.attachShader(this.program, vert);
            this.gl.attachShader(this.program, frag);
        }
    }, {
        key: '_createShader',
        value: function _createShader(src, isVertex) {
            var gl = this.gl;
            var shader = void 0;
            if (isVertex) {
                shader = gl.createShader(gl.VERTEX_SHADER);
            } else {
                shader = gl.createShader(gl.FRAGMENT_SHADER);
            }

            this.gl.shaderSource(shader, src);
            this.gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw "Couldn't initialise shader, ", gl.getShaderInfoLog(shader);
                return null;
            }

            return shader;
        }
    }]);

    return Program;
}();

exports.default = Program;
module.exports = exports['default'];
//# sourceMappingURL=Program.js.map