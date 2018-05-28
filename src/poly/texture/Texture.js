

export default class Texture
{
	constructor(image, isTexture)
	{
		this.gl = POLY.gl;
		let gl = this.gl;

		this._loaded = false;
		if(isTexture)
		{
			this._texture = image;
			this._loaded = true;
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
		this._loaded = true;
		let gl = this.gl;

		gl.bindTexture(gl.TEXTURE_2D, this._texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  		if(POLY.utils.isPowerOfTwo(image.width) && POLY.utils.isPowerOfTwo(image.height))
  		{
  			gl.generateMipmap(gl.TEXTURE_2D);
  		}

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.bindTexture(gl.TEXTURE_2D, null);
	}

	updateTexture(image)
	{
		let gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	bind(index = 0)
	{
		let gl = this.gl;
		gl.activeTexture(gl.TEXTURE0 + index);
    	gl.bindTexture(gl.TEXTURE_2D, this._texture);
	}
}
