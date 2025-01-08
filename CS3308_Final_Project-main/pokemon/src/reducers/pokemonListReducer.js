import * as actionTypes from '../actions/actionTypes';

export default (state = [], action) => {
    switch(action.type) {
        case actionTypes.FETCH_POKEMONS:
            return action.payload;
        default:
            return state;
    }
}