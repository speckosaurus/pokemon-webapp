import './PokemonList.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loading from './Loading';

export default function PokemonList(props) {
    function selectPokemon(url) {
        props.setSelectedPokemon(url);
    };

    const [allPokemon, setAllPokemon] = useState([]);
    const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [loading, setLoading] = useState(true);
    
    // Every time currentUrl changes
    // Re-run code inside useEffect to get next page of Pokemon
    useEffect(() => {
      setLoading(true);
      let cancel;
      axios.get(currentUrl, {
        cancelToken: new axios.CancelToken(c => cancel = c)
      }).then(res => {
        let newPokemon = res.data.results.map(p => p);

        // Remove Mega, GMax and regional forms
        newPokemon = newPokemon.filter(p =>
            !p.name.includes('-mega') &&
            !p.name.includes('-gmax') &&
            !p.name.includes('-alola') &&
            !p.name.includes('-galar') &&
            !p.name.includes('-totem') &&
            !p.name.includes('-crowned')
        );

        // Format Pokemon name

        setAllPokemon([...allPokemon, ...newPokemon]);
      
        if (res.data.next) {
          setCurrentUrl(res.data.next);
        } else {
          setLoading(false);
        }
      });
  
      return () => cancel();
    }, [currentUrl]);

    if (loading) return <Loading />;

    return (
        <div className="PokemonList">
          <ol>
            {allPokemon.map((pokemon) => 
                <li key={pokemon.name} className="Pokemon" onClick={function(e) {
                    selectPokemon(pokemon.url);
                  }}>
                    {pokemon.name}
                </li>
            )}
            </ol>
        </div>
    )
}
