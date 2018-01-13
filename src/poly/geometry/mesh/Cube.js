import Mesh from '../Mesh';
import FacesMultiplicator from '../../utils/FacesMultiplicator';
import FacesSeparator from '../../utils/FacesSeparator';

class Cube extends Mesh {
  constructor(program, data={}, state, drawType = 4){

    super(program, state, drawType)

    this.options = 
    {
      w: data.w || 1,
      h: data.h || 1,
      d: data.d || 1,
      multiFace: data.multiFace,
      subdivision: data.subdivision || 0,
    }

    this.multiFace = this.options.multiFace;

    this.subdivision = this.options.subdivision;
    this.width = this.options.w;
    this.height = this.options.h;
    this.depth = this.options.d;

    this.cube();
  }

  cube(){
    const x = this.width / 2;
  	const y = this.height / 2;
  	const z = this.depth / 2;

  	const positions = [];
  	const coords    = [];
  	const indices   = [];
  	const normals   = [];
  	let count     = 0;


  	// BACK
  	positions.push(-x,  y, -z);
  	positions.push(x,  y, -z);
  	positions.push(x, -y, -z);
  	positions.push(-x, -y, -z);

  	normals.push(0, 0, -1);
  	normals.push(0, 0, -1);
  	normals.push(0, 0, -1);
  	normals.push(0, 0, -1);

    if(this.multiFace){
      coords.push(0, 0);
    	coords.push(1/4, 0);
    	coords.push(1/4, 1/2);
    	coords.push(0, 1/2);
    }
    else {
      coords.push(0, 0);
      coords.push(1, 0);
      coords.push(1, 1);
      coords.push(0, 1);
    }

  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 1);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 3);

  	count ++;

  	// RIGHT
  	positions.push(x,  y, -z);
  	positions.push(x,  y,  z);
  	positions.push(x, -y,  z);
  	positions.push(x, -y, -z);

  	normals.push(1, 0, 0);
  	normals.push(1, 0, 0);
  	normals.push(1, 0, 0);
  	normals.push(1, 0, 0);

    if(this.multiFace){
      coords.push(1/4, 0);
    	coords.push(1/4 * 2, 0);
    	coords.push(1/4 * 2, 1/2);
    	coords.push(1/4, 1/2);
    }
    else {
      coords.push(0, 0);
      coords.push(1, 0);
      coords.push(1, 1);
      coords.push(0, 1);
    }

  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 1);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 3);

  	count ++;

  	// FRONT
  	positions.push(x,  y,  z);
  	positions.push(-x,  y,  z);
  	positions.push(-x, -y,  z);
  	positions.push(x, -y,  z);

  	normals.push(0, 0, 1);
  	normals.push(0, 0, 1);
  	normals.push(0, 0, 1);
  	normals.push(0, 0, 1);

    if(this.multiFace){
      coords.push(1/4 * 2, 0);
    	coords.push(1/4 * 3, 0);
    	coords.push(1/4 * 3, 1/2);
    	coords.push(1/4 * 2, 1/2);
    }
    else {
      coords.push(0, 0);
      coords.push(1, 0);
      coords.push(1, 1);
      coords.push(0, 1);
    }

  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 1);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 3);

  	count ++;

  	// LEFT
  	positions.push(-x,  y,  z);
  	positions.push(-x,  y, -z);
  	positions.push(-x, -y, -z);
  	positions.push(-x, -y,  z);

  	normals.push(-1, 0, 0);
  	normals.push(-1, 0, 0);
  	normals.push(-1, 0, 0);
  	normals.push(-1, 0, 0);

    if(this.multiFace){
      coords.push(0, 1/2);
    	coords.push(1/4, 1/2);
    	coords.push(1/4, 1/2 * 2);
    	coords.push(0, 1/2 * 2);
    }
    else {
      coords.push(0, 0);
      coords.push(1, 0);
      coords.push(1, 1);
      coords.push(0, 1);
    }

  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 1);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 3);

  	count ++;

  	// TOP
  	positions.push(-x,  y,  z);
  	positions.push(x,  y,  z);
  	positions.push(x,  y, -z);
  	positions.push(-x,  y, -z);

  	normals.push(0, 1, 0);
  	normals.push(0, 1, 0);
  	normals.push(0, 1, 0);
  	normals.push(0, 1, 0);

    if(this.multiFace){
      coords.push(1/4, 1/2);
    	coords.push(1/4 * 2, 1/2);
    	coords.push(1/4 * 2, 1/2 * 2);
    	coords.push(1/4, 1/2 * 2);
    }
    else {
      coords.push(0, 0);
      coords.push(1, 0);
      coords.push(1, 1);
      coords.push(0, 1);
    }

  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 1);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 3);

  	count ++;

  	// BOTTOM
  	positions.push(-x, -y, -z);
  	positions.push(x, -y, -z);
  	positions.push(x, -y,  z);
  	positions.push(-x, -y,  z);

  	normals.push(0, -1, 0);
  	normals.push(0, -1, 0);
  	normals.push(0, -1, 0);
  	normals.push(0, -1, 0);

    if(this.multiFace){
      coords.push(1/4 * 2, 1/2);
    	coords.push(1/4 * 3, 1/2);
    	coords.push(1/4 * 3, 1/2 * 2);
    	coords.push(1/4 * 2, 1/2 * 2);
    }
    else {
      coords.push(0, 0);
      coords.push(1, 0);
      coords.push(1, 1);
      coords.push(0, 1);
    }

  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 1);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 0);
  	indices.push(count * 4 + 2);
  	indices.push(count * 4 + 3);

    let ind = []

    for (var i = 0; i < indices.length; i+=3) {
      ind.push(indices[i], indices[i+1], indices[i+2])
    }

    // TODO this is a temporary fix
    let faces = FacesMultiplicator.multiplyTriangles(this.subdivision, ind, positions);
    let l = positions.length - coords.length
    for (var i = 0; i < l; i++) {
      coords.push(0, 0);
      normals.push(0, -1, 0);
    }

    this.addPosition(positions);
    this.addAttribute(coords, 'aUv', 2);
    this.addAttribute(normals, 'aNormal', 3);
    this.addIndices(faces, false);
  }
}

export default Cube;