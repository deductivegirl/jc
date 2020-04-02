import { senators } from './senators.js'
//import { representatives } from './representatives.js'

const container = document.querySelector('.container')

//filter, map, reduce

const filterSenators = (prop, value) => {
    return senators.filter(senator => senator[prop] === value)
}

const mappedSenators = senators.map(senator => {
    let middleName = senator.middle_name ? ` ${senator.middle_name}` : ` `
    return {
        id: senator.id,
        name: `${senator.first_name}${middleName}${senator.last_name}`,
        imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`
        
    }
})

function populateContainer(smallSenatorsArray) {
    console.log(smallSenatorsArray)
    smallSenatorsArray.forEach(senator => {
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

populateContainer(mappedSenators)