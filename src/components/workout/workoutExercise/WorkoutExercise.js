import React, {useEffect, useState} from 'react';

// import {connect} from 'react-redux';

import WorkoutExerciseWeightRep from './WorkoutExerciseWeightRep';
import WorkoutExerciseSets from './WorkoutExerciseSets';
import isEmpty from '../../../validation/is-empty';
import Header from '../../common/Header';
// import * as actions from '../../../store/actions';

const WorkoutExercise = props => {
    // <WorkoutExerciseWeightRep>
    const [kgs, setKgs] = useState(0);
    const [reps, setReps] = useState(0);
    const [index, setIndex] = useState('');
    const [error, setError] = useState({});
    const [exerciseSets, setExerciseSets] = useState([]);
    // <WorkoutExerciseSets>
    const [notes, setNotes] = useState('');
    const [addNotes, setAddNotes] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    //Properties
    const {exercise, onGoBack, startTimer, stopTimer, onUpdateSets} = props;

    useEffect(() => {
        setExerciseSets(exercise.exerciseSets);
        setKgs(exercise.exerciseSets[props.exercise.exerciseSets.length - 1].kgs);
        setReps(exercise.exerciseSets[props.exercise.exerciseSets.length - 1].reps);

        return (() => {
            onUpdateSets(exerciseSets)
        });
    }, []);
    //*************************************************************************
    // <WorkoutExerciseWeightRep>
    //*************************************************************************
    const onAddKgs = () => {
        let w = kgs;
        w = w + 2.5;
        if (w < 501) {
            setKgs(w);
        }
    };

    const onReduceKgs = () => {
        let w = kgs;
        w = w - 2.5;
        if (w >= 2.5 || w === 0) {
            setKgs(w);
        }
    };

    const onAddReps = () => {
        let r = reps;
        r++;
        if (r < 21) {
            setReps(r);
        }
    };

    const onReduceReps = () => {
        let r = reps;
        r--;
        if (r > 0 || r === 0) {
            setReps(r);
        }
    };

    const onSave = () => {
        if (!checkKgsReps()) return;

        const set = {
            id: null,
            kgs: kgs,
            reps: reps,
            finished: false,
            notes: ''
        };

        const newExerciseSets = [...exerciseSets, set];
        setExerciseSets(newExerciseSets);
    };

    const onUpdate = () => {
        if (!checkKgsReps()) return;

        const newExerciseSets = [...exerciseSets];
        let set = {...newExerciseSets[index]};
        set.kgs = kgs;
        set.reps = reps;

        newExerciseSets[index] = set;
        setExerciseSets(newExerciseSets);

        setIndex('');
    };

    const checkKgsReps = () => {
        setError({});

        if (kgs < 1 || undefined) {
            setError({kgs: 'Please enter Kilos'});
            return false;
        }

        if (reps < 1 || undefined) {
            setError({reps: 'Please enter Repetitions'});
            return false;
        }
        return true;
    };

    const onChange = (event) => {
        if (event.target.name === 'reps') {
            setReps(event.target.value);
        }
        if (event.target.name === 'kgs') {
            setKgs(event.target.value);
        }
    };

    const onClear = () => {
        setKgs(0);
        setReps(0);
    };

    const onDelete = () => {
        const newExerciseSets = [...exerciseSets];

        newExerciseSets.splice(index, 1);
        setExerciseSets(newExerciseSets);

        setIndex('');
    };
    //*************************************************************************
    // <WorkoutExerciseSets>//
    //*************************************************************************
    const onClickRow = (kgs, reps, i) => {
        setKgs(kgs);
        setReps(reps);

        if (i === index) {
            setIndex('');
        } else {
            setIndex(i);
        }
    };

    const onOpenNotesDialog = (i) => {
        isEmpty(exerciseSets[i].notes ? setAddNotes(false) : setAddNotes(true));
        setNotes(exerciseSets[i].notes);
        setDialogOpen(true);
        setIndex(i);
    };

    const onCloseNotesDialog = () => {
        setDialogOpen(false);
        setNotes('');
    };

    const onChangeNotes = (event) => {
        setNotes(event.target.value);
    };

    const onSaveNotes = () => {
        const newExerciseSets = [...exerciseSets];
        let set = {...newExerciseSets[index]};
        set.notes = notes;
        newExerciseSets[index] = set;
        setExerciseSets(newExerciseSets);

        setDialogOpen(false);
        setIndex('');
    };

    const onDeleteNotes = () => {
        const newExerciseSets = [...exerciseSets];
        let set = {...newExerciseSets[index]};
        set.notes = '';
        newExerciseSets[index] = set;
        setExerciseSets(newExerciseSets);

        setDialogOpen(false);
        setIndex('');
    };

    const onClickFinished = (i) => {
        const newExerciseSets = [...exerciseSets];
        let set = {...newExerciseSets[i]};
        set.finished = !set.finished;
        newExerciseSets[i] = set;
        setExerciseSets(newExerciseSets);
        setIndex('');

        // Start/stop rest timer
        if (set.finished) {
            startTimer(props.exercise.restTime);
        }
        if (!set.finished) {
            stopTimer();
        }
    };

    const onAlertClose = () => {
        // setAlertOpen(false);
    };

    const onStay = () => {
        // setAlertOpen(false);
    };

    const onGo = () => {
        // setAlertOpen(false);
        // this.props.history.push('/workout/calendar');
    };
    //*************************************************************************

    return (
        <>
            <Header header={ exercise.exerciseName }/>
            <WorkoutExerciseWeightRep
                kgs={ kgs }
                reps={ reps }
                index={ index }
                error={ error }
                onAddKgs={ onAddKgs }
                onReduceKgs={ onReduceKgs }
                onAddReps={ onAddReps }
                onReduceReps={ onReduceReps }
                onSave={ onSave }
                onUpdate={ onUpdate }
                onChange={ onChange }
                onClear={ onClear }
                onDelete={ onDelete }
            />
            <WorkoutExerciseSets
                exerciseSets={ exerciseSets }
                index={ index }
                notes={ notes }
                addNotes={ addNotes }
                dialogOpen={ dialogOpen }
                alertOpen={ alertOpen }
                onClickRow={ onClickRow }
                onOpenNotesDialog={ onOpenNotesDialog }
                onCloseNotesDialog={ onCloseNotesDialog }
                onChangeNotes={ onChangeNotes }
                onSaveNotes={ onSaveNotes }
                onDeleteNotes={ onDeleteNotes }
                onClickFinished={ onClickFinished }
                onGoBack={ onGoBack }
                onAlertClose={ onAlertClose }
                onGo={ onGo }
                onStay={ onStay }
            />
        </>
    );
};

export default  WorkoutExercise;

// const mapStateToProps = state => {
//     return {
//         login: state.loginReducer,
//     };
// };
//
// const mapDispatchToProps = dispatch => {
//     return {
//         onUpdateExerciseSets: (exerciseSets, woDayExerciseId, loginId) =>
//             dispatch(actions.updateExerciseSets(exerciseSets, woDayExerciseId, loginId))
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(WorkoutExercise);
