import './PokemonDisplay.css';
import './Types.css';
import './Shared.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { FormatTypeName, FormatPokemonName, GetDexNumberForDisplay } from '../Utils/Utils';
import { playSound } from '../Functions/Functions';

export default function PokemonDisplay(props) {
    const [pokemonDisplay, setPokemonDisplay] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Every time currentUrl changes
    // Re-run code inside useEffect to get next page of Pokemon
    useEffect(() => {
      setLoading(true);
      let cancel;

      if (props.selectedPokemon === null) {
        return;
      }
      
      axios.get(props.selectedPokemon, {
        cancelToken: new axios.CancelToken(c => cancel = c)
      }).then(res => {
        let pokemon = res.data;
        const name = FormatPokemonName(pokemon.name);

        let types = [];
        pokemon.types.forEach(function (item) {
          let type = {name: item.type.name, url: item.type.url};
          type = FormatTypeName(type);
          types.push(type);
        });

        const pokemonDisplay = {
            name: name,
            sprite: pokemon.sprites.front_default,
            shiny: pokemon.sprites.front_shiny,
            types: types,
            cry: pokemon.cries.latest,
            legacyCry: pokemon.cries.legacy
        };

        setPokemonDisplay(pokemonDisplay);
        props.setSpeciesUrl(pokemon.species.url);
        setLoading(false);
      });
  
      return () => cancel();
    }, [props.selectedPokemon]);

    useEffect(() => {
      playSound(pokemonDisplay.cry);
    }, [pokemonDisplay])

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
              <p className="row-item">{GetDexNumberForDisplay(props.speciesUrl)} - {pokemonDisplay.name}</p>
              {/*<img src={baby} className="icon row-item" alt="baby" hidden={!props.isBaby}/>
              <img className="icon row-item" alt="legendary" hidden={!props.isLegendary}/>
              <img className="icon row-item" alt="mythical" hidden={!props.isMythical}/> */}
            </div>
            <div className="row">
                <img src={pokemonDisplay.sprite} key="Pokemon-sprite" className="row-item" alt={pokemonDisplay.name + '-sprite'} />
                <img hidden={pokemonDisplay.shiny === null} src={pokemonDisplay.shiny} key="Pokemon-shiny" className="row-item" alt={pokemonDisplay.name + '-shiny-sprite'} />
            </div>
            <div className="row">{pokemonDisplay.types.map((type) => 
              <div className={type.name} key={type.name}>{type.name}</div>
            )}</div>
            {/*<div className="row">
              <AiFillSound onClick={playSound(pokemonDisplay.cry)} style={{ cursor: 'pointer' }} />
              <AiFillSound onClick={playSound(pokemonDisplay.legacyCry)} style={{ cursor: 'pointer' }} hidden={!pokemonDisplay.legacyCry} />
            </div>*/}
        </div>
    );
}
