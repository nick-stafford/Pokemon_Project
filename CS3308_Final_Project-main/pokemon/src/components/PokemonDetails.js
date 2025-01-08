import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPokemon, updateBag } from '../actions';

import Card from './Card';

import Sound from 'react-sound';
import pokecenter from '../utils/audio/pokecenter_pokedex.mp3';


import "./PokemonDetails.css"

class PokemonDetails extends Component {
    componentDidMount() {
        this.props.fetchPokemon(this.props.match.params.id)
    }

    componentDidUpdate() {
        this.props.fetchPokemon(this.props.match.params.id)
    }

    render() {
        const { pokemon, bag, updateBag } = this.props;
        const pokemonId = this.props.match.params.id;

        return this.props.pokemon.name ? (
            <div className="pokemon-details">
            <Sound 
                url={pokecenter}
                playStatus={Sound.status.PLAYING}
                playFromPosition={300}
                loop={true}
            /> 
                <div classname="buttondiv">
                    <button type="button" className="backButton  btn btn-outline-dark btn-lg"><Link className="btn-primary-link" to={"/pokedex"}>BACK</Link></button>
                </div>
        
            {pokemonId > 1 && <div classname="buttondiv">
                    <button type="button" className="prevButton  btn btn-outline-dark btn-lg">{pokemonId > 1 && <Link className="btn-primary-link" to={`/pokedex/${pokemonId - 1}`}>PREVIOUS</Link>}</button>
                </div>}
        


                <div style={{width: "20%"  }}>  
                    <Card
                        pokemon={pokemon}
                        bag={bag}
                        updateBag={updateBag}
                    />                        
                    <p><h5><b>Height:</b></h5> {pokemon.height}</p>
                    <p><h5><b>Weight:</b></h5> {pokemon.weight}</p>
                    <p>
                        <h5><b>Type:</b></h5> 
                        {pokemon.types.map((type) => {
                            return type.type.name + ' '
                        })}
                    </p>
                    
                </div>
                
                 {pokemonId < 151 && <div classname="buttondiv">
                    <button type="button" className="nextButton  btn btn-outline-dark btn-lg">{pokemonId < 151 && <Link className="btn-primary-link" to={`/pokedex/${parseInt(pokemonId) + 1}`}>NEXT</Link>}</button>
                </div> }

            </div>
           
        ) : null
    }
}

const mapStateToProps = (state) => {
    return { 
        pokemon: state.pokemon,
        bag: state.bag,
    };
};

export default connect(
    mapStateToProps,
    { fetchPokemon, updateBag }
)(PokemonDetails);