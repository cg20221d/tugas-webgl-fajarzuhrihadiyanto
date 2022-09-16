/**
 * This is a function to check if webGL is available or not,
 * if available, this function will return the gl
 * @param {HTMLElement} canvas canvas element
 * @return gl
 * */
export default (canvas) => {
    const contexts = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"]
    let gl
    for (let i=0; i < contexts.length; i++) {
        try {
            gl = canvas.getContext(contexts[i])
        } catch (e) {
            alert('Error on canvas get context')
        }

        if (gl) break
    }

    if (!gl) {
        alert("ERROR : WebGL is not available");
    }

    return gl
}