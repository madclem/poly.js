import { mat3, mat4, vec3 } from 'gl-matrix';
import core from '../core';

export default class Object3D
{
    constructor()
    {
        this._matrix = mat4.create();
        this._needsUpdate = false;

        this.position = new core.Vector(this._onPropertyUpdate.bind(this));
        this.scale = new core.Vector(this._onPropertyUpdate.bind(this));
        this.scale.set(1,1,1);
        this.rotation = new core.Vector(this._onPropertyUpdate.bind(this));

        this._rotation = vec3.create();
        this._scale = vec3.fromValues(1, 1, 1);
        this._position = vec3.create();
    }

    _onPropertyUpdate()
    {
        this._needsUpdate = true;
    }

    _updateMatrix()
    {
        vec3.set(this._scale, this.scale.x, this.scale.y, this.scale.z);
        vec3.set(this._position, this.position.x, this.position.y, this.position.z);
        vec3.set(this._rotation, this.rotation.x, this.rotation.y, this.rotation.z);

        mat4.identity(this._matrix, this._matrix);
        mat4.translate(this._matrix, this._matrix, this._position);
        mat4.rotateX(this._matrix, this._matrix, this._rotation[0]);
        mat4.rotateY(this._matrix, this._matrix, this._rotation[1]);
        mat4.rotateZ(this._matrix, this._matrix, this._rotation[2]);
        mat4.scale(this._matrix, this._matrix, this._scale);

    }

    update()
    {
        if(this._needsUpdate)
        {
            this._updateMatrix();
        }
    }
}
