import React, {useState} from 'react';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import {NoteAdd} from '@material-ui/icons';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';


const styles = makeStyles((theme) => ({
//Table row selected ->
        tableRow: {
            "&$selected, &$selected:hover": {
                backgroundColor: theme.palette.primary.light
            }
        },
        selected: {},
//Table row selected <-
        dividerColor: {
            marginTop: 10,
            height:
                2,
            backgroundColor:
            theme.palette.primary.main,
        }
        ,
// blue         2196f3
// lightblue    03a9f4
// black        263238
// bluegrey     607d8b
// deeporange   ff5722
// red          f44336

        iconColor: {
            background: theme.palette.primary.A100
        },
        noteAddColorLight: {
            color: theme.palette.primary.A100
        },
        noteAddColorDark: {
            color: theme.palette.primary.main
        },
        paddingBottom: {
            paddingBottom: 10
        }
        ,
        inputSize: {
            width: 100,
        }
        ,
//Table
        noBorder: {
            border: 0,
        }
        ,
        kgsReps: {
            width: 5,
            border:
                0,
            paddingLeft:
                4,
        }
        ,
        kgRep: {
            width: 40,
            border:
                0,
            paddingRight:
                0,
        }
        ,
        tableCell1: {
            width: 400,
            border:
                0,
        }
        ,
        height: {
            height: 24
        },
        typography: {
            padding: theme.spacing(2),
        }
    })
);

const WorkoutExerciseSets = props => {
    const [index, setIndex] = useState('');
    // const [kgs, setKgs] = useState('');
    // const [reps, setReps] = useState('');
    const [notes, setNotes] = useState('');
    const [addNotes, setAddNotes] = useState(true);
    const [error, setError] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    //Properties
    const {exercise, onClickRow} = props;
    //Styling
    const classes = styles();

    let save_update_comment = 'save';
    let cancel_delete_comment = 'cancel';

    // if (this.state.add_comment === false) {
    //     save_update_comment = 'update';
    //     cancel_delete_comment = 'delete';
    // }

    const onClickRowEvent = (i) => {
        if (i === index) {
            setIndex('');
        } else {
            setIndex(i);
            // console.log('exercise.exerciseSets[i].kgs', exercise.exerciseSets[i].kgs);

            // setKgs(exercise.exerciseSets[i].kgs);
            // setReps(exercise.exerciseSets[i].reps);
        }
        onClickRow(exercise.exerciseSets[i].kgs, exercise.exerciseSets[i].reps)
    };

    const onOpenDialog = (index) => {
        // if (!isEmpty(this.state.workout.exercises[0].sets[index].comment)) {
        //     this.setState({
        //         comment: this.state.workout.exercises[0].sets[index].comment
        //     });
        //
        //     this.setState({add_comment: false})
        // } else {
        //     this.setState({add_comment: true})
        // }
        //
        // this.setState({dialogOpen: true, index: index});
    };

    const onCloseDialog = (event) => {
        // this.setState({dialogOpen: false, comment: ''});
    };

    const onClickFinished = (i, event) => {
        // let w = this.state.workout;
        // let s = this.state.workout.exercises[0].sets;
        //
        // s[index].finished = !s[index].finished;
        // w.exercises[0].sets = s;
        // this.setState({workout: w});
        //
        // if (s[index].finished) {
        //     this.startTimer();
        // }
    };

    const onAlertClose = (event) => {
        setAlertOpen(false);
    };

    const onStay = () => {
        setAlertOpen(false);
    };

    const onGo = () => {
        setAlertOpen(false);
        // this.props.history.push('/workout/calendar');
    };

    const onChange = (event) => {
        // this.setState({[event.target.name]: event.target.value});
    };

    const onSaveComment = (event) => {
        let w = this.state.workout;
        let s = this.state.workout.exercises[0].sets;

        s[this.state.index].comment = this.state.comment;
        w.exercises[0].sets = s;
        this.setState({workout: w, dialogOpen: false, index: '', comment: ''});
    };

    const onDeleteComment = (event) => {
        let w = this.state.workout;
        let s = this.state.workout.exercises[0].sets;

        s[this.state.index].comment = '';
        w.exercises[0].sets = s;
        this.setState({workout: w, dialogOpen: false, index: ''});
    };

    return (
        <Grid container justify="center">
            <Table size="small">
                <TableBody>
                    { exercise.exerciseSets.map((sets_row, i) => {
                        return (
                            <TableRow
                                classes={ {selected: classes.selected} }
                                className={ classes.tableRow }
                                hover
                                selected={ i === index }
                                key={ i }
                            >
                                <TableCell className={ classes.noBorder }>
                                    <IconButton
                                        className={ sets_row.notes.length === 0 ? classes.noteAddColorLight : classes.noteAddColorDark }
                                        style={ {padding: 0} }
                                        onClick={ onOpenDialog }
                                    >
                                        <NoteAdd/>
                                    </IconButton>
                                </TableCell>
                                <TableCell
                                    className={ classes.noBorder }
                                    onClick={ () => onClickRowEvent(i) }
                                    name="index"
                                >
                                    { i + 1 }
                                </TableCell>
                                <TableCell
                                    className={ classes.kgRep }
                                    style={{fontSize:'1.2rem'}}
                                    onClick={ () => onClickRowEvent(i) }
                                    name="index"
                                    align="right">
                                    { (() => {
                                        var num = parseFloat(sets_row.kgs);
                                        return num.toFixed(1);
                                    })() }
                                </TableCell>
                                <TableCell
                                    className={ classes.kgsReps }
                                    // style={{fontSize:'0.75rem'}}
                                    onClick={ () => onClickRowEvent(i) }
                                    name="index"
                                    align="right">
                                    kgs
                                </TableCell>
                                <TableCell
                                    className={ classes.kgRep }
                                    style={{fontSize:'1.2rem'}}
                                    onClick={ () => onClickRowEvent(i) }
                                    name="index"
                                    align="right">
                                    { sets_row.reps }
                                </TableCell>
                                <TableCell
                                    className={ classes.kgsReps }
                                    // style={{fontSize:'0.75rem'}}
                                    onClick={ () => onClickRowEvent(i) }
                                    name="index"
                                    align="right">
                                    reps
                                </TableCell>
                                <TableCell className={ classes.noBorder }>
                                    <IconButton
                                        style={ {padding: 0} }
                                        color="primary"
                                    >
                                        <Checkbox
                                            className={ classes.customCheckBox }
                                            style={ {padding: 0} }
                                            onChange={ (event) => onClickFinished(event, i) }
                                            value="finished"
                                            checked={ sets_row.finished }
                                            color="primary"
                                        >
                                        </Checkbox>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    }) }
                </TableBody>
            </Table>


            <Dialog
                open={ alertOpen }
                onClose={ onAlertClose }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{ "Next Exercise" }</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sets complete. Do you want to go back to calendar?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ onGo } color="primary" autoFocus>
                        Go
                    </Button>
                    <Button onClick={ onStay } color="primary">
                        Stay
                    </Button>

                </DialogActions>
            </Dialog>


            <Dialog open={ dialogOpen }
                    onClose={ onCloseDialog }
                    aria-labelledby="form-dialog-title">
                <DialogTitle
                    id="form-dialog-title">
                    Comment
                </DialogTitle>
                <DialogContent>
                    {/*<DialogContentText>*/ }
                    {/*</DialogContentText>*/ }
                    <TextField
                        value={ notes }
                        onChange={ onChange }
                        autoFocus
                        margin="dense"
                        name="comment"
                        label="Comment"
                        type="text"
                        fullWidth
                        multiline={ true }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        style={ {
                            width: 150,
                            marginTop: 10,
                            marginBottom: 10
                        } }
                        size="small"
                        variant={ "contained" }
                        color="primary"
                        onClick={ onSaveComment }
                    >
                        { save_update_comment }
                    </Button>

                    <Button
                        style={ {
                            width: 150,
                            marginTop: 10,
                            marginBottom: 10
                        } }
                        size="small"
                        variant={ "contained" }
                        color="inherit"
                        onClick={ addNotes ? onCloseDialog : onDeleteComment }
                    >
                        { cancel_delete_comment }
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>

    );
};

export default WorkoutExerciseSets;
