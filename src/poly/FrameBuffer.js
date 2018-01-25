import ext from './GLExtensions';

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

        var floatTextures = ext.getExtension('OES_texture_float');

        if (!ext.getExtension("OES_texture_float")){
          throw new Error( "float textures not supported" );
        }

        var halfFloat = ext.getExtension("OES_texture_half_float");
        let type = gl.UNSIGNED_BYTE;
        const extHalfFloat = ext.getExtension('OES_texture_half_float');
        ext.getExtension("OES_texture_float_linear");

        if (ext.checkExtension('OES_texture_float'))
        {
            type = gl.FLOAT;
        }
        else if(extHalfFloat) {
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
        // gl.bindRenderbuffer(gl.RENDERBUFFER, renderBufferDepth);
        // gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);

        // attach everything to the current frame buffer
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
        // gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBufferDepth);


        this.clean();
    }

    bind()
    {
        let gl = this.gl;
        gl.viewport(0, 0, this.width, this.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    unbind()
    {
        let gl = this.gl;

        gl.bindTexture(gl.TEXTURE_2D, this.gltexture._texture);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);

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

    clear()
    {
        this.bind();
	    this.gl.clear(0,0,0,0);
		this.unbind();
    }
}
