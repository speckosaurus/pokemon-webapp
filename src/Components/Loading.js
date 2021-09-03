import React from 'react'
import loadingSymbol from '../Images/pokeball.svg';

export default function Loading() {
    return (
        <div className="Loading">
            <img src={loadingSymbol} className="App-loading" alt="loading" />
            <p>Loading...</p>
        </div>
    )
}
