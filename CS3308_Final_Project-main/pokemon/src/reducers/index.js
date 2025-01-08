import { combineReducers } from 'redux';
import pokemonListReducer from './pokemonListReducer';
import pokemonReducer from './pokemonReducer';
import bagReducer from './bagReducer';
import opponentBagReducer from './opponentBagReducer';



export default combineReducers({
    pokemons: pokemonListReducer,
    pokemon: pokemonReducer,
    bag: bagReducer,
    opponentBag: opponentBagReducer,
});
