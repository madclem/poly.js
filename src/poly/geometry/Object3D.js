import { mat3, mat4, vec3 } from 'gl-matrix';
import core from '../core';

export default class Object3D
{
    constructor()
    {
        this._matrix = mat4.create();


        let position = new core.Vector();
        let scale = new core.Vector();
        let rotation = new core.Vector();

        this._rotation = vec3.create();
        this._scale = vec3.create();
        this._position = vec3.create();

        this._createGetterSetterUniforms([position, scale, rotation], ['position', 'scale', 'rotation']);
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

                    return target[name];
                }
            });
        }
    }
}
