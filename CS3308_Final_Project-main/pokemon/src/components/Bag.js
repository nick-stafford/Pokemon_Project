import React from 'react';

import Card from './Card'
import "./bag.css"

const Bag = ({ bag, updateBag }) => {
    const renderList = () => {
        return bag ? (
            bag.map(pokemon => {
                return (
                    <Card
                        showDetails
                        isBag
                        key={pokemon.name}
                        pokemon={ pokemon }
                        bag={bag}
                        updateBag={updateBag}
                    />
                );
            })) : "LOADING..."
    }
    
    return (
        <fieldset>
            <legend>Battle Bag:</legend>
            <div className="row">
                {renderList()}
            </div>
        </fieldset>
    )
};

export default Bag;
