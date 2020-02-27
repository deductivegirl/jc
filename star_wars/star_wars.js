import { films } from './films.js'
import { people } from './people.js'
import { planets } from './planets.js'
import { species } from './species.js'
import { starships } from './starships.js'
import { vehicles } from './vehicles.js'

let peopleName = document.querySelector('#pName')

let counter = 1

let castList = document.createElement("ul")
people.forEach(person => {
   let castItem = document.createElement("li")
   castItem.textContent = person.name
   castList.appendChild(castItem)

   let personAnchor = document.createElement("a")
   personAnchor.href = "#"

   let personImg = document.createElement("img")
   personImg.src = `https://starwars-visualguide.com/assets/img/characters/${counter}.jpg`

   personImg.addEventListener('error', (event) => {
      //personImg.src = '../images/starwarspic.jpg'
      personImg.hidden = true
   })

   personImg.addEventListener("click", function (event) {
      console.log("hi")
   })

   personAnchor.appendChild(personImg)
   peopleName.appendChild(personAnchor)
   counter++
})

peopleName.appendChild(castList)
