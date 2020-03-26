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

export function addStarfield(element, numStar) {
    element.style.setProperty('background-color', 'black')
    for (let i = 0; i < numStar; i++) {
        let star = document.createElement('div')
        star.style.setProperty('position', 'absolute')
        star.style.setProperty('width', '5px')
        star.style.setProperty('height', '5px')
        star.style.setProperty('background-color', 'white')
        star.style.left = '100px'
        star.style.top = '100px'
        element.appendChild(star)
    }
}

function getRandomPosition() {
    let x = document.body.scrollHeight
    let y = document.body.scrollWidth
    let randomY = Math.floor(Math.random() * y)
}