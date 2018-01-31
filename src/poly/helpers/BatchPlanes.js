import Mesh from '../geometry/Mesh';
import Program from '../Program';
import State from '../State';
import vert from '../shaders/planes-dot.vert';
import frag from '../shaders/simpleColor.frag';

export default class BatchPlanes extends Mesh
{
    constructor(size = 25)
    {

        let program = new Program(vert, frag, {
            color: {
                type: 'vec3',
                value: [1., 1., 1.]
            },
            opacity: {
                type: 'float',
                value: .6
            }
        });
        let state = new State(POLY.gl);
        state.depthTest = true;

        super(program, state, 0);

        let index = 0;
        let positions = [];
        let indices = [];

        for (let i = -size; i < size; i++)
        {
            for (let j = -size; j < size; j++)
            {
                positions.push(i, j, 0);
                indices.push(index);
                index++;

                positions.push(i, 0, j);
                indices.push(index);
                index++;
            }
        }

        this.addPosition(positions, 'aPosition');
        this.addIndices(indices);
    }

    draw()
    {
        this.program.bind();
        POLY.GL.draw(this);
    }
}
