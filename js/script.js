const baseUrl = 'https://pokeapi.co/api/v2/pokemon'; //URL API
const searchInput = document.getElementById('searchInput'); //traemos los id de html
const searchBtn = document.getElementById('searchBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');   
const resetBtn = document.getElementById('resetBtn');
const app = document.getElementById('app');

//cuantos pokemon queremos òr pagina
let offset 
 = 0;
let limit = 10;


const fetchPokemon = async (baseUrl) => {
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error Pokémon:', error);
        return [];
    }
};

//mostrar los pokermon
const displayPokemon = async (pokemon) => {
    app.innerHTML = '';
    if (pokemon.length === 0) {
        app.innerHTML = 'No se encontraron Pokémon';
        return;
    }
    pokemon.forEach(async (item) => { //item es cada pokemon con su url
        const response = await fetch(item.url);
        const data = await response.json();
        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon');
        pokemonDiv.innerHTML = `
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>${data.name}</p>
        `;
        app.appendChild(pokemonDiv);
    });
};

const Busqueda = async () => {
    searchTerm = searchInput.value.toLowerCase();
    const url = searchTerm ? `${baseUrl}?limit=${limit}&offset=${offset}&name=${searchTerm}` : `${baseUrl}?limit=${limit}&offset=${offset}`;
    const pokemon = await fetchPokemon(url);
    displayPokemon(pokemon);
};



Busqueda();