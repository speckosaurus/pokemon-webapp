import React from 'react';
import './Shared.css';
import logo from '../Images/pokeball.svg';

export default function Header() {
    return (
        <header className="App-header">
            <div className="row">
                <img src={logo} className="App-logo row-item" alt="logo" />
                <h1 className="row-item">Pokedex Ultimate</h1>
                <img src={logo} className="App-logo row-item" alt="logo" />
            </div>
        </header>
    )
}
