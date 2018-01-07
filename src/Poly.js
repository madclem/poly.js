import Program from './poly/Program';

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
    Program
}

global.POLY = exports; // eslint-disable-line
