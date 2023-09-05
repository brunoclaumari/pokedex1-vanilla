let pokemonColors = [
  {nome:"normal", backgroundColor: "#a6a877" },
  {nome:"grass", backgroundColor: "#77c850" },
  {nome:"fire", backgroundColor: "#ee7f30" },
  {nome:"water", backgroundColor: "#678fee" },
  {nome:"electric", backgroundColor: "#f7cf2e" },
  {nome:"ice", backgroundColor: "#98d5d7" },
  {nome:"ground", backgroundColor: "#dfbf69" },
  {nome:"flying", backgroundColor: "#a98ff0" },
  {nome:"poison", backgroundColor: "#a040a0" },
  {nome:"fighting", backgroundColor: "#bf3029" },
  {nome:"psychic", backgroundColor: "#f65687" },
  {nome:"dark", backgroundColor: "#725847" },
  {nome:"rock", backgroundColor: "#b8a137" },
  {nome:"bug", backgroundColor: "#a8b720" },
  {nome:"ghost", backgroundColor: "#6e5896" },
  {nome:"steel", backgroundColor: "#b9b7cf" },
  {nome:"dragon", backgroundColor: "#6f38f6" },
  {nome:"fairy", backgroundColor: "#f9aec7" }
]

const pokemonList = document.getElementById("pokemonList")
const loadMoreButton = document.getElementById("loadMoreButton")
const modalButton = document.getElementById("openModal")

let offset = 0
const limit = 10;
const maxRecords = 151;

//<button id="button${pokemon.id}" style="padding: 0; margin: 0;"> 
//</button>
function convertPokemonToLi(pokemon) {
  return `   
    <li onclick="openModal(event,'dv-modal',${pokemon.id})" class="pokemon ${pokemon.type}" >
    <span class="number">#${pokemon.id}</span>
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

function abreModal(){
  window.alert("Vai abrir o modal")
}

/* modalButton.addEventListener("click",()=>{
  
}) */




