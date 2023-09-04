
const modalTitle = document.querySelector("#modalTitle");//modalPokNumber
const modalPokNumber = document.querySelector("#modalPokNumber");
const tabAbout = document.getElementById("about");
const idTeste = 1;
//about

let species = new PokemonSpecies();
let about = new PokemonAbout();
let evolution = new PokemonEvolution();

function openModal(mn) {
    let modal = document.getElementById(mn);

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'Block';
    document.body.style.overflow = 'hidden';
    loadPokemonSpecies(idTeste);
    loadPokemonAbout(idTeste);
    
}

async function loadPokemonSpecies(id){
    
    species = await pokeapi.getPokemonsEspecies(id);
    console.log(species);
}

async function loadPokemonAbout(id){
    
    about = await pokeapi.getPokemonsAbout(id);
    console.log(about);
}

function preencheTabAbout(){
    //debugger
    //tabAbout.innerHTML
    tabAbout.innerHTML = convertPokemonFullToDivListaCol("Species",species.species);
    tabAbout.innerHTML += convertPokemonFullToDivListaCol("Height",about.height);
    tabAbout.innerHTML += convertPokemonFullToDivListaCol("Weight",about.weight);   
    tabAbout.innerHTML += convertPokemonFullToDivListaCol("Abilities",about.abilities);   
    tabAbout.innerHTML += `<h3>Breeding</h3>` ;

    tabAbout.innerHTML += convertPokemonFullToDivListaCol("Egg Groups",species.egg_groups.map((x)=>x = x+" "));
    tabAbout.innerHTML += convertPokemonFullToDivListaCol("Shape",species.shape);
}

function convertPokemonFullToDivListaCol(titulo, subtitulo){
    return `<div class="lista-col">
                <h4 class="lista-titulo" >${titulo}</h4>
                <span class="lista-conteudo" >${subtitulo}</span>
            </div>`;
}

function closeModal(mn) {
    let modal = document.getElementById(mn);

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}