import { starships } from '../star_wars/starships.js'
import { removeChildren, getEndNumber } from '../utils.js'


const nav = document.querySelector('.starshipNav')
const navList = document.querySelector('.starshipNavList')

const shipView = document.querySelector('#starshipMain')

const modalDialog = document.querySelector('.modal')
const modalButton = document.querySelector('.modal-close')
const modalBackground = document.querySelector('.modal-background')
const modalMessage = document.querySelector('.dialogMessage')

modalButton.addEventListener('click', () => {
    modalDialog.classList.toggle("is-active")
})

modalBackground.addEventListener('click', () => {
    modalDialog.classList.toggle("is-active")
})

// clickable list of starship names
function populateNav(starships) {
    starships.forEach(starship => {
        let shipAnchor = document.createElement('a')
        shipAnchor.href = '#'

        let listItem = document.createElement('li')
        listItem.textContent = starship.name

        shipAnchor.addEventListener('click', event => {
            //stores name of clicked list item 
            let shipName = event.target.textContent
            const foundShip = starships.find(ship => ship.name === shipName)
            console.log(foundShip)
            populateShipView(foundShip)
        })
        shipAnchor.appendChild(listItem)
        navList.appendChild(shipAnchor)
    })
    nav.appendChild(navList)
}

// Creates ship name to display
function populateShipView(shipData) {
    removeChildren(shipView)
    // gets ship image from url
    let imageNumber = getEndNumber(shipData.url)
    let shipImage = document.createElement('img')
    shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${imageNumber}.jpg`
    
    // Error images
    shipImage.addEventListener('error', (event) => {
        shipImage.hidden = true
        modalDialog.classList.toggle("is-active")
        modalMessage.textContent = `Sorry, image of ${shipData.name} is unavaliable.`
     })
    shipView.appendChild(shipImage)
}

populateNav(starships)