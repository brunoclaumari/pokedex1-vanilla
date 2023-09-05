const pokeapi = {};

const urlSpecies = "https://pokeapi.co/api/v2/pokemon-species";
const urlEvolution = "https://pokeapi.co/api/v2/evolution-chain";

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.id = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    //debugger
    //pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.photo = pokeDetail.sprites.versions["generation-v"]["black-white"].animated.front_default
    
    return pokemon
}

function convertDetailToPokemonSpecies(returnSpecies){
    const pokSpecies = new PokemonSpecies();
    
    pokSpecies.species = returnSpecies.genera
                        .filter((obj)=>obj.language.name === "en")
                        .map((obj)=>obj.genus);
    pokSpecies.egg_groups = returnSpecies.egg_groups.map((item)=>item.name);
    pokSpecies.evolution_chains_url = returnSpecies.evolution_chain.url;
    pokSpecies.shape = returnSpecies.shape.name;

    return pokSpecies;
}

function convertDetailToPokemonAbout(returnPokemon){
    const pokAbout = new PokemonAbout();

   pokAbout.height = returnPokemon.height;
   pokAbout.weight = returnPokemon.weight;

   returnPokemon.abilities.map((obj)=>{
    var nome = obj.ability.name.toString();
    nome = nome.charAt(0).toUpperCase() + nome.slice(1);
    pokAbout.abilities += nome + " ,";
   })
   
   pokAbout.abilities = pokAbout.abilities.slice(0,-1).trim();

   pokAbout.text_explanation = "Esse é o páa";
   pokAbout.stats = returnPokemon.stats;
   pokAbout.moves = returnPokemon.moves;
   pokAbout.photo = returnPokemon.sprites.versions["generation-v"]["black-white"].animated.front_default

   return pokAbout;

}

pokeapi.getPokemonsEspecies = (id)=>{
    const urlLoc = `${urlSpecies}/${id}`;
    
    return fetch(urlLoc)
            .then((response) => response.json())
            .then((returnSpecies)=>{
                return convertDetailToPokemonSpecies(returnSpecies)
            });

}

pokeapi.getPokemonsAbout = (id)=>{
    const urlLoc = `https://pokeapi.co/api/v2/pokemon/${id}`;
    
    return fetch(urlLoc)
            .then((response) => response.json())
            .then((returnPokemon)=>{
                currentPokemon = convertPokeApiDetailToPokemon(returnPokemon);
                return convertDetailToPokemonAbout(returnPokemon)
            });

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

        return pokemonsDetails
    })
    .catch((err) => console.log(`Erro: ${err}`));
};
