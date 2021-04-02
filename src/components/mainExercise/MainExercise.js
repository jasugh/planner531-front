import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions';
import Header from '../common/Header';
import Loading from '../common/Loading';
import MainExerciseList from './MainExerciseList';
import calculateOneRm from '../common/calculateOneRm';

const MainExercise = props => {
    const [selectedMainExercise, setSelectedMainExercise] = useState(-1);
    const [mainExerciseData, setMainExerciseData] = useState({});
    const [open, setOpen] = useState('');

    useEffect(() => {
        props.onGetMainExercises(props.login.id);
    }, []);

    const onChangeMainExercise = (name, value) => {
        setMainExerciseData((state) =>
            ({
                ...state,
                [name]: value
            })
        );
    };

    const calculate1RM = (name, value) => {
        onChangeMainExercise(name, value);

        switch (name) {
            case 'oneRmKg' :
                update1RM('oneRm', value, mainExerciseData.oneRmReps);
                break;
            case'oneRmReps':
                update1RM('oneRm', mainExerciseData.oneRmKg, value);
                break;
            default:
                break;
        }
    };

    const update1RM = (oneRM, kg, reps) => {
        setMainExerciseData((state) =>
            ({
                ...state,
                [oneRM]: calculateOneRm(kg, reps)
            })
        );
    };

    const onUpdate = (event) => {
        event.preventDefault()

        props.onUpdateMainExercise(mainExerciseData, props.login.id);
    };

    const onMainExerciseClick = (index) => {
        // props.onClearError();
        let o = [];
        o[index] = !open[index];
        setOpen(o);
        setSelectedMainExercise(index);

        setMainExerciseData({
            id: props.mainExercise.mainExercises[index].id,
            name: props.mainExercise.mainExercises[index].name,
            restTime: props.mainExercise.mainExercises[index].restTime,
            weightIncrement: props.mainExercise.mainExercises[index].weightIncrement,
            oneRmKg: props.mainExercise.mainExercises[index].oneRmKg,
            oneRmReps: props.mainExercise.mainExercises[index].oneRmReps,
            oneRm: props.mainExercise.mainExercises[index].oneRm,
            notes: props.mainExercise.mainExercises[index].notes,
            exerciseNumber: props.mainExercise.mainExercises[index].exerciseNumber,
        });
    };

    let screenRows = '';

    screenRows = (
        <MainExerciseList
            mainExercises={ props.mainExercise.mainExercises }
            onMainExerciseClick={ onMainExerciseClick }
            selectedMainExercise={ selectedMainExercise }
            mainExerciseData={ mainExerciseData }
            error={ props.error }
            onChangeMainExercise={ onChangeMainExercise }
            calculate1RM={ calculate1RM }
            onUpdate={ onUpdate }
            open={ open }
        />
    );

    return (
        <React.Fragment>
            <Header header={ "Main Exercises" }/>

            { props.mainExercise.loading ?
                <Loading/>
                :
                screenRows }
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        mainExercise: state.mainExerciseReducer,
        login: state.loginReducer,
        error: state.errorReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetMainExercises: (loginId) => dispatch(actions.getMainExercises(loginId)),
        onUpdateMainExercise: (mainExerciseData, loginId) => dispatch(actions.changeMainExercise(mainExerciseData, loginId)),
        onClearError: () => dispatch(actions.clearError()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainExercise);
