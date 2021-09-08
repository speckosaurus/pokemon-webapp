const hyphenatedPokemon = ["jangmo-o", "kommo-o", "hakamo-o"];

export const FormatPokemonName = (item) => {
    if (!hyphenatedPokemon.includes(item.name)) {
        item.name = item.name.replace(/-/g, ' ');
    }

    item.name = item.name[0].toUpperCase() + item.name.substring(1);
    item.name = ApplyCamelCase(item.name);

    return item;
 };

export const FormatTypeName = (item) => {
    item.name = CapitaliseFirstLetter(item.name);

    return item;
}

export const FormatVersionName = (version) => {
    switch (version) {
        case "leafgreen":
          return "Leaf Green";
        case "firered":
          return "Fire Red";
        case "heartgold":
          return "Heart Gold";
        case "soulsilver":
          return "Soul Silver";
        default:
          let formattedVersion = version
            .replace("lets", "let's")
            .replace(/-/g, ' ');

          return ApplyCamelCase(formattedVersion);
      }
}

export const ApplyCamelCase = (text) => {
    let splitText = text.split(' ');
    let updatedText = [];

    splitText.forEach(function (word) {
        updatedText.push(CapitaliseFirstLetter(word));
    });

    return updatedText.join(' ');
}

export const CapitaliseFirstLetter = (text) => {
    return text[0].toUpperCase() + text.substring(1);
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
