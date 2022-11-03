import * as glMatrix from './gl-matrix-v3.3.0'

import readGLSL from './glsl-reader.js'
import getWebGL from './webgl-checker.js'
import glslDraw from './glsl-draw.js'
import segmentDisplay1 from '../data/segment-display-1.js'
import segmentDisplay2 from '../data/segment-display-2.js'
import segmentDisplay3 from '../data/segment-display-3.js'
import segmentDisplay4 from '../data/segment-display-4.js'

const degToRad = deg => deg * Math.PI / 180

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


    const cameraLocation = [0, 0, 7.5]

    const uTransform = gl.getUniformLocation(shaderProgram, "uTransform");
    let uView = gl.getUniformLocation(shaderProgram, "uView");
    let uProjection = gl.getUniformLocation(shaderProgram, "uProjection");

    let view = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(
      view,                   // output matrix
      cameraLocation,         // location of the eye or the camera
      [0, 0, 0],        // point where the camera look at
      [0.0, 1.0, 0.0]     // axis that pointed up (which is y-axis)
    );

    let perspective = glMatrix.mat4.create();
    glMatrix.mat4.perspective(
      perspective,              // output matrix
      degToRad(75),        // field of view (in radian)
      1.0,               // aspect ratio of the camera (square)
      0.5,                // near bound
      50.0                 // far bound
    );

    const segmentDisplay = [
        segmentDisplay1,
        segmentDisplay2,
        segmentDisplay3,
        segmentDisplay4
    ]
    const transform = segmentDisplay.map(segment => segment.transformations.map(transformation => transformation.init))

    const render = () => {
        //#region  //*=========== Paint The Background ===========
        const backgroundColor = [0, 0, 0, 1]
        gl.clearColor(...backgroundColor)
        gl.clear(gl.COLOR_BUFFER_BIT)
        //#endregion  //*======== Paint The Background ===========

        //#region  //*=========== Render All Segments ===========
        segmentDisplay.forEach((segment, segmentIdx) => {

            segment.data.forEach(value => {
                //#region  //*=========== Define Color ===========
                // Convert 0-255 scale color to 0-1 scale
                let color = value.isOn ? [57, 255, 20] : [6, 34, 0]
                color = color.map(value => value / 255)

                const coordinates = value.coordinates.map(coordinate => coordinate * 5)

                // Generate same color for every points
                const pointColor = Array(coordinates.length / 3).fill([...color, 1]).flat()
                //#endregion  //*======== Define Color ===========


                let transformationMatrix = glMatrix.mat4.create()
                segment.transformations.forEach((transformation, index) => {
                    const factorTransform = transformation.factor
                    const addFn = transformation.addFn

                    glMatrix.mat4[transformation.type](
                      transformationMatrix,
                      transformationMatrix,
                      transformation.transformFn(transform[segmentIdx][index])
                    )

                    transform[segmentIdx][index] = addFn(transform[segmentIdx][index], factorTransform)
                })

                gl.uniformMatrix4fv(uTransform, false, transformationMatrix)
                gl.uniformMatrix4fv(uView, false, view)
                gl.uniformMatrix4fv(uProjection, false, perspective)


                glslDraw(gl, shaderProgram, value.isFilled ? gl.TRIANGLE_FAN : gl.LINE_LOOP, coordinates, pointColor, value.indices)
            })
        })
        //#endregion  //*======== Render All Segments ===========
        requestAnimationFrame(render)
    }

    requestAnimationFrame(render)
}

// Run main on script load
main()