"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Program = function () {
    function Program(vertShader, fragShader, uniforms) {
        _classCallCheck(this, Program);

        var gl = POLY.gl; // not sure that's great... :p
        this.gl = gl;
        console.log(uniforms);
        // cache the locations of attributes and uniforms
        this.cacheAttributesLocation = {};
        this.cacheUniformsLocation = {};

        // create the program itself
        this.program = gl.createProgram();

        var vert = this._createShader(vertShader, true);
        var frag = this._createShader(fragShader, false);
        this._attachShaders(vert, frag);

        gl.linkProgram(this.program);

        // check for errors
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            throw "Couldn't initialise program";
        }

        gl.useProgram(this.program);

        this._createGetterSetterUniforms(uniforms);
        for (var uniform in uniforms) {
            this.addUniformLocation(uniform);
            // uniform = this.uniforms[uniform];
            // this.uniforms[uniform] = uniforms[uniform]
            var v = uniforms[uniform].value;
            this.uniforms[uniform] = v;
        }
    }

    _createClass(Program, [{
        key: "addUniformLocation",
        value: function addUniformLocation(name) {
            this.cacheUniformsLocation[name] = this.gl.getUniformLocation(this.program, name);
        }
    }, {
        key: "getUniformLocation",
        value: function getUniformLocation(name) {
            if (this.cacheUniformsLocation[name] !== undefined) {
                return this.cacheUniformsLocation[name];
            } else {
                this.addUniformLocation(name);

                return this.getUniformLocation(name);
            }
        }

        // create a this.uniforms property
        // useful for the setter, we can just update the uniform when it gets changed

    }, {
        key: "_createGetterSetterUniforms",
        value: function _createGetterSetterUniforms(uniforms) {
            var gl = this.gl;
            var program = this.program;
            var _this = this;

            this.uniforms = new Proxy(uniforms, {
                get: function get(target, name) {
                    if (!(name in target)) {
                        console.log("Getting non-existant property '" + name + "'");
                        return undefined;
                    }

                    return target[name].value;
                },
                set: function set(target, name, value) {
                    if (!(name in target)) {
                        console.log("Setting non-existant property '" + name + "', initial value: " + value);

                        return false;
                    }

                    // /!\ TODO check Wen's GLShader.uniform() when it's not a number, seems more optimised
                    target[name].value = value;
                    var type = target[name].type;
                    var glFunction = POLY.CONST.uniformTypes[type];

                    if (type.indexOf('mat') === -1) {
                        gl[glFunction](_this.getUniformLocation(name), value);
                    } else {
                        gl[glFunction](_this.getUniformLocation(name), false, value);
                    }

                    return true;
                }
            });
        }
    }, {
        key: "addAttributeLocation",
        value: function addAttributeLocation(name) {
            this.cacheAttributesLocation[name] = this.gl.getAttribLocation(this.program, name);
            this.gl.enableVertexAttribArray(this.cacheAttributesLocation[name]); // NEVER FORGET THAT LINE (I did...)
        }
    }, {
        key: "getAttributeLocation",
        value: function getAttributeLocation(name) {
            if (this.cacheAttributesLocation[name] !== undefined) {
                return this.cacheAttributesLocation[name];
            } else {
                this.addAttributeLocation(name);

                return this.getAttributeLocation(name);
            }
        }
    }, {
        key: "_attachShaders",
        value: function _attachShaders(vert, frag) {
            this.gl.attachShader(this.program, vert);
            this.gl.attachShader(this.program, frag);
        }
    }, {
        key: "_createShader",
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