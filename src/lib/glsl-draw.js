/**
 * This is a function to draw shape on the canvas
 * @param gl gl object
 * @param shaderProgram program used to draw
 * @param type shape type
 * @param vertices list of coordinates
 * @param colors color for each vertex
 * @param indices
 * @return void
 * */
export default (gl, shaderProgram, type, vertices, colors, indices) => {
    //#region  //*=========== Create VertexBuffer ===========
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    const aPosition = gl.getAttribLocation(shaderProgram, 'aPosition')
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(aPosition)
    //#endregion  //*======== Create VertexBuffer ===========

    //#region  //*=========== Create IndicesBuffer ===========
    const indicesBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
    //#endregion  //*======== Create IndicesBuffer ===========

    //#region  //*=========== Create Color Buffer ===========
    const colorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

    const aColor = gl.getAttribLocation(shaderProgram, 'aColor')
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(aColor)
    //#endregion  //*======== Create Color Buffer ===========

    // Draw vertices into the canvas
    // gl.drawArrays(type, 0, vertices.length/2)
    gl.drawElements(type, indices.length, gl.UNSIGNED_SHORT, 0)
}