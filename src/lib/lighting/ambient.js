export default (gl, shaderProgram, color, intensity) => {
    const uLightConstant = gl.getUniformLocation(shaderProgram, 'uLightConstant')
    const uAmbientIntensity = gl.getUniformLocation(shaderProgram, 'uAmbientIntensity')
    gl.uniform3fv(uLightConstant, color)
    gl.uniform1f(uAmbientIntensity, intensity)
}