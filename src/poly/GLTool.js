import State from './State';
import GLExtensions from './GLExtensions';

export default new class GLTool
{
	constructor()
	{
		this._lastMesh = null;
		this._lastProgram = null;
		this.aspectRatio = 0;
		this.state = null;
		this.enabledVertexAttributes = [];
	}

	init(gl)
	{
		this.state = new State(gl);
		GLExtensions.init();
	}

	_bindBuffers(mesh)
	{
		let gl = mesh.program.gl;

		for(let i = 0; i < mesh._attributes.length; i++)
		{
			let attrib = mesh._attributes[i];
			gl.bindBuffer(gl.ARRAY_BUFFER, attrib.buffer);
			let attribLocation = mesh.program.getAttributeLocation(attrib.name);

    		gl.vertexAttribPointer(attribLocation, attrib.itemSize, gl.FLOAT, false, 0, 0);

			// if(this.enabledVertexAttributes.indexOf(attribLocation) === -1)
            // {
                this.enabledVertexAttributes.push(attribLocation)
                gl.enableVertexAttribArray(attribLocation); // NEVER FORGET THAT LINE (I did...)
            // }

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

		if(this._lastProgram !== mesh.program)
		{
			this._lastProgram = mesh.program;
		}
		
		mesh.update();
		let gl = mesh.program.gl;

		if(mesh.state)
		{
			this.state.setState(mesh.state);
		}

		if(mesh.indexBuffer)
		{
			gl.drawElements(mesh.drawType, mesh._indices.length, gl.UNSIGNED_SHORT, 0);
		}
		else
		{
			gl.drawArrays(mesh.drawType, 0, mesh._numItems);
		}
	}

	resize(w, h)
	{
		let gl = POLY.gl;
		gl.canvas.width = w;
		gl.canvas.height = h;

		gl.viewportWidth = w;
        gl.viewportHeight = h;
		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

		this.aspectRatio = w/h;
	}
}
