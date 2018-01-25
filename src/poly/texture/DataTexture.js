import ext from '../GLExtensions';

export default class DataTexture
{
	constructor(data, width = 256, height = 256, format)
	{
		this.gl = POLY.gl;
		let gl = this.gl;

		format = format || gl.RGBA;

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

		console.log(type, gl.FLOAT);


		this._texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this._texture);
		const alignment = 1;
		gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);

		gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, type, data);


		if(POLY.utils.isPowerOfTwo(width) && POLY.utils.isPowerOfTwo(height))
  		{
  		}

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
 		// gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT ) ;
		 // gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT ) ;

	}

	bind(index = 0)
	{
		let gl = this.gl;
		gl.activeTexture(gl.TEXTURE0 + index);
    	gl.bindTexture(gl.TEXTURE_2D, this._texture);
	}
}
