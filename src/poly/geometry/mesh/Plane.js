import Mesh from '../Mesh';

export default class Plane extends Mesh
{
    constructor(program, data = {}, state, drawType= 4)
    {
        super(program, state, drawType)

        data = data || {};

        this.options =
        {
            w: data.w || 1,
            h: data.h || 1,
            d: data.d || 1,
            axis: data.axis || 'xy',
            positionAttributeName: data.positionAttributeName || 'aPosition',
            subdivision: data.subdivision || 10,
        }

        this.pivotX = -this.options.w/2;
        this.pivotY = -this.options.h/2;

        this.plane(this.options.w, this.options.h, this.options.subdivision, this.options.axis);
    }

    plane(w, h, subdivision, axis)
    {
        let positions = [];
        let indices = [];
        let index = 0;

        let offset = 0;


        // for (let i = subdivision - 1; i > -1; i--) {
        //   for (let j = subdivision - 1; j > -1; j--) {
        let pos, u, v;
        for (let i = 0; i < subdivision; i++)
        {
            u = i / subdivision;
            for (let j = 0; j < subdivision; j++)
            {
                v = j / subdivision;
                pos = this.getPos(i,j)
                positions.push(pos[0], pos[1], pos[2]);
                pos = this.getPos(i+1,j)
                positions.push(pos[0], pos[1], pos[2]);
                pos = this.getPos(i+1,j+1)
                positions.push(pos[0], pos[1], pos[2]);
                pos = this.getPos(i,j+1)
                positions.push(pos[0], pos[1], pos[2]);

                indices.push(index * 4 + 0);
                indices.push(index * 4 + 1);
                indices.push(index * 4 + 2);
                indices.push(index * 4 + 0);
                indices.push(index * 4 + 2);
                indices.push(index * 4 + 3);

                index++;

                this.uvs.push(u, v, u, v, u, v, u, v)
            }
        }

        this.addPosition(positions, this.options.positionAttributeName);
        this.addIndices(indices, false);
    }

    getPos(i, j)
    {
        let x = this.options.w / this.options.subdivision * i + this.pivotX;
        let y = this.options.h / this.options.subdivision * j + this.pivotY;
        let z = 0 ;

        if(this.options.axis === "xy")
        {
            return [x, y, z];
        }
        else
        {
            return [x, 0, y];
        }
    }
}
