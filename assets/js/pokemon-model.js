class Pokemon {
    id;
    name;
    type;
    types = [];
    photo;
}

class PokemonAbout {    
    //endpoint padrao 'pokemon'
    height;
    weight;
    abilities = "";
    text_explanation;//opcional, arrumar esse só quando o resto estiver ok
    stats=[];
    moves=[];
    types=[];
    photo;
}

class PokemonSpecies {
    //endpoint 'pokemon-species'
    species;
    egg_groups=[];
    shape;
    evolution_chains_url;
}

class PokemonEvolution{
    //url a ser obtida endpoint 'pokemon-species'
    first;
    second;
    thirdy;
}



