import Mesh from '../geometry/Mesh';
import vert from '../shaders/planes-dot.vert';
import frag from '../shaders/simpleColor.frag';

export default class BatchPlanes extends Mesh
{
    constructor(size = 25)
    {
        let program = new POLY.Program(vert, frag, {
            color: {
                type: 'vec3',
                value: [1., 1., 1.]
            },
            opacity: {
                type: 'float',
                value: .6
            }
        });

        super(program, null, 0);

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

        this.addPosition(positions);
        this.addIndices(indices);
    }

    draw()
    {
        this.program.bind();
        POLY.GL.draw(this);
    }
}
