import React from 'react';
import './SearchBar.css';

export default function SearchBar(props) {
    function updateSearchTerm(searchTerm) {
        props.setSearchTerm(searchTerm);
    };

    return (
        <div className="SearchBar">
            <input className="input"
                key="SearchBar"
                placeholder={"Search"}
                onChange={(e) => updateSearchTerm(e.target.value)}
            />
        </div>
    )
}
