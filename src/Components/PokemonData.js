import './PokemonData.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loading from './Loading';

export default function PokemonData(props) {
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Every time currentUrl changes
    // Re-run code inside useEffect to get next page of Pokemon
    useEffect(() => {
        if (props.selectedPokemon == null) {
           return <div className="App">
            <div className="PokemonData">
                <p>Select a Pokemon to load data</p>
            </div>
            </div>;
        }

      setLoading(true);
      let cancel;
      
      axios.get(props.selectedPokemon, {
        cancelToken: new axios.CancelToken(c => cancel = c)
      }).then(res => {
        let pokemon = res.data;
        console.log(pokemon);

        let pokemonData = {
            name: pokemon.name,
            sprite: pokemon.sprites.front_default,
            shiny: pokemon.sprites.front_shiny,
            types: []
        };

        pokemon.types.forEach(function (item, index) {
            let type = {name: item.type.name, url: item.type.url};
            pokemonData.types.push(type);
          });

        setPokemonData(pokemonData);
        setLoading(false);
      });
  
      return () => cancel();
    }, [props.selectedPokemon]);

    if (loading) return <Loading />;

    return (
        <div className="PokemonData">
            <p>{pokemonData.name}</p>
            <div className="clearfix">
                <img src={pokemonData.sprite} key="Pokemon-sprite" className="img-container" alt={pokemonData.name + '-sprite'} />
                <img src={pokemonData.shiny} key="Pokemon-shiny" className="img-container" alt={pokemonData.name + 'shiny-sprite'} />
            </div>
            <div className="clearfix">{pokemonData.types.map((type) => 
                <div className={type.name} key={type.name}>{type.name}</div>
            )}</div>
        </div>
    );
}
