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

		this.instancedAttributes = [];
	}

	init(gl)
	{
		this.state = new State(gl);
		GLExtensions.init();
		this._hasInstance = GLExtensions.checkExtension('ANGLE_instanced_arrays');
		this._instanceExt = GLExtensions.getExtension('ANGLE_instanced_arrays');
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

			if(mesh.instanceCount > 0 && attrib.instance && this._hasInstance)
			{
				this._instanceExt.vertexAttribDivisorANGLE(attribLocation, 1);

				this.instancedAttributes.push(attribLocation);
			}

			if(this.enabledVertexAttributes.indexOf(attribLocation) === -1)
            {
                this.enabledVertexAttributes.push(attribLocation)
				gl.enableVertexAttribArray(attribLocation); // NEVER FORGET THAT LINE (I did...)
			}
		}

		if(mesh.indexBuffer)
		{
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
		}
	}

	setCamera(camera)
	{
		this._camera = camera;
	}

	_updateMatrices(mesh)
	{
		let program = mesh.program;
		program.uniforms.projectionMatrix = this._camera.projectionMatrix;
	    program.uniforms.viewMatrix = this._camera.matrix;
	    program.uniforms.modelMatrix = mesh._matrix;

	}

	draw(mesh)
	{

		if(this._lastMesh !== mesh)
		{
			// /!\ it's important to call it here because if there is only one instanced object on scene, it will be drawn only
			// once, although we don't want to reset the instanced attributes :)
			this.resetInstancedAttribute();

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

		if(this._camera)
		{
			this._updateMatrices(mesh);
		}



		if(mesh.instanceCount > 0 && this._hasInstance)
		{
			if(mesh.indexBuffer)
			{
				this._instanceExt.drawElementsInstancedANGLE(mesh.drawType, mesh._indices.length, gl.UNSIGNED_SHORT, 0, mesh.instanceCount);
			}
			else
			{
				this._instanceExt.drawArraysInstancedANGLE(mesh.drawType, 0, mesh._numItems, mesh.instanceCount);
			}
		}
		else if(mesh.indexBuffer)
		{
			gl.drawElements(mesh.drawType, mesh._indices.length, gl.UNSIGNED_SHORT, 0);
		}
		else
		{
			gl.drawArrays(mesh.drawType, 0, mesh._numItems);
		}

	}

	// very important to reset the attributes location from one object to another as some of them
	// could be not instanced, etc. but share the same attrib location
	resetInstancedAttribute()
	{
		if(this.instancedAttributes.length > 0 && this._hasInstance)
		{
			for (var i = 0; i < this.instancedAttributes.length; i++) {
				let attribLocation = this.instancedAttributes[i]
				this._instanceExt.vertexAttribDivisorANGLE(attribLocation, 0);
			}

			this.instancedAttributes = [];
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
