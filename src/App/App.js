import './App.css';
import PokemonList from '../Components/PokemonList';
import PokemonData from '../Components/PokemonData';
import Header from '../Components/Header';

import React, {useState} from 'react';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="App">
      <Header />
      <div className="Pokedex">
        <PokemonList setSelectedPokemon={setSelectedPokemon}/>
        <PokemonData selectedPokemon={selectedPokemon}/>
      </div>
    </div>
  );
}

export default App;
