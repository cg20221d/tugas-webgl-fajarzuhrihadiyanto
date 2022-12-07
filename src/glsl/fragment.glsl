#version 100
precision mediump float;
uniform vec3 uLightConstant;
uniform float uAmbientIntensity;
uniform mat3 uNormalModel;
uniform vec3 uLightPosition;
varying vec4 vColor;
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
    vec3 ambient = uLightConstant * uAmbientIntensity;

    vec3 lightRay = vPosition - uLightPosition;
    vec3 normalizedLight = normalize(-lightRay);
    vec3 normalizedNormal = normalize(uNormalModel * vNormal);
    float cosTheta = dot(normalizedNormal, normalizedLight);
    vec3 diffuse = vec3(0.0, 0.0, 0.0);
    if (cosTheta > 0.0) {
        float diffuseIntensity = cosTheta;
        diffuse = uLightConstant * diffuseIntensity;
    }
    vec3 phong = ambient + diffuse;

    vec3 color3 = vec3(vColor[0], vColor[1], vColor[2]);
    gl_FragColor = vec4(phong * color3, 1);
}