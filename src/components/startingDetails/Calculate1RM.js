import React from 'react';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {makeStyles} from '@material-ui/core/styles';
import SectionTitle from './SectionTitle';
import Paper from '@material-ui/core/Paper';

const styles = makeStyles((theme) => ({
    kg: {
        width: 90,
        marginRight: 10,
    },
    reps: {
        width: 90,
        marginRight: 10
    },
    oneRm: {
        width: 90,
    },
    paper: {
        margin: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 20
    }
}));

const Calculate1RM = props => {
    // Properties
    const {startData, outputOnly, error, calculate1RM} = props;

    // Styling
    const classes = styles();


    const onChangeKgReps = (event) => {
        calculate1RM(event.target.name, event.target.value);
    };

    return (
        <Paper className={ classes.paper } elevation={ 2 }>
            <Grid container justify="center" alignItems="center">
                <SectionTitle
                    toolTip={ "Calculate 1RM's in order to create an exercise program corresponding to the trainee level" }
                    title={ "Enter your current lifts to calculate 1RM" }
                />

                <Grid item>
                    <Typography
                        variant="subtitle2"
                        color="primary"
                    >
                        Overhead Press
                    </Typography>

                    <TextField
                        className={ classes.kg }
                        disabled={outputOnly}
                        value={ startData.pressKg || ''}
                        error={ error.field === 'pressKg' }
                        name="pressKg"
                        type="number"
                        onChange={ onChangeKgReps }
                        inputProps={ {min: "1", max: "500", step: "1", style: {textAlign: 'center'}}}
                        InputProps={ {
                            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                        } }
                    />
                    <TextField
                        className={ classes.reps }
                        disabled={outputOnly}
                        value={ startData.pressReps || '' }
                        error={ error.field === 'pressKg' }
                        name="pressReps"
                        type="number"
                        onChange={ onChangeKgReps }
                        inputProps={ {min: "1", max: "20", step: "1", style: {textAlign: 'center'}} }
                        InputProps={ {
                            endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                        } }
                    />
                    <TextField
                        className={ classes.oneRm }
                        disabled
                        value={ startData.press1RM  || '' }
                        error={ error.field === 'pressKg' }
                        helperText={ error.field === 'pressKg' ? error.message : '' }
                        name="press1RM"
                        type="number"
                        inputProps={ {style: {textAlign: 'center'}} }
                        InputProps={ {
                            endAdornment: <InputAdornment position="end">1RM</InputAdornment>,
                        } }
                    />
                </Grid>
                <Grid item>
                    <Typography
                        variant="subtitle2"
                        color="primary"
                    >
                        Dead Lift
                    </Typography>
                    <TextField
                        className={ classes.kg }
                        disabled={outputOnly}
                        value={ startData.deadLiftKg || '' }
                        error={ error.field === 'deadLiftKg' }
                        name="deadLiftKg"
                        type="number"
                        onChange={ onChangeKgReps }
                        inputProps={ {min: "20", max: "500", step: "1", style: {textAlign: 'center'}} }
                        InputProps={ {
                            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                        } }
                    />
                    <TextField
                        className={ classes.reps }
                        disabled={outputOnly}
                        value={ startData.deadLiftReps || '' }
                        error={ error.field === 'deadLiftKg' }
                        name="deadLiftReps"
                        type="number"
                        onChange={ onChangeKgReps }
                        inputProps={ {min: "1", max: "20", step: "1", style: {textAlign: 'center'}} }
                        InputProps={ {
                            endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                        } }
                    />
                    <TextField
                        className={ classes.oneRm }
                        disabled
                        value={ startData.deadLift1RM  || '' }
                        error={ error.field === 'deadLiftKg' }
                        helperText={ error.field === 'deadLiftKg' ? error.message : '' }
                        name="deadLift1RM"
                        type="number"
                        inputProps={ {style: {textAlign: 'center'}} }
                        InputProps={ {
                            endAdornment: <InputAdornment position="end">1RM</InputAdornment>,
                        } }
                    />
                </Grid>

                <Grid item>
                    <Typography
                        variant="subtitle2"
                        color="primary"
                    >
                        Bench Press
                    </Typography>
                    <TextField
                        className={ classes.kg}
                        disabled={outputOnly}
                        value={ startData.benchPressKg || ''}
                        error={ error.field === 'benchPressKg' }
                        name="benchPressKg"
                        type="number"
                        onChange={ onChangeKgReps }
                        inputProps={ {min: "20", max: "500", step: "1", style: {textAlign: 'center'}} }
                        InputProps={ {
                            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                        } }
                    />
                    <TextField
                        className={ classes.reps }
                        disabled={outputOnly}
                        value={ startData.benchPressReps || '' }
                        error={ error.field === 'benchPressKg' }
                        name="benchPressReps"
                        type="number"
                        onChange={ onChangeKgReps }
                        inputProps={ {min: "1", max: "20", step: "1", style: {textAlign: 'center'}} }
                        InputProps={ {
                            endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                        } }
                    />
                    <TextField
                        className={ classes.oneRm }
                        disabled
                        value={ startData.benchPress1RM  || '' }
                        error={ error.field === 'benchPressKg' }
                        helperText={ error.field === 'benchPressKg' ? error.message : '' }
                        name="benchPress1RM"
                        type="number"
                        inputProps={ {style: {textAlign: 'center'}} }
                        InputProps={ {
                            endAdornment: <InputAdornment position="end">1RM</InputAdornment>,
                        } }
                    />
                </Grid>

                <Grid item>
                    <Typography
                        variant="subtitle2"
                        color="primary"
                    >
                        Squat
                    </Typography>
                    <TextField
                        className={ classes.kg}
                        disabled={outputOnly}
                        value={ startData.squatKg || '' }
                        error={ error.field === 'squatKg' }
                        name="squatKg"
                        type="number"
                        onChange={ onChangeKgReps }
                        inputProps={ {min: "20", max: "500", step: "1", style: {textAlign: 'center'}} }
                        InputProps={ {
                            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                        } }
                    />
                    <TextField
                        className={ classes.reps }
                        disabled={outputOnly}
                        value={ startData.squatReps || ''}
                        error={ error.field === 'squatKg' }
                        name="squatReps"
                        type="number"
                        onChange={ onChangeKgReps }
                        inputProps={ {min: "1", max: "20", step: "1", style: {textAlign: 'center'}} }
                        InputProps={ {
                            endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                        } }
                    />
                    <TextField
                        className={ classes.oneRm }
                        disabled
                        value={ startData.squat1RM  || '' }
                        error={ error.field === 'squatKg' }
                        helperText={ error.field === 'squatKg' ? error.message : '' }
                        name="squat1RM"
                        type="number"
                        inputProps={ {style: {textAlign: 'center'}} }
                        InputProps={ {
                            endAdornment: <InputAdornment position="end">1RM</InputAdornment>,
                        } }
                    />
                </Grid>

            </Grid>
        </Paper>
    );
};

export default Calculate1RM;
