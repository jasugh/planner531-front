import React, {useEffect, useState} from 'react';
import Header from '../common/Header';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import AssistanceExerciseDetails from './AssistanceExerciseDetails';
import Loading from '../common/Loading';

const AssistanceExercise = props => {
    const [assistanceExerciseData, setExerciseData] = useState({});
    const [selectedAssistanceExercise, setSelectedAssistanceExercise] = useState(-1);
    const [open, setOpen] = useState('');

    useEffect(() => {
        props.onGetAssistanceExercises();
        props.onGetExercises();
        props.onGetMainExercises(props.login.id);
    }, []);

    const onAssistanceExerciseClick = (index) => {
        props.onClearError();
        let o = [];
        o[index] = !open[index];
        setOpen(o);
        setSelectedAssistanceExercise(index);
    };

    const onSelectExercise = (selectedExerciseId, mainExercise) => {
        props.onAddAssistanceToMainExercise(selectedExerciseId, mainExercise, props.login.id);
    };

    const onDeleteExercise = (selectedExerciseId, mainExercise) => {
        props.onRemoveExerciseFromMainExercise(selectedExerciseId, mainExercise, props.login.id);
    };

    let screenRows = '';

    screenRows = (
        <AssistanceExerciseDetails
            mainExercises={ props.mainExercise.mainExercises }
            exercises={ props.exercise.exercises }
            assistanceExercises={ props.assistanceExercise }
            onAssistanceExerciseClick={ onAssistanceExerciseClick }
            onSelectExercise={ onSelectExercise }
            onDeleteExercise={ onDeleteExercise }
            selectedAssistanceExercise={ selectedAssistanceExercise }
            open={ open }
        />
    );

    return (
        <>
            <Header header={ "Assistance Exercises" }/>

            { props.assistanceExercise.loading || props.mainExercise.loading ?
                <Loading/>
                :
                screenRows }
        </>
    );
};

const mapStateToProps = state => {
    return {
        assistanceExercise: state.assistanceExerciseReducer,
        exercise: state.exerciseReducer,
        mainExercise: state.mainExerciseReducer,
        login: state.loginReducer,
        error: state.errorReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAssistanceExercises: () => dispatch(actions.getAssistanceExercises()),
        onGetExercises: () => dispatch(actions.getExercises()),
        onGetMainExercises: (loginId) => dispatch(actions.getMainExercises(loginId)),
        onAddAssistanceToMainExercise:
            (selectedExerciseId, mainExercise, loginId) => dispatch(actions
                .addAssistanceToMainExercise(selectedExerciseId, mainExercise, loginId)),
        onRemoveExerciseFromMainExercise:
            (selectedExerciseId, mainExercise, loginId) => dispatch(actions
                .removeAssistanceFromMainExercise(selectedExerciseId, mainExercise, loginId)),
        onClearError: () => dispatch(actions.clearError()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssistanceExercise);
