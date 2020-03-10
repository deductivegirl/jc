export function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

export function getEndNumber(url) {
    let end = url.lastIndexOf('/')
    let start = end - 2
 
    if (url.charAt(start) === '/') 
       start++
 
    return url.slice(start, end)
}