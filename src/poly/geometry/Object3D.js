import { mat3, mat4, vec3 } from 'gl-matrix';
import core from '../core';

export default class Object3D
{
    constructor()
    {
        this._matrix = mat4.create();
        this._needsUpdate = false;

        let position = new core.Vector();
        let scale = new core.Vector();
        let rotation = new core.Vector();

        this._rotation = vec3.create();
        this._scale = vec3.fromValues(1, 1, 1);
        this._position = vec3.create();

        this._createGetterSetterUniforms([position, scale, rotation], ['position', 'scale', 'rotation']);
    }

    _updateMatrix()
    {
        console.log('here', this._scale);
        mat4.identity(this._matrix, this._matrix);

        mat4.translate(this._matrix, this._matrix, this._position);
        mat4.rotateX(this._matrix, this._matrix, this._rotation[0]);
        mat4.rotateY(this._matrix, this._matrix, this._rotation[1]);
        mat4.rotateZ(this._matrix, this._matrix, this._rotation[2]);
        mat4.scale(this._matrix, this._matrix, this._scale);

    }

    setScale(x, y, z)
    {
        if(!y && !z)
        {
            y = z = x;
        }
        this._scale[0] = x;
        this._scale[1] = y;
        this._scale[2] = z;

        this._needsUpdate = true;
    }

    update()
    {
        if(this._needsUpdate)
        {
            this._updateMatrix();
        }
    }

    _createGetterSetterUniforms(objects, nameProperties)
    {
        let map = { x: 0, y: 1, z: 2 }
        let _this = this;

        for (var i = 0; i < objects.length; i++)
        {
            let o = objects[i];
            let nameProperty = nameProperties[i];

            this[nameProperties[i]] = new Proxy(o, {
                get: function(target, name)
                {
                    if (!(name in target))
                    {
                        console.log("Getting non-existant property '" + name + "'");
                        return undefined;
                    }

                    return target[name];
                },
                set: function(target, name, value)
                {
                    if (!(name in target))
                    {
                        console.log("Setting non-existant property '" + name + "', initial value: " + value);
                        return false;
                    }

                    target[name] = value
                    _this['_' + nameProperty][map[name]] = value;
                    _this._needsUpdate = true;

                    return true;//target[name];
                }
            });
        }
    }
}
