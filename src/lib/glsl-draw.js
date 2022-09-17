/**
 * This is a function to draw shape on the canvas
 * @param gl gl object
 * @param shaderProgram program used to draw
 * @param type shape type
 * @param vertices list of coordinates
 * @param colors color for each vertex
 * @return void
 * */
export default (gl, shaderProgram, type, vertices, colors) => {
    //#region  //*=========== Create VertexBuffer ===========
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    const aPosition = gl.getAttribLocation(shaderProgram, 'aPosition')
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(aPosition)
    //#endregion  //*======== Create VertexBuffer ===========

    //#region  //*=========== Create Color Buffer ===========
    const colorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

    const aColor = gl.getAttribLocation(shaderProgram, 'aColor')
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(aColor)
    //#endregion  //*======== Create Color Buffer ===========

    // Draw vertices into the canvas
    gl.drawArrays(type, 0, vertices.length/2)
}