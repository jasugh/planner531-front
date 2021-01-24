import * as actionTypes from '../actions/actionTypes';

const initialState = {
    restTime: 0,
    start: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.START_REST_TIMER:
            return {
                restTime: action.restTime,
                start: true,
            };
        case actionTypes.STOP_REST_TIMER:
            return {
                start: false,
            };
        default:
            return state;
    }
}
