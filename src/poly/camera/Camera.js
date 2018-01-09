import { mat4, vec3 } from 'gl-matrix';

class Camera
{
    constructor()
    {
        this.aspectRatio = mat4.create();

        this.matrix = mat4.create(); // changes on the camera
        this.viewMatrix = mat4.create(); // move the world in front of the camera (inverse)
        this.projectionMatrix = mat4.create();


        this.mRX = mat4.create();
        this.mRY = mat4.create();
        this.mRZ = mat4.create();
        this.mT = mat4.create();

        this.position = vec3.create();
    }

    lookAt(target, up = [0, 1, 0])
    {
        mat4.lookAt(this.matrix, this.position, target, up);
    }

    rotateY(angle)
    {
        mat4.fromYRotation(this.mRY, angle);

    }
    rotateX(angle)
    {
        mat4.identity(this.mRX);
        mat4.fromXRotation(this.mRX, angle);

    }

    rotateZ(angle)
    {
        mat4.identity(this.mRZ);
        mat4.fromXRotation(this.mRZ, angle);

    }

    setRotation(x, y, z)
    {
    }

    setPosition(x, y, z)
    {
        this.position = [x, y, z]
        mat4.identity(this.mT, this.mT);
        mat4.translate(this.mT, this.mT, [x, y, z]);
    }

    setAspectRatio(aspectRatio)
    {
        this.aspectRatio = aspectRatio;
        this.perspective(this.fov, aspectRatio, this.near, this.far);
    }

    perspective(fov, aspect, near, far)
    {
        mat4.perspective(this.projectionMatrix, fov, aspect, near, far);

        this.fov = fov;
        this.near = near;
        this.far = far;
        this.aspect = aspect;
    }

    orthographic(left, right, bottom, top, near, far, dst)
    {
        dst = dst || new Float32Array(16);

        dst[ 0] = 2 / (right - left);
        dst[ 1] = 0;
        dst[ 2] = 0;
        dst[ 3] = 0;
        dst[ 4] = 0;
        dst[ 5] = 2 / (top - bottom);
        dst[ 6] = 0;
        dst[ 7] = 0;
        dst[ 8] = 0;
        dst[ 9] = 0;
        dst[10] = 2 / (near - far);
        dst[11] = 0;
        dst[12] = (left + right) / (left - right);
        dst[13] = (bottom + top) / (bottom - top);
        dst[14] = (near + far) / (near - far);
        dst[15] = 1;

        return dst;
    }
}

export default Camera;
