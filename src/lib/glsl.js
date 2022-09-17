import readGLSL from './glsl-reader.js'
import getWebGL from './webgl-checker.js'
import glslDraw from './glsl-draw.js'
import segmentDisplay1 from '../data/segment-display-1.js'
import segmentDisplay2 from '../data/segment-display-2.js'
import segmentDisplay3 from '../data/segment-display-3.js'
import segmentDisplay4 from '../data/segment-display-4.js'

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

    //#region  //*=========== Render All Segments ===========
    const segmentDisplay = [segmentDisplay1, segmentDisplay2, segmentDisplay3, segmentDisplay4]
    segmentDisplay.forEach(segment => {
        segment.forEach(value => {
            //#region  //*=========== Define Color ===========
            // Convert 0-255 scale color to 0-1 scale
            let color = value.isOn ? [57, 255, 20] : [6, 34, 0]
            color = color.map(value => value / 255)

            // Generate same color for every points
            const pointColor = Array(value.coordinates.length/2).fill([...color, 1]).flat()
            //#endregion  //*======== Define Color ===========


            glslDraw(gl, shaderProgram, value.isFilled ? gl.TRIANGLE_FAN : gl.LINE_LOOP, value.coordinates, pointColor)
        })
    })
    //#endregion  //*======== Render All Segments ===========
}

// Run main on script load
main()