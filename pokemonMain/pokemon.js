let poketainer = document.querySelector('.poketainer')
let startButton = document.querySelector('#startButton')

startButton.addEventListener('click', () => {
    loadPage()
})
// below is too specific
/* function getPokedata(url) {
    fetch(url).then(function (response) {
        response.json().then(function (pokemon) {
            console.log(pokemon.results)
            populatePokecards(pokemon.results)
        })
    })
} 
//https://pokeapi.co/api/v2/pokemon/#
getPokedata('https://pokeapi.co/api/v2/pokemon') */

//more generic function than above
async function getAPIData(url) {
    //  *look more into try/catch and async*
    try {
        const response = fetch(url)
        const data = response.json()
        return data
    }
    catch (error) {
        console.error(error)
    }
}

function loadPage() {
    getAPIData('https://pokeapi.co/api/v2/pokemon/?&limit=25').then(
        (data) => {
            for (const pokemon of data.results) {
                getAPIData(pokemon.url).then(
                    (pokeData) => {
                        populatePokecard(pokeData)
                    }
                )
            }
        }
    )
}

function populatePokecard(onePokemon) {
        let pokeScene = document.createElement('div')
        pokeScene.className = 'scene'
        let pokeCard = document.createElement('div')
        pokeCard.className = 'card'
        pokeCard.addEventListener('click', function() {
            pokeCard.classList.toggle('is-flipped')
        })

        let pokeFront = populateCardFront(onePokemon)
        let pokeBack = populateCardBack(onePokemon)

        pokeCard.appendChild(pokeFront)
        pokeCard.appendChild(pokeBack)
        pokeScene.appendChild(pokeCard)
        poketainer.appendChild(pokeScene)
}

function populateCardFront(pokeMon) {
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card-face card-face-front'
    pokeFront.textContent = `${pokeMon.name} ${pokeMon.id}`
    let frontImg = document.createElement('img')
    frontImg.src = '../images/pokeball.png'
    pokeFront.appendChild(frontImg)
    return pokeFront
}

function populateCardBack(pokeMon) {
    let pokeBack = document.createElement('div')
    pokeBack.className = 'card-back card-face-back'
    pokeBack.textContent = pokeMon.stats[0].stat.name
    return pokeBack
}