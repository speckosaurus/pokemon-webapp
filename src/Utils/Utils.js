const hyphenatedPokemon = ["jangmo-o", "kommo-o", "hakamo-o"];

export const FormatPokemonName = (item) => {
    // Remove hyphens where relevant
    if (!hyphenatedPokemon.includes(item.name)) {
        item.name = item.name.replace(/-/g, ' ');
    }

    // Capitalise first letter of each name
    item.name = item.name[0].toUpperCase() + item.name.substring(1);

    // Capitalise first letter after each space

    return item;
 };

export const FormatTypeName = (item) => {
    // Capitalise first letter of each name
    item.name = item.name[0].toUpperCase() + item.name.substring(1);

    return item;
}

export const FilterPokemonForms = (pokemonList) => {
    return pokemonList.filter(p =>
        !p.name.includes('-mega') &&
        !p.name.includes('-gmax') &&
        !p.name.includes('-alola') &&
        !p.name.includes('-galar') &&
        !p.name.includes('-totem') &&
        !p.name.includes('-crowned')
    );
}
