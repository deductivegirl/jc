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
        let card = document.createElement('div')
        card.className = 'card'
        let cardContent = document.createElement('div')
        cardContent.className = 'content'
        let cardFront = document.createElement('div')
        cardFront.className = 'front'
        cardFront.textContent = 'Front'
        let cardBack = document.createElement('div')
        cardBack.className = 'back'
        cardBack.textContent = 'Back'

        cardContent.appendChild(cardFront)
        cardContent.appendChild(cardBack)
        card.appendChild(cardContent)
        poketainer.appendChild(card)
    })
}