/*Conversão de dados*/
const translationDictionary = {
    "normal": "normal",
    "fire": "fogo",
    "water": "água",
    "grass": "grama",
    "electric": "elétrico",
    "ice": "gelo",
    "fighting": "lutador",
    "poison": "venenoso",
    "ground": "terrestre",
    "flying": "voador",
    "psychic": "psíquico",
    "bug": "inseto",
    "rock": "pedra",
    "ghost": "fantasma",
    "dragon": "dragão",
    "dark": "sombrio",
    "steel": "aço",
    "fairy": "fada"
}; 
const translateType = (type) => {
    return translationDictionary[type] || type;
};
const formatHeightInM = (heightInM) => {
    return heightInM.toFixed(1);
};
const formatWeightInKG = (weightInKG) => {
    return weightInKG.toFixed(1);
};
//
/*---Pokemon---*/
const pokemonName = document.querySelector('.pokemon_name');
const pokemonID = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_image');
const pokemonPeso = document.querySelector('.pokemon_peso');
const pokemonAltura = document.querySelector('.pokemon_altura');
const pokemonTipo = document.querySelector('.pokemon_tipo');

/*---Pesquisa---*/
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonAnterior = document.querySelector('.anterior');
const buttonProximo = document.querySelector('.proximo');

/*---Áudio tema---*/
const buttonSom = document.getElementById('som');
const audio = document.getElementById('audio');
const icon = document.getElementById('icon');
const iconLigado = './images/audioligado.png';
const iconDesligado = './images/audiodesligado.png';

let searchPokemon = 1;

const fetchPokemon = async (pokemon)=> {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){
    const data = await APIResponse.json();
    return data;
}}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Carregando...";
    pokemonID.innerHTML = "";
    const data = await fetchPokemon(pokemon);


    if(data){
    pokemonImg.style.display = "block";
    pokemonImg.src = data['sprites']['other']['dream_world']['front_default'];
    pokemonName.innerHTML = data.name;
    pokemonID.innerHTML = data.id;
    
    const weightInKG = data.weight / 10;
    pokemonPeso.innerHTML = "Peso:" + formatWeightInKG(weightInKG) + "kg";
    
    const heightInM = data.height / 10;
    pokemonAltura.innerHTML = "Altura:" + formatHeightInM(heightInM) + "m";
    
    const pokemonType = data.types[0].type.name;
    const translatedType = translateType(pokemonType);
    pokemonTipo.innerHTML = "Tipo:" + translatedType;

  
    input.value = '';

    searchPokemon = data.id;

   
}else{
    pokemonImg.style.display = "none";
    pokemonName.innerHTML = "Não tem!";
    pokemonID.innerHTML = "";
    pokemonPeso.innerHTML = "";
    pokemonAltura.innerHTML = "";
    pokemonTipo.innerHTML = ""; 
}}

form.addEventListener('submit', (event)=> {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonAnterior.addEventListener('click', ()=> {
if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
}});

buttonProximo.addEventListener('click', ()=> {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

buttonSom.addEventListener('click', ()=> {
    if (audio.paused) {
        audio.play();
        icon.src = iconLigado; 
    } else {
        audio.pause();
        icon.src = iconDesligado; 
    }
});

renderPokemon(searchPokemon);