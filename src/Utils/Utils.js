const hyphenatedPokemon = ["jangmo-o", "kommo-o", "hakamo-o"];

export const FormatPokemonName = (name) => {
    if (!hyphenatedPokemon.includes(name)) {
        name = name.replace(/-/g, ' ');
    }

    name = name[0].toUpperCase() + name.substring(1);
    name = ApplyCamelCase(name);
    return name;
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

export const GetDexNumber = (speciesUrl) => {
  let url = speciesUrl.replace(/\/$/, "");
  return /[^/]*$/.exec(url)[0];
}

export const GetDexNumberForDisplay = (speciesUrl) => {
  const dexNumber = GetDexNumber(speciesUrl);
  return String(dexNumber).padStart(3, '0');
}

export const ProcessDexEntries = (allDexEntries) => {
  let dexEntries = {
    dexEntries: []
  };

  allDexEntries.forEach(function (item) {
    if (item.language.name === "en") {
      let dupDexEntry = false;
      let entryText = item.flavor_text
        .replace('\f', ' ')
        .replace(/\n/g,' ')
        .replace('-', ' ');
      let entryVersion = item.version.name;

      dexEntries.dexEntries.forEach(function (dexEntry) {
        if (dexEntry.text === entryText) {
          dupDexEntry = true;
          dexEntry.versions.push(entryVersion);
        }
      });
      
      if (!dupDexEntry) {
        let entry = {text: entryText, versions: [entryVersion]};
        dexEntries.dexEntries.push(entry);
      }
    }
  });

  return dexEntries;
}