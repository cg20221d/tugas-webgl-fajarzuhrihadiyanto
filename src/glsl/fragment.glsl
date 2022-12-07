#version 100
precision mediump float;
uniform vec3 uLightConstant;
uniform float uAmbientIntensity;
varying vec4 vColor;
void main() {
    vec3 ambient = uLightConstant * uAmbientIntensity;
    vec3 phong = ambient;
    vec3 color3 = vec3(vColor[0], vColor[1], vColor[2]);
    gl_FragColor = vec4(phong * color3, 1);
}