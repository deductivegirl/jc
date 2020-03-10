import { films } from './films.js'
import { people } from './people.js'
import { planets } from './planets.js'
import { removeChildren, getEndNumber } from '../utils.js'
import { species } from './species.js'
import { vehicles } from './vehicles.js'

// People
let gallery = document.querySelector('#gallery')

const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')
const otherCharacters = people.filter(person => 
   person.gender === 'n/a' ||
   person.gender === 'none' ||
   person.gender === 'hermaphrodite',
   )

let maleButton = document.querySelector('#maleButton')
let femaleButton = document.querySelector('#femaleButton')
let otherButton = document.querySelector('#otherButton')

maleButton.addEventListener('click', function(event) { populateDOM(maleCharacters) })
femaleButton.addEventListener('click', function(event) { populateDOM(femaleCharacters) })
otherButton.addEventListener('click', function(event) { populateDOM(otherCharacters) })

}

function populateDOM (characters) {
   removeChildren(gallery)

   characters.forEach(person => {
      let imageNumber = getEndNumber(person.url)
      let personAnchor = document.createElement("a")
      personAnchor.href = "#"

      let personImg = document.createElement("img")
      personImg.src = `https://starwars-visualguide.com/assets/img/characters/${imageNumber}.jpg`

      personImg.addEventListener('error', (event) => {
         //Placeholder Image
         //personImg.src = '../images/starwarspic.jpg'
         personImg.hidden = true
      })
      personImg.addEventListener("click", (event) => {
         let personHead = document.createElement("h3")
         personHead.textContent = person.name
         gallery.appendChild(personHead)
      })

      personAnchor.appendChild(personImg)
      gallery.appendChild(personAnchor)
   })
}

populateDOM(people)