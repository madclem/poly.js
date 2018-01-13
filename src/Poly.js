import Program from './poly/Program';
import geometry from './poly/geometry';
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
    GL,
    utils,
    Texture,
    CONST,
    cameras,
    control,
    State,
    geometry
}

global.POLY = exports; // eslint-disable-line
