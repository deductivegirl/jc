let poketainer = document.querySelector(".poketainer")
let startButton = document.querySelector("#startButton")
let newButton = document.querySelector("#newButton")
let down = document.getElementById("#down")
let num = 25

newButton.hidden = true
startButton.addEventListener("click", () => {
  loadPage(0, 25)
  startButton.hidden = true
  newButton.hidden = false
})
newButton.addEventListener("click", () => {
  loadPage(num++, 1)
  down.scrollIntoView(false)
})



//const pokemonRect = loadPage(num++, 1)
//  window.scrollTo({
//    left: pokemonRect.left,
//    behavior: 'smooth'
//})

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
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

function loadPage(offset, limit) {
  getAPIData(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`).then(
    async (data) => {
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) => {
        populatePokecard(pokeData)
      })
    }
  })
}

function populatePokecard(onePokemon) {
  let pokeScene = document.createElement("div")
  pokeScene.className = "scene"
  let pokeCard = document.createElement("div")
  pokeCard.className = "card"
  pokeCard.addEventListener("click", function () {
    pokeCard.classList.toggle("is-flipped")
  })

  let pokeFront = populateCardFront(onePokemon)
  let pokeBack = populateCardBack(onePokemon)

  pokeCard.appendChild(pokeFront)
  pokeCard.appendChild(pokeBack)
  pokeScene.appendChild(pokeCard)
  poketainer.appendChild(pokeScene)
  return pokeScene.getBoundingClientRect()
}

function populateCardFront(pokemon) {
  let cardFront = document.createElement("div")
  cardFront.className = "card_face card_face-front"

  let frontImg = document.createElement("img")
  frontImg.className = "frontImg"
  frontImg.src = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`

  let frontLabel = document.createElement("p")
  frontLabel.className = "frontLabel"
  frontLabel.textContent = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`
  cardFront.appendChild(frontImg)
  cardFront.appendChild(frontLabel)
  return cardFront
}

function getImageFileName(pokemon) {
  if (pokemon.id < 10) {
    return `00${pokemon.id}`
  } else if (pokemon.id < 100 && pokemon.id > 9) {
    return `0${pokemon.id}`
  } else if (pokemon.id >= 100) {
    return pokemon.id
  } else return `Pokeball.png`
}

function populateCardBack(pokemon) {
  let cardBack = document.createElement("div")
  cardBack.className = "card_face card_face-back"
  let abilityList = document.createElement("ul")
  abilityList.textContent = 'Abilities: '
  pokemon.abilities.forEach(ability => {
    let abilityName = document.createElement("li")
    abilityName.textContent = `${ability.ability.name.charAt(0).toUpperCase()}${ability.ability.name.slice(1)}`
    abilityList.appendChild(abilityName)
  })
  let moveList = document.createElement('p')
  moveList.className = "moves"
  getPokemonMoves(pokemon, 0).then(moves => moveList.textContent = `Level 0 Moves: ${moves.length}`)
  cardBack.appendChild(abilityList)
  cardBack.appendChild(moveList)
  return cardBack
}

async function getPokemonMoves(pokemon, levelLearned) {
  //console.log(`Name: ${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)} |Number of Moves: ${pokemon.moves.length}`)
  let temp = pokemon.moves.filter(move => {
    return move.version_group_details[0].level_learned_at === levelLearned
  })
  return temp
}

//https://pokeapi.co/api/v2/pokemon/#