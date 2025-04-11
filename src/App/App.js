import './App.css';
import Navigation from '../Components/Navigation';
import PokemonDisplay from '../Components/PokemonDisplay';
import DexEntries from '../Components/DexEntries';
import Header from '../Components/Header';

import React, {useState} from 'react';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [speciesUrl, setSpeciesUrl] = useState(null);
  const [isLegendary, setIsLegendary] = useState(null);
  const [isMythical, setIsMythical] = useState(null);
  const [isBaby, setIsBaby] = useState(null);

  return (
    <div className="App">
      <Header />
      <div className="Pokedex">
        <Navigation setSelectedPokemon={setSelectedPokemon}/>
        <PokemonDisplay
          selectedPokemon={selectedPokemon}
          speciesUrl={speciesUrl}
          setSpeciesUrl={setSpeciesUrl}
          isLegendary={isLegendary}
          isMythical={isMythical}
          isBaby={isBaby}
        />
        <DexEntries
          speciesUrl={speciesUrl}
          setIsLegendary={setIsLegendary}
          setIsMythical={setIsMythical}
          setIsBaby={setIsBaby}
        />
      </div>
    </div>
  );
}

export default App;
