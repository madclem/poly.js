import Program from './poly/Program';
import Mesh from './poly/geometry/Mesh';
import GL from './poly/GLTool';
import Texture from './poly/Texture';
import cameras from './poly/camera';
import control from './poly/control';
import State from './poly/State';
import CONST from './poly/const';
import * as utils from './poly/utils';

let init = (canvas)=>
{

    let gl;

    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        POLY.gl = gl;
        POLY.GL.init(gl);

    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

export
{
    init,
    Program,
    Mesh,
    GL,
    utils,
    Texture,
    CONST,
    cameras,
    control,
    State
}

global.POLY = exports; // eslint-disable-line
