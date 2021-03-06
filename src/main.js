import data from './pokemon.js';
import {searchByName, selectType, calcType, orderBy} from './data.js'

const pokemons = data.pokemon.slice(0, 251);
const cardPokemon = document.getElementById("card");


function cardsPokemon(pokemonArray) {
    let cards = "";
    pokemonArray.forEach(pokemonAtual => {
        const types = pokemonAtual.type;
        cards +=
            `<div class="card ${types[0]}">
            <img class="card-image " alt="${pokemonAtual.name}" src="https://www.serebii.net/pokemongo/pokemon/${pokemonAtual.num}.png" />
            <h2 class="card-title"> ${pokemonAtual.num}. ${pokemonAtual.name} </h2>
            <p class="card-subtitle" id="card-subtitle">${pokemonAtual.size.height} | ${pokemonAtual.size.weight} </p>
            <p class="card-subtitle2" id="card-subtitle2">${types.join(' | ')} </p>
            <p class="card-subtitle3" id="card-subtitle">${pokemonAtual.generation.name} </p>
            </div>`;

    });
    cardPokemon.innerHTML = cards;
}

cardsPokemon(pokemons);

// Filtros tipo select 

const filterSelectType = document.querySelector("#filter-type");

filterSelectType.addEventListener("change", () => {
    const filterType = filterSelectType.value;
    const arrayFiltered = selectType(filterType, pokemons);
    cardsPokemon(arrayFiltered);
    typePercent();
})

function typePercent() {
    document.getElementById("aggregate-calculation").innerHTML = "";
    const filterType = document.getElementById("filter-type").value;
    let result = calcType(pokemons, filterType);

    document.getElementById("aggregate-calculation").innerText += `Entre os tipos de Pokemóns selecionado representam ${result}% do total.`
}


// Filtro de ordem select

const filterSelectOrder = document.querySelector("#order-search");

filterSelectOrder.addEventListener("change", (event) => {
    const orderType = event.target.value;
    const arrayOrdered = orderBy(orderType, pokemons);
    cardsPokemon(arrayOrdered);
})

// Filtro por input (texto) de nome

const filterInputType = document.querySelector("#search-input");

filterInputType.addEventListener("change", () => {
    const filterName = filterInputType.value;
    const arrayFiltered = searchByName(filterName, pokemons);
    cardsPokemon(arrayFiltered);
})

filterInputType.addEventListener("keyup", (event) => {

    if (event.keyCode === 13) {
        event.preventDefault();
    }

    const filterName = event.target.value;
    const arrayFiltered = searchByName(filterName, pokemons);
    cardsPokemon(arrayFiltered);

})

