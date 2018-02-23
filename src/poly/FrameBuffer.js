// hugely rewritten based on Wen's FrameBuffer class https://github.com/yiwenl/Alfrid/blob/master/src/alfrid/FrameBuffer.js

import ext from './GLExtensions';

export default class FrameBuffer
{
    constructor(width = 512, height = 512, multiTargets = false)
    {

        this.gl = POLY.gl;
        let gl = this.gl;

        this.width = width;
        this.height = height;
        this._multiTargets = multiTargets;

        // choose type for the texture
        // ext.getExtension('WEBGL_draw_buffers');
        ext.getExtension("OES_texture_float_linear");
        let extHalfFloat = ext.getExtension('OES_texture_half_float');

        let type = gl.UNSIGNED_BYTE;
        if (ext.checkExtension('OES_texture_float'))
        {
            type = gl.FLOAT;
        }
        else if(extHalfFloat)
        {
            type = extHalfFloat.HALF_FLOAT_OES;
        }

        this.depthTexture = null;
        this.textures = [];

        this._initTextures(type);

        // create frame buffer and bind it
        this.framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);

        if(POLY.webgl2)
        {
			const buffers = [];
			for (let i = 0; i < this.textures.length; i++)
            {
				gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, this.textures[i]._texture, 0);
				buffers.push(gl[`COLOR_ATTACHMENT${i}`]);
			}

			gl.drawBuffers(buffers);
			gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture._texture, 0);

		}
        else
        {
            if(this._multiTargets)
            {
                const extDrawBuffer = ext.getExtension('WEBGL_draw_buffers');
    			for (let i = 0; i < this.textures.length; i++)
                {
    				gl.framebufferTexture2D(gl.FRAMEBUFFER, extDrawBuffer[`COLOR_ATTACHMENT${i}_WEBGL`], gl.TEXTURE_2D, this.textures[i]._texture, 0);
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

				extDrawBuffer.drawBuffersWEBGL([
					extDrawBuffer.COLOR_ATTACHMENT0_WEBGL, // gl_FragData[0]
					extDrawBuffer.COLOR_ATTACHMENT1_WEBGL, // gl_FragData[1]
					extDrawBuffer.COLOR_ATTACHMENT2_WEBGL, // gl_FragData[2]
					extDrawBuffer.COLOR_ATTACHMENT3_WEBGL  // gl_FragData[3]
				]);

                if(this.depthTexture)
                {
                    // gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.glDepthTexture.texture, 0);
                }
			}
            else
            {
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

    _initTextures(type)
    {
        let gl = this.gl;

        const numTextures = this._multiTargets ? 4 : 1;

		for (let i = 0; i < numTextures; i++)
        {
			const texture = this._createTexture(gl.RGBA, gl.RGBA, type);
			this.textures.push(texture);
		}

        this.gltexture = this.textures[0]; // only to avoid previous versions to break

		if(POLY.webgl2)
        {
			this.depthTexture = this._createTexture(gl.DEPTH_COMPONENT24, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT);
		}
        // else
        // {
			// this.depthTexture = this._createTexture(gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT);
		// }
    }

    _createTexture(internalFormat, format, type, data)
    {
        let gl = this.gl;

        internalFormat = internalFormat || gl.RGBA;
        format = format || gl.RGBA;
        type = type || gl.UNSIGNED_BYTE;
        data = data || null;




		const texture = gl.createTexture();
		const glt = new POLY.Texture(texture, true);
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

    getTexture(index)
    {
        return this.textures[index];
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

        // gl.bindTexture(gl.TEXTURE_2D, this.gltexture._texture);
        // gl.generateMipmap(gl.TEXTURE_2D);
        // gl.bindTexture(gl.TEXTURE_2D, null);

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
