import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';
import {getNextWorkoutByLoginId} from './workoutActions';

export const getWorkoutDaysByLoginId = (userId) => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingWorkoutDays());

        axios.get(`/api/plan/${ userId }/user`,)
            .then(response => {
                dispatch(getWorkoutDaysData(response.data));
            })
            .catch(error => {
                if (error.response.data.message && error.response.data.field) {
                    dispatch(setError(error.response.data.message, error.response.data.field));
                } else {
                    dispatch(setError(error.response.data, ""));
                }
                dispatch(stopLoadingWorkoutDays());
            });
    };
};

export const getWorkoutDaysById = (id) => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingWorkoutDays());

        axios.get(`/api/plan/${ id }/plan`,)
            .then(response => {
                dispatch(getWorkoutDaysData(response.data));
            })
            .catch(error => {
                if (error.response.data.message && error.response.data.field) {
                    dispatch(setError(error.response.data.message, error.response.data.field));
                } else {
                    dispatch(setError(error.response.data, ""));
                }
                dispatch(stopLoadingWorkoutDays());
            });
    };
};

export const addWorkoutDays = startingDetailsId => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingWorkoutDays());

        axios.post(`/api/plan/${ startingDetailsId }`)
            .then(res => {
                dispatch(saveWorkoutDays(res.data));
                dispatch(stopLoadingWorkoutDays());
            })
            .catch(error => {
                dispatch(setError(error.response.data.message, error.response.data.field));
                dispatch(stopLoadingWorkoutDays());
            });
    };
};

export const addExerciseToWorkout = (exerciseId, workoutDay, userId) => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingWorkoutDays());

        axios.put(`/api/plan/${ exerciseId }/assistance`, workoutDay)
            .then(res => {
                dispatch(addExerciseToWo(res.data));
                dispatch(stopLoadingWorkoutDays());

                //Get updated workout exercises
                dispatch(getNextWorkoutByLoginId(userId))
            })
            .catch(error => {
                dispatch(setError(error.response.data.message, error.response.data.field));
                dispatch(stopLoadingWorkoutDays());
            });
    };
}

export  const deleteExerciseFromWorkout = (exerciseId, userId) => {
    return dispatch => {
        dispatch(clearError());
        dispatch(loadingWorkoutDays());

        axios.delete(`/api/plan/${ exerciseId }/exercise`)
            .then(res => {
                dispatch(deleteExerciseFromWo(res.data));
                dispatch(stopLoadingWorkoutDays());

                //Get updated workout exercises
                dispatch(getNextWorkoutByLoginId(userId))
            })
            .catch(error => {
                dispatch(setError(error.response.data.message, error.response.data.field));
                dispatch(stopLoadingWorkoutDays());
            });
    };
}

export const getWorkoutDaysData = (workoutDaysData) => {
    return {
        type: actionTypes.GET_WORKOUT_DAY,
        workoutDays: workoutDaysData
    };
};

export const saveWorkoutDays = workoutDaysData => {
    return {
        type: actionTypes.SAVE_WORKOUT_DAY,
        workoutDays: workoutDaysData
    };
};

export const addExerciseToWo = workoutDaysData => {
    return {
        type: actionTypes.ADD_EXERCISE_TO_WORKOUT,
        workoutDays: workoutDaysData
    };
};

export const deleteExerciseFromWo = workoutDaysData => {
    return {
        type: actionTypes.DELETE_EXERCISE_FROM_WORKOUT,
        workoutDays: workoutDaysData
    };
};

export const loadingWorkoutDays = () => {
    return {
        type: actionTypes.LOADING_WORKOUT_DAY
    };
};

export const stopLoadingWorkoutDays = () => {
    return {
        type: actionTypes.STOP_LOADING_WORKOUT_DAY
    };
};

export const setError = (message, field) => {
    return {
        type: actionTypes.SET_ERROR,
        message: message,
        field: field
    };
};

export const clearError = () => {
    return {
        type: actionTypes.CLEAR_ERROR
    };
};
