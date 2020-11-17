import {
    START_REST_TIMER,
    STOP_REST_TIMER
} from "./types";

export const startRestTimer = (restTimer) => dispatch => {
    dispatch({
        type: START_REST_TIMER,
        payload: restTimer
    });
};

export const stopRestTimer = () => dispatch => {
    dispatch({
        type: STOP_REST_TIMER,
    });
};
