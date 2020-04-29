let poketainer = document.querySelector(".poketainer")
let startButton = document.querySelector("#startButton")
let newButton = document.querySelector("#newButton")
let addButton = document.querySelector('#addButton')
let down = document.getElementById("#down")
let num = 25

newButton.hidden = true
addButton.hidden = true
startButton.addEventListener("click", () => {
  loadPage(0, num, false)
  startButton.hidden = true
  newButton.hidden = false
  addButton.hidden = false
})
newButton.addEventListener("click", () => {
  loadPage(num++, 1, true)
})
addButton.addEventListener("click", () => {
  addPokemon()
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
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

function loadPage(offset, limit, shouldScroll) {
  getAPIData(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`).then(
    async (data) => {
      let lastCardId = null
      for (const pokemon of data.results) {
        await getAPIData(pokemon.url).then((pokeData) => {
          populatePokecard(pokeData)
          lastCardId = pokeData.id
        })
      }
      if (lastCardId !== null && shouldScroll) {
        document.getElementById(lastCardId).scrollIntoView({ behavior: "smooth" })
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

  pokeCard.id = onePokemon.id

  let pokeFront = populateCardFront(onePokemon)
  let pokeBack = populateCardBack(onePokemon)

  pokeCard.appendChild(pokeFront)
  pokeCard.appendChild(pokeBack)
  pokeScene.appendChild(pokeCard)
  poketainer.appendChild(pokeScene)

  return poketainer.getBoundingClientRect()
}

function populateCardFront(pokemon) {
  let cardFront = document.createElement("div")
  cardFront.className = "card_face card_face-front"

  let frontImg = document.createElement("img")
  frontImg.className = "frontImg"
  frontImg.src = `https://pokeres.bastionbot.org/images/pokemon/${getImageFileName(pokemon)}.png`

  let frontLabel = document.createElement("p")
  frontLabel.className = "frontLabel"
  frontLabel.textContent = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`
  cardFront.appendChild(frontImg)
  cardFront.appendChild(frontLabel)
  return cardFront
}

function getImageFileName(pokemon) {
  if (pokemon.id < 900) {
    return pokemon.id
  } else return `pokeball`
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

class Pokemon {
  constructor(height, weight, name, abilities, moves) {
    this.height = height
    this.weight = weight
    this.name = name
    this.abilities = abilities
    this.moves = moves
    this.id = 900
  }
}

function addPokemon() {
  let newPokemon = new Pokemon(50,25,'Carebear', 
  [
    { ability: { name: 'Rainbow rescue' } },
    { ability: { name: 'Stare' } }
  ],
  [
    { move: {name: 'Healhug' },
      version_group_details: [ { level_learned_at: 0 } ] }
  ])
  return populatePokecard(newPokemon)
}