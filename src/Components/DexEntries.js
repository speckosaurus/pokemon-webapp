import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './DexEntries.css';
import './Games.css';
import './Shared.css';
import { FormatVersionName, ProcessDexEntries } from '../Utils/Utils';

export default function DexEntries(props) {

  const [dexEntries, setDexEntries] = useState(null);

    useEffect(() => {
        let cancel;
        if (props.speciesUrl === null) {
          return;
        }

        axios.get(props.speciesUrl, {
          cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
          let species = res.data;

          props.setIsBaby(species.is_baby);
          props.setIsMythical(species.is_mythical);
          props.setIsLegendary(species.is_legendary);

          const dexEntries = ProcessDexEntries(species.flavor_text_entries);

          setDexEntries(dexEntries);
        });
    
        return () => cancel();
      }, [props.speciesUrl]);

    if (dexEntries == null) {
      return <div className="DexEntries"></div>
    }

    return (
          <div className="DexEntries">
            <div className="Title">
              Pokedex Entries
            <hr />
              {dexEntries.dexEntries.map((dexEntry, index) => 
                  <div key={index} className="DexEntry">
                    <div className="row">{dexEntry.versions.map((version) => 
                      <div>
                        <div className="space"></div>
                        <div className={version} key={version}>{FormatVersionName(version)}</div>
                      </div>
                    )}</div>
                    <br />
                    <div className="row">
                      <div className="space"></div>
                      <p>{dexEntry.text}</p>
                    </div>
                    <hr />
                  </div>
              )}
            </div>
        </div>
    )
}