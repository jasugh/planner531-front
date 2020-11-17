import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';

import {Grid} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import isEmpty from '../../validation/is-empty';
import calculateOneRm from '../common/calculateOneRm';
import * as actions from '../../store/actions/index';

import ExerciseDetails from './ExerciseDetails';
import ExerciseList from './ExerciseList';
import Header from '../common/Header';
import Loading from '../common/Loading';

const styles = makeStyles((theme) => ({
    fabBottom: {
        margin: theme.spacing(1),
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(3),
        zIndex: 1
    },
    snackbar: {
        [theme.breakpoints.down('xs')]: {
            bottom: 90,
        },
    },
}));

const Exercise = props => {
    const [showAddScreen, setShowAddScreen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [open, setOpen] = useState('');
    const [buttonText, setButtonText] = useState('add');
    const [exerciseData, setExerciseData] = useState(
        {
            id: 0,
            name: '',
            categoryId: '',
            restTime: 0,
            weightIncrement: 0,
            oneRmKg: 0,
            oneRmReps: 0,
            oneRm: 0,
            notes: ''
        });

    useEffect(() => {
        props.onGetCategories();
        props.onGetExercises();
    }, []);

    // Styling
    const classes = styles();

    const onShowAddScreen = () => {
        if (selectedCategory >= 0 && props.category.categories.length > 0) {
            setExerciseData({
                id: 0,
                name: '',
                categoryId: props.category.categories[selectedCategory].id,
                restTime: 0,
                weightIncrement: 0,
                oneRmKg: 0,
                oneRmReps: 0,
                oneRm: 0,
                notes: ''
            });
            setShowAddScreen(true);
            setButtonText('add');
        } else {
            props.onSendError("Select a category");
        }
    };

    const onAddUpdate = () => {
        if (exerciseData.id > 0) {
            props.onChangeExercise(exerciseData);
        } else {
            props.onAddExercise(exerciseData);
        }
        setShowAddScreen(false);
    };

    const onCategoryListClick = (index) => {
        props.onClearError();
        let o = [];
        o[index] = !open[index];
        setOpen(o);
        setSelectedCategory(index);
    };

    const onExerciseListClick = (index) => {
        setShowAddScreen(true);
        setButtonText("update");
        setExerciseData({
            id: props.category.categories[selectedCategory].exercises[index].id,
            name: props.category.categories[selectedCategory].exercises[index].name,
            categoryId: props.category.categories[selectedCategory].id,
            restTime: props.category.categories[selectedCategory].exercises[index].restTime,
            weightIncrement: props.category.categories[selectedCategory].exercises[index].weightIncrement,
            oneRmKg: props.category.categories[selectedCategory].exercises[index].oneRmKg,
            oneRmReps: props.category.categories[selectedCategory].exercises[index].oneRmReps,
            oneRm: props.category.categories[selectedCategory].exercises[index].oneRm,
            notes: props.category.categories[selectedCategory].exercises[index].notes
        });
    };

    const onDelete = () => {
        props.onRemoveExercise(exerciseData.id);
        setExerciseData({
            id: 0,
            name: '',
            categoryId: '',
            restTime: 0,
            weightIncrement: 0,
            oneRmKg: 0,
            oneRmReps: 0,
            oneRm: 0,
            notes: ''
        });
        setShowAddScreen(false);
    };

    const onCancel = () => {
        props.onClearError();
        setShowAddScreen(false);
    };

    const onChangeExercise = (name, value) => {
        setExerciseData((state) =>
            ({
                ...state,
                [name]: value
            })
        );
    };

    const calculate1RM = (name, value) => {
        onChangeExercise(name, value);

        switch (name) {
            case 'oneRmKg' :
                update1RM('oneRm', value, exerciseData.oneRmReps);
                break;
            case'oneRmReps':
                update1RM('oneRm', exerciseData.oneRmKg, value);
                break;
            default:
                break;
        }
    };

    const update1RM = (oneRM, kg, reps) => {
        setExerciseData((state) =>
            ({
                ...state,
                [oneRM]: calculateOneRm(kg, reps)
            })
        );
    };

    let screenRows = '';

    const actionsScreenRows = (
            <ExerciseDetails
                exerciseData={ exerciseData }
                categoryList={ props.category.categories }
                buttonText={ buttonText }
                error={ props.error }
                onChangeExercise={ onChangeExercise }
                calculate1RM={ calculate1RM }
                onAddUpdate={ onAddUpdate }
                onDelete={ onDelete }
                onCancel={ onCancel }
            />
    );

    screenRows = (
        <ExerciseList
            categoryList={ props.category.categories }
            onExerciseListClick={ onExerciseListClick }
            onCategoryListClick={ onCategoryListClick }
            selectedCategory={ selectedCategory }
            open={ open }
        />
    );

    if (showAddScreen || (!isEmpty(props.error.message) && !isEmpty(props.error.field))) {
        screenRows = actionsScreenRows;
    }

    return (
        <>
            <Header header={ "Exercises" }/>

            <Grid container direction="column" justify='center'>
                <Fab
                    className={ classes.fabBottom }
                    color="primary"
                    aria-label="add"
                    onClick={ onShowAddScreen }
                    disabled={ showAddScreen }
                >
                    <Tooltip
                        title={ "Add a new exercise" }
                    >
                        <AddIcon
                            color="inherit"
                        />
                    </Tooltip>
                </Fab>
                <Snackbar
                    open={ !isEmpty(props.error.message) }
                    anchorOrigin={ {vertical: 'bottom', horizontal: 'center'} }
                >
                    <Alert severity="error">
                        { props.error.message }
                    </Alert>
                </Snackbar>
            </Grid>

            { props.category.loading ?
                <Loading/>
                :
                screenRows
            }

        </>
    );
};

const mapStateToProps = state => {
    return {
        exercise: state.exerciseReducer,
        category: state.categoryReducer,
        error: state.errorReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCategories: () => dispatch(actions.getCategories()),
        onGetExercises: () => dispatch(actions.getExercises()),
        onAddExercise: (exerciseData) => dispatch(actions.addExercise(exerciseData)),
        onChangeExercise: (exerciseData) => dispatch(actions.changeExercise(exerciseData)),
        onRemoveExercise: (id) => dispatch(actions.removeExercise(id)),
        onClearError: () => dispatch(actions.clearError()),
        onSendError: (error) => dispatch(actions.sendError(error))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);
