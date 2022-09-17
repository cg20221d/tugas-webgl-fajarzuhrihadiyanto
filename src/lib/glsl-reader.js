/**
 * This is a function to read glsl file from the given path,
 * then do something with the response with the given callback function
 * @param {string} path path to the glsl file
 * @return Promise
 * */
export default (path) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', path, true)
        xhr.responseType = 'text'
        xhr.onload = () => {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                resolve(xhr)
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                })
            }
        }
        xhr.send(null)
    })
}