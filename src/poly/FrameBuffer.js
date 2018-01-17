export default class FrameBuffer
{
    constructor(width = 512, height = 512, texture)
    {

        this.gl = POLY.gl;
        let gl = this.gl;

        this.width = width;
        this.height = height;

        /*
         CREATE FRAME BUFFER AND SET UP ALL OF ITS MEMORY
        */

        // create frame buffer and bind it
        this.framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);

        // create an empty texture which can store the colour values
        this.texture = gl.createTexture();
        this.gltexture = new POLY.Texture(this.texture, true);

        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        // create a renderbuffer (buffer associated to a frame buffer object), this one for the depth!
        var renderBufferDepth = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, renderBufferDepth);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);

        // attach everything to the current frame buffer
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBufferDepth);


        this.clean();
    }

    bind(w, h)
    {
        this.width = w || this.width;
        this.height = h || this.height;

        let gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.viewport(0, 0, this.width, this.height);
    }

    unbind()
    {
        let gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

    clean()
    {
        let gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
}
