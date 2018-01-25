precision mediump float;

uniform vec3 color;
uniform float opacity;

void main(void) {
    gl_FragColor = vec4(vec3(1., .2, 1.), opacity);
    gl_FragColor.rgb *= opacity;
}
