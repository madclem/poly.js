'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // hugely rewritten based on Wen's FrameBuffer class https://github.com/yiwenl/Alfrid/blob/master/src/alfrid/FrameBuffer.js

var _GLExtensions = require('./GLExtensions');

var _GLExtensions2 = _interopRequireDefault(_GLExtensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrameBuffer = function () {
    function FrameBuffer() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 512;
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 512;
        var multiTargets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, FrameBuffer);

        this.gl = POLY.gl;
        var gl = this.gl;

        this.width = width;
        this.height = height;
        this._multiTargets = multiTargets;

        // choose type for the texture
        // ext.getExtension('WEBGL_draw_buffers');
        _GLExtensions2.default.getExtension("OES_texture_float_linear");
        var extHalfFloat = _GLExtensions2.default.getExtension('OES_texture_half_float');

        var type = gl.UNSIGNED_BYTE;
        if (_GLExtensions2.default.checkExtension('OES_texture_float')) {
            type = gl.FLOAT;
        } else if (extHalfFloat) {
            type = extHalfFloat.HALF_FLOAT_OES;
        }

        this.depthTexture = null;
        this.textures = [];

        this._initTextures(type);

        // create frame buffer and bind it
        this.framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);

        if (POLY.webgl2) {
            var buffers = [];
            for (var i = 0; i < this.textures.length; i++) {
                gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, this.textures[i]._texture, 0);
                buffers.push(gl['COLOR_ATTACHMENT' + i]);
            }

            gl.drawBuffers(buffers);
            gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture._texture, 0);
        } else {
            if (this._multiTargets) {
                var extDrawBuffer = _GLExtensions2.default.getExtension('WEBGL_draw_buffers');
                for (var _i = 0; _i < this.textures.length; _i++) {
                    gl.framebufferTexture2D(gl.FRAMEBUFFER, extDrawBuffer['COLOR_ATTACHMENT' + _i + '_WEBGL'], gl.TEXTURE_2D, this.textures[_i]._texture, 0);
                }

                // console.log(extDrawBuffer.COLOR_ATTACHMENT0_WEBGL, gl.COLOR_ATTACHMENT0);
                // gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.textures[0]._texture, 0);
                // gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, this.textures[1]._texture, 0);
                // gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT2, gl.TEXTURE_2D, this.textures[2]._texture, 0);
                // gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT3, gl.TEXTURE_2D, this.textures[3]._texture, 0);
                // gl.framebufferTexture2D(gl.FRAMEBUFFER, extDrawBuffer.COLOR_ATTACHMENT0_WEBGL, gl.TEXTURE_2D, this.textures[0]._texture, 0);
                // gl.framebufferTexture2D(gl.FRAMEBUFFER, extDrawBuffer.COLOR_ATTACHMENT1_WEBGL, gl.TEXTURE_2D, this.textures[1]._texture, 0);
                // gl.framebufferTexture2D(gl.FRAMEBUFFER, extDrawBuffer.COLOR_ATTACHMENT2_WEBGL, gl.TEXTURE_2D, this.textures[2]._texture, 0);
                // gl.framebufferTexture2D(gl.FRAMEBUFFER, extDrawBuffer.COLOR_ATTACHMENT3_WEBGL, gl.TEXTURE_2D, this.textures[3]._texture, 0);


                if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
                    console.log('error');
                }

                extDrawBuffer.drawBuffersWEBGL([extDrawBuffer.COLOR_ATTACHMENT0_WEBGL, // gl_FragData[0]
                extDrawBuffer.COLOR_ATTACHMENT1_WEBGL, // gl_FragData[1]
                extDrawBuffer.COLOR_ATTACHMENT2_WEBGL, // gl_FragData[2]
                extDrawBuffer.COLOR_ATTACHMENT3_WEBGL // gl_FragData[3]
                ]);

                if (this.depthTexture) {
                    // gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.glDepthTexture.texture, 0);
                }
            } else {
                // create a renderbuffer (buffer associated to a frame buffer object), this one for the depth!
                var renderBufferDepth = gl.createRenderbuffer();
                gl.bindRenderbuffer(gl.RENDERBUFFER, renderBufferDepth);
                gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);

                // attach everything to the current frame buffer
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.textures[0]._texture, 0);
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBufferDepth);
            }
        }

        this.clean();
    }

    _createClass(FrameBuffer, [{
        key: '_initTextures',
        value: function _initTextures(type) {
            var gl = this.gl;

            var numTextures = this._multiTargets ? 4 : 1;

            for (var i = 0; i < numTextures; i++) {
                var texture = this._createTexture(gl.RGBA, gl.RGBA, type);
                this.textures.push(texture);
            }

            this.gltexture = this.textures[0]; // only to avoid previous versions to break

            if (POLY.webgl2) {
                this.depthTexture = this._createTexture(gl.DEPTH_COMPONENT24, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT);
            }
            // else
            // {
            // this.depthTexture = this._createTexture(gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT);
            // }
        }
    }, {
        key: '_createTexture',
        value: function _createTexture(internalFormat, format, type, data) {
            var gl = this.gl;

            internalFormat = internalFormat || gl.RGBA;
            format = format || gl.RGBA;
            type = type || gl.UNSIGNED_BYTE;
            data = data || null;

            var texture = gl.createTexture();
            var glt = new POLY.Texture(texture, true);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            // BEFORE gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, type, null);
            // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, this.width, this.height, 0, format, type, data);
            gl.bindTexture(gl.TEXTURE_2D, null);

            return glt;
        }
    }, {
        key: 'getTexture',
        value: function getTexture(index) {
            return this.textures[index];
        }
    }, {
        key: 'bind',
        value: function bind() {
            var gl = this.gl;
            gl.viewport(0, 0, this.width, this.height);
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
    }, {
        key: 'unbind',
        value: function unbind() {
            var gl = this.gl;

            // gl.bindTexture(gl.TEXTURE_2D, this.gltexture._texture);
            // gl.generateMipmap(gl.TEXTURE_2D);
            // gl.bindTexture(gl.TEXTURE_2D, null);

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        }
    }, {
        key: 'clean',
        value: function clean() {
            var gl = this.gl;
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.bind();
            this.gl.clear(0, 0, 0, 0);
            this.unbind();
        }
    }]);

    return FrameBuffer;
}();

exports.default = FrameBuffer;
module.exports = exports['default'];
//# sourceMappingURL=FrameBuffer.js.map