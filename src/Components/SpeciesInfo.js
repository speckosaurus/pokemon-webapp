import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './SpeciesInfo.css';

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
              let entry = {text: item.flavor_text.replace("\f", "\n"), version: item.version.name};
              speciesInfo.dexEntries.push(entry);
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
        <ol className="SpeciesInfo">
              {speciesInfo.dexEntries.map((dexEntry, index) => 
                  <li key={index} className="DexEntry">
                      {dexEntry.text}
                  </li>
              )}
        </ol>
    )
}