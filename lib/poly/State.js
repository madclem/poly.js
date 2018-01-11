'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// inspired (copied) by (from) https://github.com/pixijs/pixi.js/blob/dev/src/core/renderers/webgl/WebGLState.js
var BLEND = 0;
var DEPTH_TEST = 1;
var FRONT_FACE = 2;
var CULL_FACE = 3;
var BLEND_FUNC = 4;

var State = function () {
    function State(gl) {
        _classCallCheck(this, State);

        this.gl = gl;
        this.activeState = new Uint8Array(16);
        this.defaultState = new Uint8Array(16);

        this.data = 0;
        this.blendMode = 0;

        this.blendModes = {
            source: {
                alpha: this.gl.SRC_ALPHA
            },
            dest: {
                one: this.gl.ONE
            }
        };
    }

    _createClass(State, [{
        key: 'setState',
        value: function setState(state) {
            this.setBlend(state.activeState[BLEND]);
            this.setDepthTest(state.activeState[DEPTH_TEST]);
            this.setFrontFace(state.activeState[FRONT_FACE]);
            this.setCullFace(state.activeState[CULL_FACE]);
            this.setBlendMode(state.activeState[BLEND_FUNC]);
        }
    }, {
        key: 'setBlend',
        value: function setBlend(value) {
            value = value ? 1 : 0;

            if (this.activeState[BLEND] === value) {
                return;
            }
            console.log("BLEND");

            this.activeState[BLEND] = value;
            this.gl[value ? 'enable' : 'disable'](this.gl.BLEND);
            // this.setDepthTest(!value); // no need to do that because ew blend before we depth test (right?)
        }
    }, {
        key: 'setBlendMode',
        value: function setBlendMode(value) {
            var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "alpha";
            var dest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "one";

            if (value === this.activeState[BLEND_FUNC]) {
                return;
            }

            console.log('BLENDMODE');
            this.activeState[BLEND_FUNC] = value;

            this.gl.blendFunc(this.blendModes.source[source], this.blendModes.dest[dest]);
            //
            // const mode = this.blendModes[value];
            //
            // if (mode.length === 2)
            // {
            //     this.gl.blendFunc(mode[0], mode[1]);
            // }
            // else
            // {
            //     this.gl.blendFuncSeparate(mode[0], mode[1], mode[2], mode[3]);
            // }
        }
    }, {
        key: 'setDepthTest',
        value: function setDepthTest(value) {
            value = value ? 1 : 0;
            if (this.activeState[DEPTH_TEST] === value) {
                return;
            }
            console.log("DEPTHTEST");

            this.activeState[DEPTH_TEST] = value;
            this.gl[value ? 'enable' : 'disable'](this.gl.DEPTH_TEST);
        }
    }, {
        key: 'setCullFace',
        value: function setCullFace(value) {
            value = value ? 1 : 0;

            if (this.activeState[CULL_FACE] === value) {
                return;
            }

            this.activeState[CULL_FACE] = value;
            this.gl[value ? 'enable' : 'disable'](this.gl.CULL_FACE);
        }
    }, {
        key: 'setFrontFace',
        value: function setFrontFace(value) {
            value = value ? 1 : 0;

            if (this.activeState[FRONT_FACE] === value) {
                return;
            }

            this.activeState[FRONT_FACE] = value;
            this.gl.frontFace(this.gl[value ? 'CW' : 'CCW']);
        }
    }, {
        key: 'blend',
        get: function get() {
            return this.activeState[BLEND];
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
            this.activeState[BLEND] = value;
        }
    }, {
        key: 'culling',
        get: function get() {
            return this.activeState[CULLING];
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
            this.activeState[CULLING] = value;
        }
    }, {
        key: 'depthTest',
        get: function get() {
            return this.activeState[DEPTH_TEST];
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
            this.activeState[DEPTH_TEST] = value;
        }
    }, {
        key: 'clockwiseFrontFace',
        get: function get() {
            return this.activeState[FRONT_FACE];
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
            this.activeState[FRONT_FACE] = value;
        }
    }, {
        key: 'blendMode',
        get: function get() {
            return this.activeState[BLEND_FUNC];
            // return this._blendMode;
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
            this.activeState[BLEND_FUNC] = value;
            // 17 is NO BLEND
            // this.blend = (value !== 17);
            // this._blendMode = value;
        }
    }]);

    return State;
}();

exports.default = State;
module.exports = exports['default'];
//# sourceMappingURL=State.js.map