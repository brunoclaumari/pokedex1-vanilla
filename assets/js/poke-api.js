const pokeapi = {};

/* const offset = 0;
const limit = 10; */

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.order = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    return pokemon
}

pokeapi.getPokemonDetail = (pokemon)=>{
    return fetch(pokemon.url)
            .then((response)=>response.json())
            .then((pokemonDetail)=> convertPokeApiDetailToPokemon(pokemonDetail))
            
}

pokeapi.getPokemons = (offset = 0, limit = 5) => {
    
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokeList)=>pokeList.map(pokeapi.getPokemonDetail))
    .then((detailRequests)=>Promise.all(detailRequests))
    .then((pokemonsDetails)=>{
        //debugger
        //console.log(pokemonsDetails)
        return pokemonsDetails
    })
    //.catch((err) => console.log(`Erro: ${err}`));
};
