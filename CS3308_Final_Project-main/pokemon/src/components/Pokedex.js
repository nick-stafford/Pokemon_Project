import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPokemons, updateBag } from '../actions';

import PokemonList from './PokemonList';
import Bag from './Bag';
import SearchBar from './SearchBar';

import Sound from 'react-sound';
import palettetown from '../utils/audio/palettetown_pokedex.mp3';

//import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import "./Pokedex.css"

class Pokedex extends Component {
    state = {
        nameFilter: '', 
        typeFilter: '',
        maxBaseExperienceFilter: '300'
    }
    
    componentDidMount() {
        if(this.props.pokemons.length === 0) {
            this.props.fetchPokemons();
        }
    }

    filterPokemon = (filterString) => {
        this.setState({ nameFilter: filterString });
    }

    render() {
        const { pokemons, bag, updateBag } = this.props;
        const pokemonType = ['Grass', 'Fire', 'Water', 'Psychic', 'Normal', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Fairy']
        console.log("pokemons", pokemons)
        console.log("bag", bag)
        console.log("move", pokemons.name)
        
        
        return (
            <div className="p-3 mb-2 bg-light text-dark" className="pokedex">
            <div className="container">
                <div classname="buttondiv">
                      <button type="button" className="homeButton  btn btn-outline-dark btn-lg"><Link className="btn-primary-link" to={"../"}>Home</Link></button>
            {bag.length > 0 && (<div>
             <button  type="button" className="battleButton  btn btn-outline-dark btn-lg"><Link className="btn-primary-link" to={"/battle"}>Battle</Link></button>
              </div>)}   
                </div>

                <Bag 
                    bag={bag}
                    updateBag={updateBag}
                />
                <SearchBar 
                    setFilterPokemon={this.filterPokemon}
                />
                        
                <select name="types" value={this.state.typeFilter} onChange={(event) => this.setState({ typeFilter:event.target.value })}>
                    <option value="">sort pokemon by primary type</option>
                    {pokemonType.map(type => <option key={ type } value={type.toLowerCase()}>{type}</option>)}
                </select>  
                
                <label htmlFor = "points">
                    Base Value
                </label>  
                <input
                    type="range" 
                    id="points" 
                    name="points" 
                    min="1" 
                    max="300" 
                    value = {this.state.maxBaseExperienceFilter} 
                    onChange={(event) =>  this.setState({maxBaseExperienceFilter:event.target.value })}
                />                
                
                <div class="row">
                    <PokemonList 
                        pokemons={pokemons}
                        nameFilter={this.state.nameFilter}
                        typeFilter={this.state.typeFilter}
                        maxBaseExperienceFilter={this.state.maxBaseExperienceFilter}
                        bag={bag}
                        updateBag={updateBag}
                    />
                </div>
                        
                        
            </div>
            <Sound 
                url={palettetown}
                playStatus={Sound.status.PLAYING}
                playFromPosition={300}
                loop={true}
            />            
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        pokemons: state.pokemons,
        bag: state.bag,
    };
};

export default connect(
    mapStateToProps, 
    { fetchPokemons, updateBag }
)(Pokedex);
