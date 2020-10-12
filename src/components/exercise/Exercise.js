import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';

import {Grid} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";

import isEmpty from '../../validation/is-empty';
import * as actions from '../../store/actions/index';
import ExerciseDetails from './ExerciseDetails';
import ExerciseList from './ExerciseList';
import GeneralError from '../common/GeneralError';
import Header from '../common/Header';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const styles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(400 + theme.spacing(2) * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
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
    const [selectedCategory, setSelectedCategory] = useState('');
    const [open, setOpen] = useState('');
    const [buttonText, setButtonText] = useState('add');
    const [exerciseData, setExerciseData] = useState(
        {
            id: 0,
            name: '',
            categoryId: '',
            restTime: 0,
            weightIncrement: 0,
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
                notes: ''
            });
            setShowAddScreen(true);
            setButtonText('add');
        } else {
            props.onSendError("No categories found")
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

    let screenRows = '';

    const actionsScreenRows = (
        <Grid container justify="center">
            <ExerciseDetails
                exerciseData={ exerciseData }
                categoryList={ props.category.categories }
                buttonText={ buttonText }
                error={ props.error }
                onChangeExercise={ onChangeExercise }
                onAddUpdate={ onAddUpdate }
                onDelete={ onDelete }
                onCancel={ onCancel }
            />
        </Grid>
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

    const generalError = (
        <GeneralError
            error={ props.error }
        />
    );

    if (showAddScreen || (!isEmpty(props.error.message) && !isEmpty(props.error.field))) {
        screenRows = actionsScreenRows;
    }
    if (!isEmpty(props.error.message) && isEmpty(props.error.field)) {
        screenRows = generalError;
    }

    return (
        <div>
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
                    anchorOrigin={ {vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert severity="error">
                        { props.error.message}
                    </Alert>
                </Snackbar>
            </Grid>
            <div className={ classes.layout }>
                { props.category.loading ?
                    <Grid container justify="center">
                        <CircularProgress/>
                    </Grid>
                    :
                    screenRows }
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        exercise: state.exercise,
        category: state.category,
        error: state.error
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
