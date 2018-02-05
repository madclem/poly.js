import Mesh from '../Mesh';
import FacesMultiplicator from '../../utils/FacesMultiplicator';
import FacesSeparator from '../../utils/FacesSeparator';

class BigTriangle extends Mesh {
  constructor(program, data={}, state, drawType = 4)
  {
    super(program, state, drawType)

    const indices = [2, 1, 0];
    const positions = [
      -1, -1,
      -1, 4,
      4, -1
    ];

    this.addPosition(positions, 'aPosition', 2);
    this.addIndices(indices, false);
  }
}

export default BigTriangle;
