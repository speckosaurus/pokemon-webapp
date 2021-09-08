import './PokemonDisplay.css';
import './Shared.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { FormatTypeName, FormatPokemonName } from '../Utils/Utils';

export default function PokemonDisplay(props) {
    const [pokemonDisplay, setPokemonDisplay] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Every time currentUrl changes
    // Re-run code inside useEffect to get next page of Pokemon
    useEffect(() => {
      setLoading(true);
      let cancel;
      
      axios.get(props.selectedPokemon, {
        cancelToken: new axios.CancelToken(c => cancel = c)
      }).then(res => {
        let pokemon = res.data;

        let pokemonDisplay = {
            name: pokemon.name,
            sprite: pokemon.sprites.front_default,
            shiny: pokemon.sprites.front_shiny,
            types: []
        };

        pokemon.name = FormatPokemonName(pokemonDisplay);

        pokemon.types.forEach(function (item) {
            let type = {name: item.type.name, url: item.type.url};
            type = FormatTypeName(type);
            pokemonDisplay.types.push(type);
          });

        setPokemonDisplay(pokemonDisplay);
        props.setSpeciesUrl(pokemon.species.url);
        setLoading(false);
      });
  
      return () => cancel();
    }, [props.selectedPokemon]);

    if (props.selectedPokemon == null) {
       return <div className="PokemonDisplay">
            <p>Select a Pokemon to load data</p>
        </div>;
    }

    if (loading) return <div className="PokemonDisplay">
      <Loading />
    </div>;

    return (
        <div className="PokemonDisplay">
            <div className="row">
              <p className="row-item">{pokemonDisplay.name}</p>
              <p className="row-item" hidden={!props.isBaby}> (baby)</p>
              <p className="row-item" hidden={!props.isLegendary}> (legendary)</p>
              <p className="row-item" hidden={!props.isMythical}> (mythical)</p>
            </div>
            <div className="row">
                <img src={pokemonDisplay.sprite} key="Pokemon-sprite" className="row-item" alt={pokemonDisplay.name + '-sprite'} />
                <img hidden={pokemonDisplay.shiny === null} src={pokemonDisplay.shiny} key="Pokemon-shiny" className="row-item" alt={pokemonDisplay.name + '-shiny-sprite'} />
            </div>
            <div className="row">{pokemonDisplay.types.map((type) => 
              <div className={type.name} key={type.name}>{type.name}</div>
            )}</div>
        </div>
    );
}
