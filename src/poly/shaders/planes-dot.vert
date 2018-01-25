precision highp float;
attribute vec3 aPosition;
attribute vec3 aNormal;

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

varying vec3 vNormal;

void main(void) {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(aPosition + aNormal * 0.000001, 1.0);
    gl_PointSize = 1.0;
    vNormal = aNormal;
}
