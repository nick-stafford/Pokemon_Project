import React from 'react';

import Card from './Card'

const PokemonList = (props) => {
    const { pokemons, nameFilter, bag, updateBag, typeFilter, maxBaseExperienceFilter } = props;
    return pokemons ? (
        pokemons
            .filter(nameFilterPokemon => nameFilterPokemon.name.includes(nameFilter.toLowerCase()))
            .filter(typeFilterPokemon => {
                const len = typeFilterPokemon.types.length
                for (let i = 0; i < len; i++) {
                    if (typeFilterPokemon.types[i].type.name.includes(typeFilter)) {
                        return true
                    }
                }
                return false
            })
            .filter(maxBaseExperienceFilterPokemon => maxBaseExperienceFilterPokemon.base_experience < maxBaseExperienceFilter)
            .map((pokemon, i) => {
                return (
                    <>
                        <div class="col-sm">
                            <Card
                                showDetails
                                key={pokemon.name}
                                pokemon={ pokemon }
                                bag={bag}
                                updateBag={updateBag}
                            />
                        </div>
                        
                        {i%4 === 3 && <div class="w-100"></div>}
                    </>
                );
            })) : "LOADING..."
};

export default PokemonList;
