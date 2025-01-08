import * as actionTypes from '../actions/actionTypes';

export default (state = [], action) => {
    switch(action.type) {
        case actionTypes.FETCH_OPPONENT_BAG:
            return action.payload;
        default:
            return state;
    }
}