import * as actionTypes from './actionTypes';
import pokeapi from '../apis/pokeapi';

export const fetchPokemons = () => async dispatch => {
    const pokemenDetailsArray = Array.from(Array(151).keys())

    const promises = pokemenDetailsArray.map((id) => {
        const pokeIndex = id + 1;
        return pokeapi.get('/' + pokeIndex)
    })
 
    const responses = await Promise.all(promises)

    dispatch({
        type: actionTypes.FETCH_POKEMONS,
        payload: responses.map((response) => response.data)
    })
    
};

export const fetchPokemon = (id) => async dispatch => {
    const response = await pokeapi.get('/' + id);

    dispatch({
        type: actionTypes.FETCH_POKEMON,
        payload: response.data
    })
};

export const updateBag = (id) => async dispatch => {
    dispatch({
        type: actionTypes.UPDATE_BAG,
        payload: id
    })
};

export const fetchOpponentBag = (bag) => async dispatch => {
    const pokemenDetailsArray = [...bag]

    const promises = pokemenDetailsArray.map((id) => {
        return pokeapi.get('/' + id)
    })
 
    const responses = await Promise.all(promises)

    dispatch({
        type: actionTypes.FETCH_OPPONENT_BAG,
        payload: responses.map((response) => response.data)
    })
};
