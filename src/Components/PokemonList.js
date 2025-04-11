import './PokemonList.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { FormatPokemonName } from '../Utils/Utils';

export default function PokemonList(props) {
    function selectPokemon(url) {
        props.setSelectedPokemon(url);
    };

    const [allPokemon, setAllPokemon] = useState([]);
    const [pokemonList, setPokemonList] = useState([]);
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

        newPokemon.forEach(function (item) {
          item.name = FormatPokemonName(item.name);
        });

        setAllPokemon([...allPokemon, ...newPokemon]);
      
        if (res.data.next) {
          setCurrentUrl(res.data.next);
        } else {
          setLoading(false);
          setPokemonList(allPokemon);
        }
      });
  
      return () => cancel();
    }, [currentUrl]);

    useEffect(() => {
        if (props.searchTerm) {
            const filteredList = allPokemon.filter(pokemon => {
                return pokemon.name.toLowerCase().includes(props.searchTerm.toLowerCase())
            });

            setPokemonList(filteredList);
        } else {
            setPokemonList(allPokemon);
        }
    }, [props.searchTerm]);

    if (loading) return <div className="PokemonList">
      <Loading />
    </div>;

    return (
        <div className="PokemonList">
          <p className="row-item" hidden={pokemonList.length > 0}>No Pokemon found</p>
          <ol>
            {pokemonList.map((pokemon) => 
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
