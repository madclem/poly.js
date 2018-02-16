class FacesSeparator {
  constructor(){
  }

  separate(faces, vertices){
    let triangles = [];
    let ind = [];

    for (var i = 0; i < faces.length; i++) {
     triangles.push(faces[i][0], faces[i][1], faces[i][2]);
     ind.push(faces[i][0], faces[i][1], faces[i][2]);
    }

    let oldVerts = vertices.slice();
    let newVertices = [];
    for (let i = 0; i < triangles.length; i++) {
        // console.log(oldVerts[triangles[i]]);
      newVertices[i] = oldVerts[triangles[i]].slice();
      // newVertices[i * 3] = oldVerts[triangles[i]];
      // newVertices[i * 3 + 1] = oldVerts[triangles[i]];
      // newVertices[i * 3 + 2] = oldVerts[triangles[i]];
//
      // newVertices[i * 3] = oldVerts[triangles[i * 3]];
      // newVertices[i * 3 + 1] = oldVerts[triangles[i * 3 + 2]];
      // newVertices[i * 3 + 2] = oldVerts[triangles[i * 3 + 1]];

      triangles[i] = i;
    }

    return {faces: triangles, vertices: newVertices}
  }
}

export default new FacesSeparator();
