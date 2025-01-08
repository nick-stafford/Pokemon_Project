import React from 'react';
import { Link } from 'react-router-dom';

import "./card.css"

const Card = ({ pokemon, showDetails, bag, isBag, updateBag }) => {
    const changeHandler = () => {
        updateBag(pokemon)
    }

    
    console.log(bag.length > 5, "cardbag")
    return (
        <div className="card text-center">
            <div className="card -header">{ pokemon.name }</div>
            <div className="card -content">
                <img src={ pokemon.sprites.front_default } className="card-img-top" alt={ pokemon.name.toUpperCase() } />
            </div>
            <div className="card -footer">
                {showDetails && <Link to={`/pokedex/${pokemon.id}`} className="btn btn-primary">Details</Link>}
                {bag.includes(pokemon) ? (
                    <button className="btn btn-warning" onClick={() => changeHandler()}>
                        REMOVE
                    </button> ) : (
                    <button disabled={bag.length > 5} className="btn btn-success" onClick={() => changeHandler()}>
                        ADD
                    </button>)
                }    
            </div>
        </div>
    )
};

export default Card;
