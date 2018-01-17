export default class Program
{
    constructor(vertShader, fragShader, uniforms)
    {
        let gl = POLY.gl; // not sure that's great... :p
        this.gl = gl;
        // cache the locations of attributes and uniforms
        this.cacheAttributesLocation = {}
        this.cacheUniformsLocation = {}

        // create the program itself
        this.program = gl.createProgram();

        let vert = this._createShader(vertShader, true);
        let frag = this._createShader(fragShader, false);
        this._attachShaders(vert, frag);

        gl.linkProgram(this.program);

        // check for errors
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
        {
            throw "Couldn't initialise program";
        }

        gl.useProgram(this.program);

        this._createGetterSetterUniforms(uniforms);
        for (let uniform in uniforms)
        {
            this.addUniformLocation(uniform);
            let v = uniforms[uniform].value;
            this.uniforms[uniform] = v;
        }

        this.bind();

    }

    bind()
    {
        this.gl.useProgram(this.program);
    }

    addUniformLocation(name)
    {
        this.cacheUniformsLocation[name] = this.gl.getUniformLocation(this.program, name);
    }

    getUniformLocation(name)
    {
        if(this.cacheUniformsLocation[name] !== undefined)
        {
            return this.cacheUniformsLocation[name];
        }
        else
        {
            this.addUniformLocation(name);

            return this.getUniformLocation(name);
        }
    }


    // create a this.uniforms property
    // useful for the setter, we can just update the uniform when it gets changed
    _createGetterSetterUniforms(uniforms)
    {
        let gl = this.gl;
        let program = this.program;
        let _this = this;

        this.uniforms = new Proxy(uniforms, {
            get: function(target, name)
            {
                if (!(name in target))
                {
                    console.log("Getting non-existant property '" + name + "'");
                    return undefined;
                }

                return target[name].value;
            },
            set: function(target, name, value)
            {
                if (!(name in target))
                {
                    console.log("Setting non-existant property '" + name + "', initial value: " + value);

                    return false;
                }

                // /!\ TODO check Wen's GLShader.uniform() when it's not a number, seems more optimised
                target[name].value = value;
                let type = target[name].type;
                let glFunction = POLY.CONST.uniformTypes[type];


                if(type.indexOf('mat') === -1)
                {
                    if(type === 'texture')
                    {
                        gl[glFunction](_this.getUniformLocation(name), value, target[name].index);
                    }
                    else
                    {
                        gl[glFunction](_this.getUniformLocation(name), value);
                    }
                }
                else
                {
                    gl[glFunction](_this.getUniformLocation(name), false, value);
                }

                return true;
            }
        });
    }

    addAttributeLocation(name)
    {

    //     if(shaderProgram.cacheAttribLoc === undefined) {	shaderProgram.cacheAttribLoc = {};	}
	// if(shaderProgram.cacheAttribLoc[name] === undefined) {
	// 	shaderProgram.cacheAttribLoc[name] = gl.getAttribLocation(shaderProgram, name);
	// }
    //
	// return shaderProgram.cacheAttribLoc[name];
        // console.log(this.cacheAttributesLocation[name], name);

        if(this.cacheAttributesLocation[name] === undefined)
        {
            this.cacheAttributesLocation[name] = this.gl.getAttribLocation(this.program, name);
        }
    }

    getAttributeLocation(name)
    {
        if(this.cacheAttributesLocation[name] !== undefined)
        {
            return this.cacheAttributesLocation[name];
        }
        else
        {
            this.addAttributeLocation(name);

            return this.getAttributeLocation(name);
        }
    }

    _attachShaders(vert, frag)
    {
        this.gl.attachShader(this.program, vert);
        this.gl.attachShader(this.program, frag);
    }

    _createShader(src, isVertex)
    {
        let gl = this.gl;
        let shader;
        if (isVertex)
        {
            shader = gl.createShader(gl.VERTEX_SHADER);
        }
        else
        {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        }

        this.gl.shaderSource(shader, src);
        this.gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        {
            throw ("Couldn't initialise shader, ", gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }
}
