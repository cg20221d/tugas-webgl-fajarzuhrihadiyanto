#version 100
attribute vec3 aPosition;
attribute vec4 aColor;
varying vec4 vColor;
uniform mat4 uView;
uniform mat4 uProjection;
uniform mat4 uTransform;
void main() {
    gl_Position = uProjection * uView * uTransform * vec4(aPosition, 1.0);
    vColor = aColor;
}