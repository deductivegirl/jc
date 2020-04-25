import { representatives } from './representatives.js'

const container = document.querySelector('.container')

let repButton = document.querySelector('#repButton')

repButton.addEventListener("click", () => {
    populateContainer(simpMapReps(representatives))
})

//filter, map, reduce

const filterReps = (prop, value) => {
    return representatives.filter(rep => rep[prop] === value)
}

function simpMapReps(repArrary) { 
    return repArrary.map(rep => {
        let middleName = rep.middle_name ? ` ${rep.middle_name}` : ` `
        return {
            id: rep.id,
            name: `${rep.first_name}${middleName} ${rep.last_name}`,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${rep.govtrack_id}-200px.jpeg`,
            seniority: parseInt(rep.seniority, 10),
            votesWithPartyPct: rep.votes_with_party_pct,
            party: rep.party,
            missed_votes_pct: rep.missed_votes_pct,
        }
    })
}

function populateContainer(smallRepsArray) {
    return smallRepsArray.forEach(rep => {
        let repDiv = document.createElement('div')
        let repFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')
        let partyIcon = document.createElement('i')

        if (rep.party === 'D') partyIcon.className = 'fas fa-democrat'
        if (rep.party === 'R') partyIcon.className = 'fas fa-republican'
        if (rep.party === 'ID') partyIcon.className = 'fas fa-star'

        figImg.src = rep.imgURL
        figCaption.textContent = rep.name

        figCaption.appendChild(partyIcon)
        repFigure.appendChild(figImg)
        repFigure.appendChild(figCaption)
        repDiv.appendChild(repFigure)
        repDiv.appendChild(progressBars(rep))
        container.appendChild(repDiv)
    })
}

function progressBars(rep) {
    let progressDiv = document.createElement('div')
    progressDiv.className = 'progressDiv'
    let seniorityLabel = document.createElement('label')
    seniorityLabel.for = 'seniority'
    seniorityLabel.textContent = 'Seniority'
    let seniorityBar = document.createElement('progress')
    seniorityBar.id = 'seniority'
    seniorityBar.max = 100
    seniorityBar.value = parseInt((rep.seniority / mostSeniority.seniority) * 100)

    progressDiv.appendChild(seniorityLabel)
    progressDiv.appendChild(seniorityBar)
    return progressDiv
}

//filterSenators(what you're checking, what you're looking for)
const republicans = filterReps('party', 'R')
const democrats = filterReps('party', 'D')
const independents = filterReps('party', 'ID')

const mostSeniority = simpMapReps(democrats).reduce(
    (acc, rep) => {
        return acc.seniority > rep.seniority ? acc : rep
    }
)

console.log(mostSeniority)





//const mostMissedVotes = simpMapSenators(senators).reduce((acc, senator) => {
//    return acc.missed_votes_pct > senator.missed_votes_pct ? acc : senator
//})

/*const loyalArray = simpMapSenators(senators).map(senator => {
    if (senator.votesWithPartyPct === 100) {
        return senator
    }
})*/

//let loyalArray = []
//
//const mostLoyal = simpMapSenators(senators).reduce((acc, senator) => {
//    if (senator.votesWithPartyPct === 100) {
//        loyalArray.push(senator)
//    }
//    return acc.votesWithPartyPct > senator.votesWithPartyPct ? acc : senator
//})


//console.log(loyalArray)
//console.log(mostMissedVotes)