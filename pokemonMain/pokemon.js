let poketainer = document.querySelector('.poketainer')

//too specific
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

function populatePokecard(pokemon) {
    pokemonArray.forEach((pokemon) => {
        let pokeScene = document.createElement('div')
        pokeScene.className = 'scene'
        let pokeCard = document.createElement('div')
        pokeCard.className = 'card'
        pokeCard.addEventListener('click', function() {
            pokeCard.classList.toggle('is-flipped')
        })

        let pokeFront = document.createElement('div')
        pokeFront.className = 'card-face card-face-front'
        pokeFront.textContent = pokemon.name
        let pokeBack = document.createElement('div')
        pokeBack.className = 'card-face card-face-back'
        pokeBack.textContent = 'Back'

        pokeCard.appendChild(pokeFront)
        pokeCard.appendChild(pokeBack)
        pokeScene.appendChild(pokeCard)
        poketainer.appendChild(pokeScene)
    })
}

