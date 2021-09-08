import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './SpeciesInfo.css';
import './Shared.css';
import { FormatVersionName } from '../Utils/Utils';

export default function SpeciesInfo(props) {

  const [speciesInfo, setSpeciesInfo] = useState(null);

    useEffect(() => {
        let cancel;
        axios.get(props.speciesUrl, {
          cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
          let species = res.data;

          let speciesInfo = {
              dexEntries: []
          };

          props.setIsBaby(species.is_baby);
          props.setIsMythical(species.is_mythical);
          props.setIsLegendary(species.is_legendary);

          species.flavor_text_entries.forEach(function (item) {

            if (item.language.name === "en") {
              let dupDexEntry = false;
              let entryText = item.flavor_text
                .replace('\f', ' ')
                .replace(/\n/g,' ');
              let entryVersion = item.version.name;

              speciesInfo.dexEntries.forEach(function (dexEntry) {
                if (dexEntry.text === entryText) {
                  dupDexEntry = true;
                  dexEntry.versions.push(entryVersion);
                }
              });
              
              if (!dupDexEntry) {
                let entry = {text: entryText, versions: [entryVersion]};
                speciesInfo.dexEntries.push(entry);
              }
            }
          });

          setSpeciesInfo(speciesInfo);
        });
    
        return () => cancel();
      }, [props.speciesUrl]);

    if (speciesInfo == null) {
      return <div className="SpeciesInfo"></div>
    }

    return (
        <div className="SpeciesInfo">
          <h1>Pokedex Entries</h1>
          <hr />
              {speciesInfo.dexEntries.map((dexEntry, index) => 
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
    )
}