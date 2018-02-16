'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GLExtensions = require('./GLExtensions');

var _GLExtensions2 = _interopRequireDefault(_GLExtensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrameBuffer = function () {
    function FrameBuffer() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 512;
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 512;
        var texture = arguments[2];

        _classCallCheck(this, FrameBuffer);

        this.gl = POLY.gl;
        var gl = this.gl;

        this.width = width;
        this.height = height;

        /*
         CREATE FRAME BUFFER AND SET UP ALL OF ITS MEMORY
        */

        var floatTextures = _GLExtensions2.default.getExtension('OES_texture_float');

        if (!_GLExtensions2.default.getExtension("OES_texture_float")) {
            throw new Error("float textures not supported");
        }

        var halfFloat = _GLExtensions2.default.getExtension("OES_texture_half_float");
        var type = gl.UNSIGNED_BYTE;
        var extHalfFloat = _GLExtensions2.default.getExtension('OES_texture_half_float');
        _GLExtensions2.default.getExtension("OES_texture_float_linear");

        if (_GLExtensions2.default.checkExtension('OES_texture_float')) {
            type = gl.FLOAT;
        } else if (extHalfFloat) {
            type = extHalfFloat.HALF_FLOAT_OES;
        }

        // if (mcgl.GL.isMobile && type === gl.FLOAT && extHalfFloat) {
        //     type = extHalfFloat.HALF_FLOAT_OES;
        // }

        this.textures = [];
        // create frame buffer and bind it
        this.framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);

        // create an empty texture which can store the colour values

        this.texture = gl.createTexture();
        this.gltexture = new POLY.Texture(this.texture, true);
        this.textures.push(this.gltexture);

        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, type, null);

        // create a renderbuffer (buffer associated to a frame buffer object), this one for the depth!
        var renderBufferDepth = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, renderBufferDepth);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);

        // attach everything to the current frame buffer
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBufferDepth);

        this.clean();
    }

    _createClass(FrameBuffer, [{
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

            gl.bindTexture(gl.TEXTURE_2D, this.gltexture._texture);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.bindTexture(gl.TEXTURE_2D, null);

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