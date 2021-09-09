import './Navigation.css';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';

export default function Navigation(props) {
  
    const [searchTerm, setSearchTerm] = useState(null);
    
    return (
      <div className="Navigation">
        <SearchBar setSearchTerm={setSearchTerm} />
        <PokemonList setSelectedPokemon={props.setSelectedPokemon} searchTerm={searchTerm}/>
      </div>
    )
}
