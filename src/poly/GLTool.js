export default new class GLTool
{
	constructor()
	{
		this._lastMesh = null;

	}

	_bindBuffers(mesh)
	{
		for(let i = 0; i < mesh._attributes.length; i++)
		{
			let attrib = mesh._attributes[i];
			let gl = mesh.program.gl; 
			gl.bindBuffer(gl.ARRAY_BUFFER, attrib.buffer);
    		gl.vertexAttribPointer(mesh.program.getAttributeLocation(attrib.name), attrib.itemSize, gl.FLOAT, false, 0, 0);
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
		gl.drawArrays(gl.TRIANGLES, 0, mesh._numItems);

	}
}