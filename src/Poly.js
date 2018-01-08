import Program from './poly/Program';
import Mesh from './poly/geometry/Mesh';
import GL from './poly/GLTool';
import Texture from './poly/Texture';
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
    CONST
}

global.POLY = exports; // eslint-disable-line
