import { films } from './films.js'
import { people } from './people.js'
import { planets } from './planets.js'
import { species } from './species.js'
import { starships } from './starships.js'
import { vehicles } from './vehicles.js'


// People
let peopleName = document.querySelector('#pName')

let counter = 1

let castList = document.createElement("ul")
people.forEach(person => {
   /*let castItem = document.createElement("li")
   castItem.textContent = person.name
   castList.appendChild(castItem)*/

   let personAnchor = document.createElement("a")
   personAnchor.href = "#"

   let personImg = document.createElement("img")
   personImg.src = `https://starwars-visualguide.com/assets/img/characters/${counter}.jpg`

   personImg.addEventListener('error', (event) => {
      //Placeholder Image
      //personImg.src = '../images/starwarspic.jpg'
      personImg.hidden = true
   })
   
   personAnchor.appendChild(personImg)
   peopleName.appendChild(personAnchor)
   counter++

   personImg.addEventListener("click", (event) => {
         let personHead = document.createElement("h3")
         personHead.textContent = person.name
         peopleName.appendChild(personHead)
   })
})




//Lists names of people
//peopleName.appendChild(castList)
