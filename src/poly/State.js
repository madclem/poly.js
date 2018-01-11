// inspired (copied) by (from) https://github.com/pixijs/pixi.js/blob/dev/src/core/renderers/webgl/WebGLState.js
const BLEND = 0;
const DEPTH_TEST = 1;
const FRONT_FACE = 2;
const CULL_FACE = 3;
const BLEND_FUNC = 4;

export default class State
{
    constructor(gl)
    {
        this.gl = gl;
        this.activeState = new Uint8Array(16);
        this.defaultState = new Uint8Array(16);
        // this.activeState[BLEND] = 1;

        this.data = 0;
        // this.blend = true;
        this.blendMode = 0;

        this.blendModes = {
            source: {
                alpha: this.gl.SRC_ALPHA
            },
            dest: {
                one: this.gl.ONE
            },
        }
    }

    get blend()
    {
        return this.activeState[BLEND];
    }

    set blend(value) // eslint-disable-line require-jsdoc
    {
        this.activeState[BLEND] = value;
    }

    get culling()
    {
        return this.activeState[CULLING];
    }

    set culling(value) // eslint-disable-line require-jsdoc
    {
        this.activeState[CULLING] = value;
    }

    get depthTest()
    {
        return this.activeState[DEPTH_TEST];
    }

    set depthTest(value) // eslint-disable-line require-jsdoc
    {
        this.activeState[DEPTH_TEST] = value;
    }

    get clockwiseFrontFace()
    {
        return this.activeState[FRONT_FACE];
    }

    set clockwiseFrontFace(value) // eslint-disable-line require-jsdoc
    {
        this.activeState[FRONT_FACE] = value;
    }

    get blendMode()
    {
        return this.activeState[BLEND_FUNC];
        // return this._blendMode;
    }

    set blendMode(value) // eslint-disable-line require-jsdoc
    {
        this.activeState[BLEND_FUNC] = value;
        // 17 is NO BLEND
        // this.blend = (value !== 17);
        // this._blendMode = value;
    }

    setState(state)
    {
        console.log('here');
        this.setBlend(state.activeState[BLEND]);
        this.setDepthTest(state.activeState[DEPTH_TEST]);
        this.setFrontFace(state.activeState[FRONT_FACE]);
        this.setCullFace(state.activeState[CULL_FACE]);
        this.setBlendMode(state.activeState[BLEND_FUNC]);
    }

    setBlend(value)
    {
        value = value ? 1 : 0;

        if (this.activeState[BLEND] === value)
        {
            return;
        }
        console.log("BLEND");

        this.activeState[BLEND] = value;
        this.gl[value ? 'enable' : 'disable'](this.gl.BLEND);
        // this.setDepthTest(!value); // no need to do that because ew blend before we depth test (right?)
    }

    setBlendMode(value, source = "alpha", dest = "one")
    {
        if (value === this.activeState[BLEND_FUNC])
        {
            return;
        }

        console.log('BLENDMODE');
        this.activeState[BLEND_FUNC] = value;

        this.gl.blendFunc(this.blendModes.source[source], this.blendModes.dest[dest]);
        //
        // const mode = this.blendModes[value];
        //
        // if (mode.length === 2)
        // {
        //     this.gl.blendFunc(mode[0], mode[1]);
        // }
        // else
        // {
        //     this.gl.blendFuncSeparate(mode[0], mode[1], mode[2], mode[3]);
        // }
    }

    setDepthTest(value)
    {
        value = value ? 1 : 0;
        if (this.activeState[DEPTH_TEST] === value)
        {
            return;
        }
        console.log("DEPTHTEST");

        this.activeState[DEPTH_TEST] = value;
        this.gl[value ? 'enable' : 'disable'](this.gl.DEPTH_TEST);
    }

    setCullFace(value)
    {
        value = value ? 1 : 0;

        if (this.activeState[CULL_FACE] === value)
        {
            return;
        }

        this.activeState[CULL_FACE] = value;
        this.gl[value ? 'enable' : 'disable'](this.gl.CULL_FACE);
    }

    setFrontFace(value)
    {
        value = value ? 1 : 0;

        if (this.activeState[FRONT_FACE] === value)
        {
            return;
        }

        this.activeState[FRONT_FACE] = value;
        this.gl.frontFace(this.gl[value ? 'CW' : 'CCW']);
    }
}
