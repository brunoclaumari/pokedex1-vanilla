const pokemonList = document.getElementById("pokemonList")
const loadMoreButton = document.getElementById("loadMoreButton")
let offset = 0
const limit = 10;
const maxRecords = 151;


function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.order}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
      <ol class="types">              
        ${pokemon.types.map((type)=>`<li class="type ${type}">${type}</li>`).join("")}
      </ol>
      <img class="foto-pokemon" src=${pokemon.photo} 
      alt="${pokemon.name}" />
    </div>
  </li>`;
}

function loadPokemonItens(locOffset, locLimit){
  pokeapi.getPokemons(locOffset, locLimit).then((pokemons = []) => {
    const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon));
/*     if((locOffset + locLimit) == maxRecords){
      loadMoreButton.hidden = true
    } */

    pokemonList.innerHTML += newList.join("");
  });
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener("click",() => {
  offset += limit;
  const recordsNextPage = offset + limit
  if(recordsNextPage >= maxRecords){
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit);
    loadMoreButton.hidden = true
  }
  else{
    loadPokemonItens(offset, limit);
  }

})




