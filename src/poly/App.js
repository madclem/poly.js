import {PolyGL} from './PolyGL'

export default class App
{
    constructor(canvas)
    {
        this._gl = PolyGL;

        this._canvas = canvas;

        this._gl.reset(this._canvas);
    }

    resize()
    {
        this._gl.resize();
    }
}
