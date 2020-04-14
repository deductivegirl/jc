let poketainer = document.querySelector('.poketainer')
let startButton = document.querySelector('#startButton')
let newButton = document.querySelector('#newButton')


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

function populateCardFront(pokemon) {
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card-face card-face-front'
    pokeFront.textContent = `${pokemon.name} ${pokemon.id}`
    let frontImg = document.createElement('img')
    frontImg.src = `../images/pokemons/${getImageFileName(pokemon)}`
    pokeFront.appendChild(frontImg)
    return pokeFront
}

function getImageFileName(pokemon) {
    if (pokemon.id < 10) {
        return `00${pokemon.id}`
    } else if (pokemon.id < 100 && pokemon.id > 9) {
        return `0${pokemon.id}`
    } else {
        return `Pokeball.png`
    }
}

function populateCardBack(pokemon) {
    let pokeBack = document.createElement('div')
    pokeBack.className = 'card-back card-face-back'
    pokeBack.textContent = pokemon.stats[0].stat.name
    return pokeBack
}

class Pokemon {
    constructor(height, weight, name, stats) {
        this.height = height
        this.weight = weight
        this.name = name
        this.stats = stats
        this.id = 900
    }
}

function addPokemon() {
    let newPokemon = new Pokemon(50, 25, 'Thoreon', [ { stat: { name: 'Thunder Belly' } } ])
    populatePokecard(newPokemon)
}