export default class Mesh
{
	constructor(program , drawType = 4)
	{
		this.program = program;
		this.drawType = drawType;
		this._attributes = [];
		this._vertices = [];
		this._indices = [];
		this._vertexSize = 0;
		this._numItems = 0;
		this.indexBuffer = null;
	}

	addIndices(indices, dynamic)
	{
		let gl = this.program.gl;
		const drawType = dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
		this._indices = indices;

		this.indexBuffer = gl.createBuffer();

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), drawType);

	}

	addPosition(data, name = 'aPosition')
	{
		this._vertices = data;
		this._vertexSize = this._vertices.length;
		this._numItems = this._vertexSize/3;
		this.addAttribute(data, name);
	}

	addAttribute(data, name, itemSize = 3)
	{
		let gl = this.program.gl;
		let buffer = gl.createBuffer();
    	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  
   		this._attributes.push({
   			name,
   			data,
   			itemSize,
   			numItems: this._numItems,
   			buffer
   		});

   		this.program.addAttributeLocation(name);
	}
}