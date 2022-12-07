#version 100
attribute vec3 aPosition;
attribute vec4 aColor;
attribute vec3 aNormal;
varying vec4 vColor;
varying vec3 vNormal;
varying vec3 vPosition;
uniform mat4 uView;
uniform mat4 uProjection;
uniform mat4 uTransform;
void main() {
    gl_Position = uProjection * uView * uTransform * vec4(aPosition, 1.0);
    vColor = aColor;
    vNormal = aNormal;
    vPosition = (uTransform * vec4(aPosition, 1.0)).xyz;
}