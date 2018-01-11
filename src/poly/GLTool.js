import State from './State';

export default new class GLTool
{
	constructor()
	{
		this._lastMesh = null;
		this.aspectRatio = 0;
		this.state = null;
	}

	init(gl)
	{
		this.state = new State(gl);
	}

	_bindBuffers(mesh)
	{
		let gl = mesh.program.gl;

		for(let i = 0; i < mesh._attributes.length; i++)
		{
			let attrib = mesh._attributes[i];
			gl.bindBuffer(gl.ARRAY_BUFFER, attrib.buffer);
    		gl.vertexAttribPointer(mesh.program.getAttributeLocation(attrib.name), attrib.itemSize, gl.FLOAT, false, 0, 0);
		}

		if(mesh.indexBuffer)
		{
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
		}
	}

	draw(mesh)
	{
		if(this._lastMesh !== mesh)
		{
			this._bindBuffers(mesh);
			this._lastMesh = mesh;
		}

		let gl = mesh.program.gl;

		if(mesh.state)
		{
			this.state.setState(mesh.state);
		}

		if(mesh.indexBuffer)
		{
			gl.drawElements(gl.TRIANGLES, mesh._indices.length, gl.UNSIGNED_SHORT, 0);
		}
		else
		{
			gl.drawArrays(gl.TRIANGLES, 0, mesh._numItems);
		}
	}

	resize(w, h)
	{
		let gl = POLY.gl;
		gl.canvas.width = w;
		gl.canvas.height = h;

		this.aspectRatio = w/h;
	}
}
