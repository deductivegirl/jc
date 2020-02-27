import { films } from './films.js'
import { people } from './people.js'
import { planets } from './planets.js'
import { species } from './species.js'
import { starships } from './starships.js'
import { vehicles } from './vehicles.js'

let peopleName = document.querySelector('#pName')
peopleName.textContent = people[0].name

let counter = 1

let castList = document.createElement("ul")
people.forEach(person => {
   let castItem = document.createElement("li")
   castItem.textContent = person.name
   castList.appendChild(castItem)

   let personImg = document.createElement("img")
   personImg.src = `https://starwars-visualguide.com/assets/img/characters/${counter}.jpg`
   peopleName.appendChild(personImg)
   counter++
})

peopleName.appendChild(castList)