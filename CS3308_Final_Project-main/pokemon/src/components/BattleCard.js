import React from 'react';
import { ProgressBar } from 'react-bootstrap';

import "./battle-card.css"

const BattleCard = ({ pokemon, currentHealth, totalHealth = 100, attack, reverse }) => {
    const attackHandler = (move) => {
        attack(move)
    }

    const health = currentHealth/totalHealth * 100

    return (
        <div className="battle-card" style={{flexDirection: reverse ? "row-reverse" : ""}}>
            <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                {reverse && pokemon.moves.slice(0, 4).map(
                    (move) => <button key={move.move.name} onClick={() => attackHandler(move.move)} className="btn btn-primary">{move.move.name.toUpperCase()}</button>
                )}
            </div>
            <div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <div>{ pokemon.name.toUpperCase() }</div>
                    <img src={reverse ? pokemon.sprites.back_default : pokemon.sprites.front_default } alt={ pokemon.name } />
                    <div>HEALTH: { currentHealth }/{ totalHealth }</div>
                </div>
                <ProgressBar now={health} />
            </div>
        </div>
    )
};

export default BattleCard;
