import Program from './poly/Program';
import loaders from './poly/loaders';
import geometry from './poly/geometry';
import FrameBuffer from './poly/FrameBuffer';
import GL from './poly/GLTool';
import Texture from './poly/texture/Texture';
import DataTexture from './poly/texture/DataTexture';
import cameras from './poly/camera';
import core from './poly/core';
import control from './poly/control';
import State from './poly/State';
import CONST from './poly/const';
import helpers from './poly/helpers';
import * as utils from './poly/utils';
import GLExtensions from './poly/GLExtensions';

let init = (canvas, forceWebGL1)=>
{
    let gl;
    try
    {
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        // if(gl && !forceWebGL1)
        // {
    	// 	POLY.webgl2 = true;
		// }
        // else if(forceWebGL1)
        // {
		// 	gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		// }

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
    GLExtensions,
    utils,
    Texture,
    DataTexture,
    CONST,
    cameras,
    control,
    State,
    core,
    geometry,
    FrameBuffer,
    helpers,
    loaders
}

global.POLY = exports; // eslint-disable-line
