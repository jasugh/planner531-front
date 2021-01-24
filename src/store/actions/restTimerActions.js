import * as actionTypes from '../actions/actionTypes';

export const startRestTimer = restTime => dispatch => {
    dispatch({
        type: actionTypes.START_REST_TIMER,
        restTime: restTime
    });
};

export const stopRestTimer = () => dispatch => {
    dispatch({
        type: actionTypes.STOP_REST_TIMER,
    });
};
