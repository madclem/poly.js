

export default class Texture
{
	constructor(image, isTexture)
	{
		this.gl = POLY.gl;
		let gl = this.gl;

		if(isTexture)
		{
			this._texture = image;
		}
		else
		{
			this._texture = gl.createTexture();

			
			this.image = new Image();
			this.image.src = image;

			this.image.addEventListener('load', this.onImageLoaded.bind(this, this.image))
		}

	}

	onImageLoaded(image)
	{
		let gl = this.gl;

		var ext = gl.getExtension('OES_texture_float');
		gl.bindTexture(gl.TEXTURE_2D, this._texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.FLOAT, image);

  		if(POLY.utils.isPowerOfTwo(image.width) && POLY.utils.isPowerOfTwo(image.height))
  		{
  			gl.generateMipmap(gl.TEXTURE_2D);
  		}
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);
	}

	bind(index = 0)
	{
		let gl = this.gl;
		gl.activeTexture(gl.TEXTURE0 + index);
    	gl.bindTexture(gl.TEXTURE_2D, this._texture);
	}
}
