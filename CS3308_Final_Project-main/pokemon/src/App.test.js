import '@testing-library/jest-dom';
import React, {Provider} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, shallow } from '@testing-library/react';
import Home from './components/Home';
import Bag from './components/Bag';
import App from './App';
import PokemonDetails from './components/PokemonDetails';
import PokemonList from './components/PokemonList';
import Pokedex from './components/Pokedex';


// check to see if the word Others is on home page
test('renders Home', () => {
    render(<BrowserRouter > <Home /> </BrowserRouter>);
    const linkTitle = screen.getByText(/Others/i);
    expect(linkTitle).toBeInTheDocument();
});


// check to see if the word adventures is on home page
test('renders Home', () => {
    render(<BrowserRouter > <Home /> </BrowserRouter>);
    const linkTitle = screen.getByText(/adventures/i);
    expect(linkTitle).toBeInTheDocument();
}); 


// check to see if the Pokédex button is on home page
test('renders Home', () => {
    render(<BrowserRouter > <Home /> </BrowserRouter>);
    const linkTitle = screen.getByRole('button', {name: /Pokédex/i});
    expect(linkTitle).toBeInTheDocument();
}); 


// Verify a specific Pokemon(Bulbasaur) shows up in bag
test('renders Bag', () => {
    const bagData = [{name:'bulbasaur', sprites: {front_default:''}}];
    render(<BrowserRouter > <Bag bag = {bagData} /> </BrowserRouter>);
    const linkTitle = screen.getByText(/bulbasaur/i);
    expect(linkTitle).toBeInTheDocument();
});


// check to see if the REMOVE button is in bag, on Pokédex page
test('renders Bag', () => {
    const bagData = [{name:'clefairy', sprites: {front_default:''}}];
    render(<BrowserRouter > <Bag bag = {bagData} /> </BrowserRouter>);
    const linkTitle = screen.getByRole('button', {name: /REMOVE/i});
    expect(linkTitle).toBeInTheDocument();
}); 


// check to see if the word Battle is on Pokédex page
test('renders Bag', () => {
    const bagData = [{name:'bulbasaur', sprites: {front_default:''}}];
    render(<BrowserRouter > <Bag bag = {bagData} /> </BrowserRouter>);
    const linkTitle = screen.getByText(/Battle/i);
    expect(linkTitle).toBeInTheDocument();
});
