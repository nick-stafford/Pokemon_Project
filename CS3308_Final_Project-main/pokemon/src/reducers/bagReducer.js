import * as actionTypes from '../actions/actionTypes';

export default (state = [], action) => {
    switch(action.type) {
        case actionTypes.UPDATE_BAG:
            return !state.includes(action.payload) ? [...state, action.payload]
            : state.filter((id) => id !== action.payload)
        default:
            return state;
    }
}