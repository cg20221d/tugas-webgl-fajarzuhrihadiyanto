import readGLSL from './glsl-reader.js'
import getWebGL from './webgl-checker.js'

const main = async () => {
    const myCanvas = document.getElementById('my-canvas')
    const gl = getWebGL(myCanvas)

    //#region  //*=========== Vertex Shader ===========
    let vertexShaderCode = (await readGLSL('/src/glsl/vertex.glsl')).responseText
    const vertexShaderObject = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShaderObject, vertexShaderCode)
    gl.compileShader(vertexShaderObject)
    //#endregion  //*======== Vertex Shader ===========

    //#region  //*=========== Fragment Shader ===========
    let fragmentShaderCode = (await readGLSL('/src/glsl/fragment.glsl')).responseText
    const fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode)
    gl.compileShader(fragmentShaderObject)
    //#endregion  //*======== Fragment Shader ===========

    //#region  //*=========== Create Shader Program ===========
    const shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShaderObject)
    gl.attachShader(shaderProgram, fragmentShaderObject)
    gl.linkProgram(shaderProgram)
    gl.useProgram(shaderProgram)
    //#endregion  //*======== Create Shader Program ===========

    //#region  //*=========== Paint The Background ===========
    const backgroundColor = [0, 0, 0, 1]
    gl.clearColor(...backgroundColor)
    gl.clear(gl.COLOR_BUFFER_BIT)
    //#endregion  //*======== Paint The Background ===========
}

main()