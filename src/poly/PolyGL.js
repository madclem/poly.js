class PolyGL
{
    constructor()
    {
        this._gl = null;
    }

    reset(canvas)
    {
        this._canvas = canvas;

        let gl = this._canvas.getContext("webgl");
        this._gl = gl;

        if(!this._gl)
        {
            console.warn("Application doesn't support webgl");
        }
    }

    resize()
    {
        let canvas = _this.canvas;
        var displayWidth  = this.canvas.clientWidth;
        var displayHeight = this.canvas.clientHeight;

        if (this.canvas.width  != displayWidth || this.canvas.height != displayHeight)
        {
            this.canvas.width  = displayWidth;
            this.canvas.height = displayHeight;
        }

        this._gl.viewport(0, 0, canvas.width, canvas.height);
    }
}

export default new PolyGL();
