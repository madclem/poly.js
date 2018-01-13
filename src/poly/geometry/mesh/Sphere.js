import Mesh from '../Mesh';

class Sphere extends Mesh 
{
  constructor(program, data={}, state, drawType){
    super(program, state, drawType)

    this.options = {
      nbVert: data.nbVert || 10,
      radius: data.radius || 1,
    }

    this.sphere();
  }

  sphere()
  {
    var positions = [];
    var indices = [];
    var index = 0;
    var uv = []
    var offset = 0;

    let dTex = 1/ this.options.nbVert;

    let angle;
    for (var i = 0; i < this.options.nbVert; i++) 
    {
      for (var j = 0; j < this.options.nbVert; j++) 
      {
        angle = this.getAngle(i, j);
        positions.push(angle[0], angle[1], angle[2]);

        angle = this.getAngle(i + 1, j);
        positions.push(angle[0], angle[1], angle[2]);

        angle = this.getAngle(i + 1, j + 1);
        positions.push(angle[0], angle[1], angle[2]);

        angle = this.getAngle(i, j + 1);
        positions.push(angle[0], angle[1], angle[2]);

        const u = j / this.options.nbVert;
			  const v = i / this.options.nbVert;
  			uv.push(1.0 - u, v);
  			uv.push(1.0 - u, v + dTex);
  			uv.push(1.0 - u - dTex, v + dTex);
  			uv.push(1.0 - u - dTex, v);

        indices.push(index * 4 + 0);
        indices.push(index * 4 + 1);
        indices.push(index * 4 + 2);
        indices.push(index * 4 + 0);
        indices.push(index * 4 + 2);
        indices.push(index * 4 + 3);
        index++;
      }
    }

    this.addPosition(positions);
    this.addAttribute(uv, 'aUv', 2);
    this.addIndices(indices, false);
  }

  getAngle(i, j, isNormal = false) 
  {	
    //	rx : -90 ~ 90 , ry : 0 ~ 360
    const ry        = j / this.options.nbVert * Math.PI * 2 - Math.PI;
		const rx        = i / this.options.nbVert * Math.PI - Math.PI * 0.5;
		const r         = this.options.radius;
		const pos       = [];
		pos[1]        	= Math.sin(rx) * r;
		const t         = Math.cos(rx) * r;
		pos[0]        	= Math.cos(ry) * t;
		pos[2]        	= Math.sin(ry) * t;


		return [pos[0], pos[1], pos[2]];
	}

  render(){
  }
}

export default Sphere;