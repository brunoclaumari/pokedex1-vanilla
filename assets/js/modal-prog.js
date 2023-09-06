
const modalTitle = document.querySelector("#modalTitle");//modalPokNumber
const modalPokNumber = document.querySelector("#modalPokNumber");
const modalBody = document.getElementById("modalBody");//

const tabAbout = document.getElementById("about");
const tabBaseStats = document.getElementById("base-stats");
const tabEvolution = document.getElementById("evolution");
const tabMoves = document.getElementById("moves");

let typeBackGround = "grass";

//const idTeste = 1;
//about

let species = new PokemonSpecies();
let about = new PokemonAbout();
let evolution = new PokemonEvolution();
let currentPokemon = new Pokemon();

function formataNumero(id){
    var teste = "";
    teste = id;
    if(teste.length == 1)
        return `000${id}`
    else if(teste.length == 2)
        return `00${id}`
    else if(teste.length == 3)
        return `0${id}`
    else 
        return `${id}`
}

function preencheModalPrincipal(){    

    return `    
        <div class="sub-header">
            <div class="content-sub-header">
                <h1 class="sub-title" id="modalPokTitle">${currentPokemon.name}</h1>
                <ol class="typesDetail">
                ${currentPokemon.types.map((type)=>`<li class="type" style="background-color: ${getColorForType(type)};">${type}</li>`).join("")}
                <!-- 
                <li class="type">Poison</li>
                <li class="type">Grass</li> -->
                </ol>
            </div>
            <div class="content-sub-header">
                <span class="number" id="modalPokNumber" >#${formataNumero(currentPokemon.id)}</span>
            </div>
        </div>
        <div id="imgModal">
            <img
            src="${currentPokemon.photo}"
            alt="Pokemon figura ${currentPokemon.id}"
            style="width: 35%;"
            />  
        </div>
    `;
}

function getColorForType(type){
    return pokemonColors
                .filter((x) => x.nome == type)
                .map((x)=>x.backgroundColor);
}

async function openModal(event,mn,id) {
    let modal = document.getElementById(mn);
    let modalContent = document.getElementById("modalContent");

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'Block';
    document.body.style.overflow = 'hidden';
    
    openTab(event, 'about')       

    species = await loadPokemonSpecies(id);
    about = await loadPokemonAbout(id);    

    var cor = getColorForType(currentPokemon.type);

    modalContent.style.backgroundColor = cor;

/*     modalContent.classList.add(currentPokemon.type);
    modal.classList.add(currentPokemon.type); */
    modalBody.innerHTML = preencheModalPrincipal();

    preencheTabAbout();
    await preencheAbaBaseStats();
    chargeAnimations();
}

async function loadPokemonSpecies(id){
    
    let speciesLocal = await pokeapi.getPokemonsEspecies(id);
    console.log(speciesLocal);
    return speciesLocal;
}

async function loadPokemonAbout(id){
    
    let aboutLocal = await pokeapi.getPokemonsAbout(id);
    console.log(aboutLocal);
    return aboutLocal;
}

function preencheTabAbout(){
    //debugger
    //tabAbout.innerHTML
    tabAbout.innerHTML = convertPokemonFullToDivListaCol("Species", species.species);
    tabAbout.innerHTML += convertPokemonFullToDivListaCol("Height", about.height);
    tabAbout.innerHTML += convertPokemonFullToDivListaCol("Weight", about.weight);   
    tabAbout.innerHTML += convertPokemonFullToDivListaCol("Abilities", about.abilities);   
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