import { extensions } from './const';

export default new class GLExtensions
{
    constructor()
    {
        this.extensions = {};
    }

    init()
    {
        const gl = POLY.gl;

        for(let i = 0; i < extensions.length; i++)
        {
			this.extensions[extensions[i]] = gl.getExtension(extensions[i]);
		}
    }

    checkExtension(id)
    {
        return !!this.extensions[id];
    }

    getExtension(id)
    {
        return this.extensions[id];
    }
}
