import * as glMatrix from './gl-matrix-v3.3.0/index.js'

import readGLSL from './glsl-reader.js'
import getWebGL from './webgl-checker.js'
import glslDraw from './glsl-draw.js'
import segmentDisplay1 from '../data/segment-display-1.js'
import segmentDisplay2 from '../data/segment-display-2.js'
import segmentDisplay3 from '../data/segment-display-3.js'
import segmentDisplay4 from '../data/segment-display-4.js'
import cube from '../data/cube.js'
import ambient from './lighting/ambient.js'
import point from './lighting/point.js'

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

    //#region  //*=========== Configure Camera and Projection ===========
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
    //#endregion  //*======== Configure Camera and Projection ===========

    const segmentDisplay = [
        segmentDisplay1,
        cube,
        // segmentDisplay2,
        // segmentDisplay3,
        segmentDisplay4
    ]

    //#region  //*=========== Configure Event Listener ===========
    const isTransform = segmentDisplay.map(segment => segment.initIsTransform)
    const transformMultiplier = segmentDisplay.map(segment => segment.transformMultiplier)

    segmentDisplay.forEach((segment, index) => {
        const events = segment.events?.(isTransform, transformMultiplier, index)
        events?.forEach(event => {
            document.addEventListener(event.eventName, event.callback)
        })
    })
    //#endregion  //*======== Configure Event Listener ===========

    const theta = segmentDisplay.map(segment => segment.transformations?.map(transformation => transformation.theta))


    let cubeSpeedX = 0
    let cubeSpeedZ = 0
    let cubePosX = 0
    let cubePosZ = 0

    //#region  //*=========== Configure Lighting ===========
    const ambientColor = [1,1,1] // White in 0-1 scale rgb mode
    const ambientIntensity = (248 + 300)/1000
    ambient(gl, shaderProgram, ambientColor, ambientIntensity)

    //#endregion  //*======== Configure Lighting ===========


    const onKeyDown = event => {
        if (event.keyCode == 73) {
            cubeSpeedZ = -0.01;
        } else if (event.keyCode == 75) {
            cubeSpeedZ = 0.01;
        }

        if (event.keyCode == 74) {
            cubeSpeedX = -0.01;
        } else if (event.keyCode == 76) {
            cubeSpeedX = 0.01;
        }
    }

    function onKeyup(event) {
        if (event.keyCode == 73 || event.keyCode == 75) cubeSpeedZ = 0.0;
        if (event.keyCode == 74 || event.keyCode == 76) cubeSpeedX = 0.0;
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyup)



    const uNormalModel = gl.getUniformLocation(shaderProgram, 'uNormalModel')

    const render = () => {
        
        gl.enable(gl.DEPTH_TEST)

        //#region  //*=========== Paint The Background ===========
        const backgroundColor = [0, 0, 0, 1]
        gl.clearColor(...backgroundColor)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        //#endregion  //*======== Paint The Background ===========

        //#region  //*=========== Render All Segments ===========
        segmentDisplay.forEach((segment, segmentIdx) => {
            if (!segment.isCube) {
                segment.data.forEach(value => {
                    //#region  //*=========== Define Color ===========
                    // Convert 0-255 scale color to 0-1 scale
                    if (value.hello) console.log(value)
                    let color = value.color || (value.isOn ? [57, 255, 20] : [6, 34, 0])
                    color = color.map(value => value / 255)
                    if (value.hello) console.log(color)

                    // Scale up shape by 5 to look bigger
                    const coordinates = value.coordinates.map(coordinate => coordinate * 5)

                    // Generate same color for every points
                    const pointColor = Array(coordinates.length / 3).fill([...color, 1]).flat()
                    //#endregion  //*======== Define Color ===========


                    //#region  //*=========== Configure Transformation Matrix foreach Segment ===========
                    let transformationMatrix = glMatrix.mat4.create()
                    segment.transformations?.forEach((transformation, index) => {
                        const factorTransform = transformation.factor
                        const addFn = transformation.addFn

                        glMatrix.mat4[transformation.type](
                        transformationMatrix,
                        transformationMatrix,
                        transformation.transformFn(theta[segmentIdx][index])
                        )

                        // only change theta if transform flag is true
                        if (isTransform[segmentIdx]) {
                            theta[segmentIdx][index] = addFn(theta[segmentIdx][index], factorTransform, transformMultiplier[segmentIdx])
                        }
                    })
                    //#endregion  //*======== Configure Transformation Matrix foreach Segment ===========

                    gl.uniformMatrix4fv(uTransform, false, transformationMatrix)
                    gl.uniformMatrix4fv(uView, false, view)
                    gl.uniformMatrix4fv(uProjection, false, perspective)
                    
                    //#region  //*=========== Normal Model ===========
                    const normalModel = glMatrix.mat3.create()
                    glMatrix.mat3.normalFromMat4(normalModel, transformationMatrix)
                    gl.uniformMatrix3fv(uNormalModel, false, normalModel)
                    //#endregion  //*======== Normal Model ===========

                    
                    const uShininessConstant = gl.getUniformLocation(shaderProgram, 'uShininessConstant')
                    gl.uniform1f(uShininessConstant, segment.shininessConstant)

                    glslDraw(gl, shaderProgram, value.isFilled ? gl.TRIANGLE_FAN : gl.LINE_LOOP, coordinates, pointColor, value.indices, value.normal)
                })
            } else {
                segment.data.forEach(value => {
                    //#region  //*=========== Define Color ===========
                    // Convert 0-255 scale color to 0-1 scale
                    let color = value.color || (value.isOn ? [57, 255, 20] : [6, 34, 0])
                    color = color.map(value => value / 255)

                    // Scale up shape by 5 to look bigger
                    const coordinates = value.coordinates.map(coordinate => coordinate * 5)

                    // Generate same color for every points
                    const pointColor = Array(coordinates.length / 3).fill([...color, 1]).flat()
                    //#endregion  //*======== Define Color ===========


                    //#region  //*=========== Configure Transformation Matrix foreach Segment ===========
                    let transformationMatrix = glMatrix.mat4.create()
                    
                    cubePosX += cubeSpeedX;
                    cubePosZ -= cubeSpeedZ;
                    console.log(cubePosX)
                    console.log(cubePosZ)
                    glMatrix.mat4.translate(
                        transformationMatrix, transformationMatrix, [cubePosX, 0.0, cubePosZ]
                    );
                    //#endregion  //*======== Configure Transformation Matrix foreach Segment ===========

                    gl.uniformMatrix4fv(uTransform, false, transformationMatrix)
                    gl.uniformMatrix4fv(uView, false, view)
                    gl.uniformMatrix4fv(uProjection, false, perspective)
                    
                    //#region  //*=========== Normal Model ===========
                    const normalModel = glMatrix.mat3.create()
                    glMatrix.mat3.normalFromMat4(normalModel, transformationMatrix)
                    gl.uniformMatrix3fv(uNormalModel, false, normalModel)
                    //#endregion  //*======== Normal Model ===========

                    glslDraw(gl, shaderProgram, value.isFilled ? gl.TRIANGLE_FAN : gl.LINE_LOOP, coordinates, pointColor, value.indices, value.normal, segment.shininessConstant)
                })
            }
            
            point(gl, shaderProgram, [cubePosX,0,cubePosZ])


        })
        //#endregion  //*======== Render All Segments ===========
        requestAnimationFrame(render)
    }

    requestAnimationFrame(render)
}

// Run main on script load
main()