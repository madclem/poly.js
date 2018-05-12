import { mat4 } from 'gl-matrix';
import UniformGroup from './UniformGroup';
import vert from './shaders/basic.vert';
import frag from './shaders/basic.frag';

export default class Program
{
    constructor(vertShader, fragShader, uniforms = {})
    {
        vertShader = vertShader || vert;
        fragShader = fragShader || frag;

        let gl = POLY.gl; // not sure that's great... :p
        this.gl = gl;
        // cache the locations of attributes and uniforms
        this.cacheAttributesLocation = {}
        this.cacheUniformsLocation = {}

        // create the program itself
        this.program = gl.createProgram();

        let vertS = this._createShader(vertShader, true);
        let fragS = this._createShader(fragShader, false);
        this._attachShaders(vertS, fragS);

        gl.linkProgram(this.program);

        // check for errors
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
        {
            throw "Couldn't initialise program";
        }

        gl.useProgram(this.program);

        this._checkIfBasicMatrices(uniforms);

        this.uniforms = new UniformGroup(uniforms, this);
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

    _checkIfBasicMatrices(uniforms)
    {
        let matrices = ['projectionMatrix', 'modelMatrix', 'viewMatrix'];

        for (let i = 0; i < matrices.length; i++)
        {
            if(!uniforms[matrices[i]])
            {
                uniforms[matrices[i]] = {
            		value: mat4.create(),
            		type: 'mat4'
                }
            }
        }
    }

    // create a this.uniforms property
    // useful for the setter, we can just update the uniform when it gets changed
    _createGetterSetterUniforms(uniforms)
    {
        let gl = this.gl;
        let program = this.program;
        let _this = this;


        let self = this;


        this.uniforms = uniforms;

        for(var p in self.uniforms) {

            self.uniforms[p] = uniforms[p];

            (function(field_name) {
                Object.defineProperty (self, field_name, {
                    get: function () {
                        console.log('GET', field_name);
                        return self.uniforms[field_name];
                    },
                    set: function (new_value) {
                        console.log('SET', field_name, new_value);
                        self.uniforms[field_name].value = new_value;
                    }
                });
            })(p);
        }

        // for (var name in this.uniforms) {
        //     Object.defineProperty(_this.uniforms, _name, {
        //         get: function()
        //         {
        //             // if(uniforms[name])
        //             // {
        //             // console.log(name);
        //                 return _this.uniforms[_name];
        //             // }
        //             // else {
        //             //     console.log("Getting non-existant property '" + name + "'");
        //             //
        //             //     return undefined;
        //             // }
        //         },
        //         set: function(value)
        //         {
        //             // if(uniforms[name])
        //             // {
        //                 // /!\ TODO check Wen's GLShader.uniform() when it's not a number, seems more optimised
        //                 // uniforms[name].value = value;
        //                 // let type = uniforms[name].type;
        //                 // let glFunction = POLY.CONST.uniformTypes[type];
        //                 //
        //                 // if(type.indexOf('mat') === -1)
        //                 // {
        //                 //     if(type === 'texture')
        //                 //     {
        //                 //         gl[glFunction](_this.getUniformLocation(name), value, uniforms[name].index);
        //                 //     }
        //                 //     else
        //                 //     {
        //                 //         gl[glFunction](_this.getUniformLocation(name), value);
        //                 //     }
        //                 // }
        //                 // else
        //                 // {
        //                 //     gl[glFunction](_this.getUniformLocation(name), false, value);
        //                 // }
        //
        //                 return true;
        //             // }
        //         },
        //     });
        // }

        // this.uniforms = new Proxy(uniforms, {
        //     get: function(target, name)
        //     {
        //         if (!(name in target))
        //         {
        //             console.log("Getting non-existant property '" + name + "'");
        //             return undefined;
        //         }
        //
        //         return target[name].value;
        //     },
        //     set: function(target, name, value)
        //     {
        //         if (!(name in target))
        //         {
        //             console.log("Setting non-existant property '" + name + "', initial value: " + value);
        //
        //             return false;
        //         }
        //
        //         // /!\ TODO check Wen's GLShader.uniform() when it's not a number, seems more optimised
        //         target[name].value = value;
        //         let type = target[name].type;
        //         let glFunction = POLY.CONST.uniformTypes[type];
        //
        //
        //         if(type.indexOf('mat') === -1)
        //         {
        //             if(type === 'texture')
        //             {
        //                 gl[glFunction](_this.getUniformLocation(name), value, target[name].index);
        //             }
        //             else
        //             {
        //                 gl[glFunction](_this.getUniformLocation(name), value);
        //             }
        //         }
        //         else
        //         {
        //             gl[glFunction](_this.getUniformLocation(name), false, value);
        //         }
        //
        //         return true;
        //     }
        // });
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
