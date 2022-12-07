export default (gl, shaderProgram, source) => {
    const uLightPosition = gl.getUniformLocation(shaderProgram, 'uLightPosition')
    gl.uniform3fv(uLightPosition, source)
}