import { senators } from './senators.js'
//import { representatives } from './representatives.js'

const container = document.querySelector('.container')

//filter, map, reduce

const filterSenators = (prop, value) => {
    return senators.filter(senator => senator[prop] === value)
}

function simpMapSenators(senatorArray) { 
    return senatorArray.map(senator => {
        let middleName = senator.middle_name ? ` ${senator.middle_name}` : ` `
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName} ${senator.last_name}`,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
            seniority: parseInt(senator.seniority, 10),
        }
    })
}

function populateContainer(smallSenatorsArray) {
    return smallSenatorsArray.forEach(senator => {
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')

        figImg.src = senator.imgURL
        figCaption.textContent = senator.name

        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        container.appendChild(senFigure)
    })
}

//filterSenators(what you're checking, what you're looking for)
const republicans = filterSenators('party', 'R')
const democrats = filterSenators('party', 'D')
const independents = filterSenators('party', 'ID')

const mostSeniority = simpMapSenators(republicans).reduce(
    (acc, senator) => {
        return acc.seniority > senator.seniority ? acc : senator
    }, {}
)

console.log(mostSeniority)

populateContainer(simpMapSenators(republicans))