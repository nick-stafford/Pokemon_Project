import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Pokedex from './components/Pokedex';
import PokemonDetails from './components/PokemonDetails';
import Battle from './components/Battle';

const App = () => {
    return (
        <BrowserRouter>
            <Route path="/pokedex/:id" exact component={ PokemonDetails } />
            <Route path="/pokedex" exact component={ Pokedex } />
            <Route path="/battle" exact component={ Battle } />
            <Route path="/" exact component={ Home } />
        </BrowserRouter>
    )
};

export default App;
        