import { senators } from '../congress/senators.js'
import { representatives } from '../congress/representatives.js'

const container = document.querySelector('.container')

const filterSenators = (prop, value => {
    return senators.filter(senator => senator[prop] === value)
})

function populateContainer() {
    senators.forEach(senator => {
        let middleName = senator.middle_name ? ` ${senator.middle_name}` : ` `
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')

        figImg.src = `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`

        figCaption.textContent = `${senator.first_name}${middleName}${senator.last_name}`

        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        container.appendChild(senFigure)
    })
}

populateContainer()

console.log(filterSenators('party', 'R'))
console.log(filterSenators('party', 'D'))
console.log(filterSenators('party', 'ID'))