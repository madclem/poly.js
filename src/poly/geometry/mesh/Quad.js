import Mesh from '../Mesh';

export default class Quad extends Mesh
{
	constructor(program, data={}, state, drawType = 4)
	{

	    super(program, state, drawType);

		let pos = new Float32Array(new Float32Array([-1, -1, 0,
		-1,  1, 0,
		1,  1, 0,
		1, -1, 0]));
	    this.addPosition(pos);

		this.addAttribute(new Float32Array([
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
		]), 'aUv', 2);

	    //
		this.addIndices(
			[0,1,2,0,2,3]
		);
  	}
}
