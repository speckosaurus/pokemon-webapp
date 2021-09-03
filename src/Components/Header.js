import React from 'react'
import logo from '../Images/pokeball.svg';

export default function Header() {
    return (
        <header className="App-header">
            <h1>Pokedex Ultimate</h1>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                The ultimate Pokedex for all you budding masters.
            </p>
        </header>
    )
}
