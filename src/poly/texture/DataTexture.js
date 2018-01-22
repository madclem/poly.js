export default class DataTexture
{
	constructor(data)
	{
		this.gl = POLY.gl;
		let gl = this.gl;

		this._texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this._texture);
		 
		// Fill the texture with a 1x1 blue pixel.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
		              new Uint8Array([0, 0, 255, 255]));
		 
		// fill texture with 3x2 pixels
		const level = 0;
		const internalFormat = gl.LUMINANCE;
		const width = 3;
		const height = 2;
		const border = 0;
		const format = gl.LUMINANCE;
		const type = gl.UNSIGNED_BYTE;
		gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border,
		              format, type, data);
		 
		// set the filtering so we don't need mips and it's not filtered
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	}

	bind(index = 0)
	{
		let gl = this.gl;
		gl.activeTexture(gl.TEXTURE0 + index);
    	gl.bindTexture(gl.TEXTURE_2D, this._texture);
	}
}