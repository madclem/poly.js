export default class DataTexture
{
	constructor(data, width = 256, height = 256, format)
	{
		this.gl = POLY.gl;
		let gl = this.gl;

		format = format || gl.RGBA;

		var ext = gl.getExtension('OES_texture_float');

		this._texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this._texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, gl.FLOAT, data);
		 
		if(POLY.utils.isPowerOfTwo(width) && POLY.utils.isPowerOfTwo(height))
  		{
  			gl.generateMipmap(gl.TEXTURE_2D);
  		}

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
 		gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT ) ;
		 gl.texParameteri ( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT ) ;

	}

	bind(index = 0)
	{
		let gl = this.gl;
		gl.activeTexture(gl.TEXTURE0 + index);
    	gl.bindTexture(gl.TEXTURE_2D, this._texture);
	}
}