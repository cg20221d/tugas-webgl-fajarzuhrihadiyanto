#version 100
attribute vec2 aPosition;
attribute vec4 aColor;
varying vec4 vColor;
void main() {
    float x = aPosition.x;
    float y = aPosition.y;
    gl_Position = vec4(x, y, 0.0, 1.0);
    vColor = aColor;
}