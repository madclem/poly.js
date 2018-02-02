import Mesh from '../Mesh';

export default class Quad extends Mesh
{
	constructor(program, data= {}, state, drawType = 4)
	{

	    super(program, state, drawType);
		data = data || {};

		let pos = new Float32Array(new Float32Array([
				-1, -1, 0,
				-1,  1, 0,
				1,  1, 0,
				1, -1, 0
		]));

	    this.addPosition(pos, data.positionAttributeName || 'aPosition');

		this.addIndices(
			[0,1,2,0,2,3]
		);

		this.uvs = [
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
		];

	    //
  	}
}
