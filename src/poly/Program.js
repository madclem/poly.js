export default class Program
{
    constructor(vertShader, fragShader)
    {
        let gl = POLY.gl;
        this.gl = gl;



        let program = gl.createProgram();
        this.program = program;

        let vert = this._createShader(vertShader, true);
        let frag = this._createShader(fragShader, false);

        this._attachShaders(vert, frag);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        {
            throw "Couldn't initialise program";
        }

        gl.useProgram(program);

        program.vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(program.vertexPositionAttribute);

        program.pMatrixUniform = gl.getUniformLocation(program, "uPMatrix");
        program.mvMatrixUniform = gl.getUniformLocation(program, "uMVMatrix");
    }

    _attachShaders(vert, frag)
    {
        this.gl.attachShader(this.program, vert);
        this.gl.attachShader(this.program, frag);
    }

    _createShader(src, isVertex)
    {
        let gl = this.gl;
        let shader;
        if (isVertex)
        {
            shader = gl.createShader(gl.VERTEX_SHADER);
        }
        else
        {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        }

        this.gl.shaderSource(shader, src);
        this.gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        {
            throw ("Couldn't initialise shader, ", gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }
}
