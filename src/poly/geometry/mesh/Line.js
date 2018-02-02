import Mesh from '../Mesh';

let tempArray1 = [];
let tempArray2 = [];

export default class Line extends Mesh
{
    constructor(program, points = [], state, drawType= 4)
    {
        super(program, state, drawType)

        // data = data || {};

        if(points.length <= 0)
        {
            points = [
                [0, 0, 0],
                [100/200, 250/200, 0],
                [50/200, 200/200 ,0],
                [0, 200/200 ,0],
                [-100/200, 220/200 ,0],
                [-70/200, 300/200 ,0]
            ]
        }


        this.positions = [];
        this.directions = [];
        this.indicesArray = [];
        this.counters = [];
        this.width = [];
        this.uvs = [];
        this.previous = [];
        this.next = [];


        this.points = points;

        this.line();
    }

    line(needsUpdate = true)
    {
        let v = this.points;

        this.positions.length = v.length * 2;
        this.counters.length = v.length * 2;

        let index = 0;
        let indexC = 0;
        let indexP = 0;
        let indexN = 0;



        this.previous.length = this.positions.length;
        this.next.length = this.positions.length;

        for (let i = 0; i < v.length; i++) {


            if(needsUpdate)
            {
                let c = i/v.length;
                this.counters[indexC++] = [c];
                this.counters[indexC++] = [c];
            }

            this.positions[index++] = v[i][0];
            this.positions[index++] = v[i][1];
            this.positions[index++] = v[i][2];

            this.positions[index++] = v[i][0];
            this.positions[index++] = v[i][1];
            this.positions[index++] = v[i][2];
        }

        this.process(needsUpdate);
    }

    compareV3( a, b )
    {
  	    let aa = a * 6;
  	    let ab = b * 6;

  	    return ( this.positions[ aa ] === this.positions[ ab ] ) && ( this.positions[ aa + 1 ] === this.positions[ ab + 1 ] ) && ( this.positions[ aa + 2 ] === this.positions[ ab + 2 ] );
    }

    copyV3( a, out )
    {
        if(!out) out = tempArray1;
        let aa = a * 6;
        out[0] = this.positions[ aa ];
        out[1] = this.positions[ aa + 1 ];
        out[2] = this.positions[ aa + 2 ];
    }

    process(needsUpdate)
    {
        let l = this.positions.length / 6;
        let v, index = 0, indexN = 0;
        if( this.compareV3( 0, l - 1 ) )
        {
            this.copyV3( l - 2 );
        }
        else
        {
            this.copyV3( 0 );
        }

        this.previous[index++] = tempArray1[0];
        this.previous[index++] = tempArray1[1];
        this.previous[index++] = tempArray1[2];

        this.previous[index++] = tempArray1[0];
        this.previous[index++] = tempArray1[1];
        this.previous[index++] = tempArray1[2];

        for (let i = 0; i < l; i++) {
          // caluclate pos and next
          this.copyV3( i, tempArray1 );

          if(i > 0) {
            // we can fill the nexts
            this.next[indexN++] = tempArray1[0];
            this.next[indexN++] = tempArray1[1];
            this.next[indexN++] = tempArray1[2];

            this.next[indexN++] = tempArray1[0];
            this.next[indexN++] = tempArray1[1];
            this.next[indexN++] = tempArray1[2];

            this.previous[index++] = tempArray2[0];
            this.previous[index++] = tempArray2[1];
            this.previous[index++] = tempArray2[2];

            this.previous[index++] = tempArray2[0];
            this.previous[index++] = tempArray2[1];
            this.previous[index++] = tempArray2[2];
          }

          tempArray2[0] = tempArray1[0];
          tempArray2[1] = tempArray1[1];
          tempArray2[2] = tempArray1[2];
        }

        if( this.compareV3( l - 1, 0 ) )
        {
            this.copyV3( 1, tempArray1 );
        }
        else
        {
            this.copyV3( l - 1, tempArray1 );
        }

        this.next[indexN++] = tempArray1[0];
        this.next[indexN++] = tempArray1[1];
        this.next[indexN++] = tempArray1[2];

        this.next[indexN++] = tempArray1[0];
        this.next[indexN++] = tempArray1[1];
        this.next[indexN++] = tempArray1[2];

        index = 0;
        this.addPosition(this.positions, 'position');
        this.addAttribute(this.next, 'aNext');
        this.addAttribute(this.previous, 'aPrevious');

        if(needsUpdate)
        {
            index = 0;
            this.uvs = [];
            let w;

            for( let j = 0; j < l; j++ )
            {
                if( this.widthCallback )
                {
                  w = this.widthCallback( j / ( l -1 ) )
                }
                else
                {
                  w = .1;
                }

                this.width[index++] = w;
                this.width[index++] = w;

                this.uvs.push(j/(l-1), 0);
                this.uvs.push(j/(l-1), 1);
            }

            index = 0;
            this.indicesArray = [];

            for( let j = 0; j < l - 1; j++ )
            {
                let n = j * 2;

                this.indicesArray[index++] = n;
                this.indicesArray[index++] = n+1;
                this.indicesArray[index++] = n+2;

                this.indicesArray[index++] = n+2;
                this.indicesArray[index++] = n+1;
                this.indicesArray[index++] = n+3;
            }

            index = 0;
            this.directions = [];

            for (let i = 0; i < this.positions.length; i++)
            {
                if(i % 2 === 0)
                {
                    this.directions[index++] = 1;
                }
                else
                {
                    this.directions[index++] = -1;
                }
            }

            this.addIndices(this.indicesArray, false);
            // this.addAttribute(this.width, 'width');
            this.addAttribute(this.directions, 'direction', 1);
            this.addAttribute(this.uvs, 'aUv', 2);
            this.addAttribute(this.counters, 'aCounters', 1);
        }
    }

    update(points, needsUpdate = false)
    {
        this.points = points || this.points;
        this.line(needsUpdate);
    }
}
