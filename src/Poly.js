import Program from './poly/Program';
import geometry from './poly/geometry';
import FrameBuffer from './poly/FrameBuffer';
import GL from './poly/GLTool';
import Texture from './poly/texture/Texture';
import DataTexture from './poly/texture/DataTexture';
import cameras from './poly/camera';
import control from './poly/control';
import State from './poly/State';
import CONST from './poly/const';
import helpers from './poly/helpers';
import * as utils from './poly/utils';

let init = (canvas)=>
{
    let gl;
    try
    {
        gl = canvas.getContext("webgl");

        POLY.gl = gl;
        POLY.GL.init(gl);

    } catch (e)
    {
    }

    if (!gl) {
        console.warn("Could not initialise WebGL");
    }
}

export
{
    init,
    Program,
    GL,
    utils,
    Texture,
    DataTexture,
    CONST,
    cameras,
    control,
    State,
    geometry,
    FrameBuffer,
    helpers
}

global.POLY = exports; // eslint-disable-line
