let poketainer = document.querySelector('.poketainer')

function getPokedata(url) {
    fetch(url).then(function (response) {
        response.json().then(function (pokemon) {
            console.log(pokemon.results)
            populatePokecards(pokemon.results)
        })
    })
}

//https://pokeapi.co/api/v2/pokemon/#
getPokedata('https://pokeapi.co/api/v2/pokemon')

function populatePokecards(pokemonArray) {
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
        pokeFront.textContent = 'Front'
        let pokeBack = document.createElement('div')
        pokeBack.className = 'card-face card-face-back'
        pokeBack.textContent = 'Back'

        pokeCard.appendChild(pokeFront)
        pokeCard.appendChild(pokeBack)
        pokeScene.appendChild(pokeCard)
        poketainer.appendChild(pokeScene)
    })
}

