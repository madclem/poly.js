import Program from './poly/Program';
import Mesh from './poly/geometry/Mesh';
import GL from './poly/GLTool';

let init = (canvas)=>
{

    let gl;

    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        POLY.gl = gl;

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
    GL
}

global.POLY = exports; // eslint-disable-line
