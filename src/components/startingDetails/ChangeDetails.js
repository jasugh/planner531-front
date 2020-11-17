import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import SectionTitle from './SectionTitle';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';

const styles = makeStyles((theme) => ({
    kg: {
        width: 90,
        marginRight: 10,
    },
    trainingPercent: {
        width: 90,
        marginRight: 30,
    },
    trainingCycles: {
        width: 90,
    },
    formControl: {
        width: '100%'
    },
    formControlLabel: {
        marginLeft: 0,
        marginRight: 0
    },
    radioGroup: {
        justifyContent: 'flex-start'
    },
    paper: {
        margin: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 20
    }
}));


const ChangeDetails = props => {
    // Properties
    const {startData, outputOnly, error, onChangeStart} = props;
    // Styling
    const classes = styles();

    const onChange = (event) => {
        onChangeStart(event.target.name, event.target.value);
    };

    return (
        <Paper className={ classes.paper } elevation={ 2 }>
            <Grid container justify="center" alignItems="center">

                {/*      Rounding values are not needed for now. Kilos are always rounded up to next 2.5    */}

                {/*<SectionTitle*/}
                {/*    toolTip={ "" }*/}
                {/*    title={ "Round values to the nearest of" }*/}
                {/*/>*/}

                <Grid item>
                    {/*<FormControl className={ classes.formControl }>*/}
                    {/*    <RadioGroup*/}
                    {/*        className={ classes.radioGroup }*/}
                    {/*        onChange={ onChange }*/}
                    {/*        value={ startData.weightRounding }*/}
                    {/*        row*/}
                    {/*        defaultValue={ startData.weightRounding }*/}
                    {/*    >*/}
                    {/*        <FormControlLabel*/}
                    {/*            disabled={outputOnly}*/}
                    {/*            className={ classes.formControlLabel }*/}
                    {/*            name="weightRounding"*/}
                    {/*            value="2.5"*/}
                    {/*            control={ <Radio color="primary"/> }*/}
                    {/*            label="2.5 kg"*/}
                    {/*        />*/}
                    {/*        <FormControlLabel*/}
                    {/*            disabled={outputOnly}*/}
                    {/*            className={ classes.formControlLabel }*/}
                    {/*            name="weightRounding"*/}
                    {/*            value="5"*/}
                    {/*            control={ <Radio color="primary"/> }*/}
                    {/*            label="5.0 kg"*/}
                    {/*        />*/}
                    {/*        <FormControlLabel*/}
                    {/*            disabled={outputOnly}*/}
                    {/*            className={ classes.formControlLabel }*/}
                    {/*            name="weightRounding"*/}
                    {/*            value="10"*/}
                    {/*            control={ <Radio color="primary"/> }*/}
                    {/*            label="10.0 kg"*/}
                    {/*        />*/}
                    {/*    </RadioGroup>*/}
                    {/*</FormControl>*/}
                </Grid>

                <SectionTitle
                    toolTip={ "After each of the four week phase, the lifter will increase her/his maxes no more than " +
                    "2,5 kilos per upper body lift, and 5 kilos for lower body lifts. These increases are to the " +
                    "max that you’re basing your percentages on." }

                    title={ "Weight increment by cycle" }
                />

                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <Typography
                            style={ {width: 104} }
                            variant="subtitle2"
                            color="primary"
                        >
                            Overhead Press
                        </Typography>
                        <Select
                            style={ {width: 90} }
                            disabled={outputOnly}
                            native
                            value={ startData.pressIncrement }
                            onChange={ onChange }
                            inputProps={ {
                                name: 'pressIncrement',
                                id: 'pressIncrement',
                            } }
                        >
                            <option value={ 2.5 }>2.5 kg</option>
                            <option value={ 5.0 }>5.0 kg</option>
                            <option value={ 10.0 }>10.0 kg</option>
                        </Select>

                        <Typography
                            variant="subtitle2"
                            color="primary"
                        >
                            Dead Lift
                        </Typography>
                        <Select
                            style={ {width: 90} }
                            disabled={outputOnly}
                            native
                            value={ startData.deadLiftIncrement }
                            onChange={ onChange }
                            inputProps={ {
                                name: 'deadLiftIncrement',
                                id: 'deadLiftIncrement',
                            } }
                        >
                            <option value={ 2.5 }>2.5 kg</option>
                            <option value={ 5.0 }>5.0 kg</option>
                            <option value={ 10.0 }>10.0 kg</option>
                        </Select>
                    </Grid>

                    <Grid item style={ {paddingLeft: 20} }>
                        <Typography
                            variant="subtitle2"
                            color="primary"
                        >
                            Bench Press
                        </Typography>
                        <Select
                            style={ {width: 90} }
                            disabled={outputOnly}
                            native
                            value={ startData.benchIncrement }
                            onChange={ onChange }
                            inputProps={ {
                                name: 'benchIncrement',
                                id: 'benchIncrement',
                            } }
                        >
                            <option value={ 2.5 }>2.5 kg</option>
                            <option value={ 5.0 }>5.0 kg</option>
                            <option value={ 10.0 }>10.0 kg</option>
                        </Select>

                        <Typography
                            variant="subtitle2"
                            color="primary"
                        >
                            Squat
                        </Typography>
                        <Select
                            style={ {width: 90} }
                            disabled={outputOnly}
                            native
                            value={ startData.squatIncrement }
                            onChange={ onChange }
                            inputProps={ {
                                name: 'squatIncrement',
                                id: 'squatIncrement',
                            } }
                        >
                            <option value={ 2.5 }>2.5 kg</option>
                            <option value={ 5.0 }>5.0 kg</option>
                            <option value={ 10.0 }>10.0 kg</option>
                        </Select>
                    </Grid>
                </Grid>

                <SectionTitle
                    toolTip={ "Each cycle lasts 4 weeks" }
                    title={ "Training max and cycles" }
                />

                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item style={ {width: 104, marginRight: 20} }>
                        <TextField
                            className={ classes.trainingPercent }
                            disabled={outputOnly}
                            value={ startData.trainingMax }
                            error={ error.field === 'trainingMax' }
                            helperText={ error.field === 'trainingMax' ? error.message : '' }
                            name="trainingMax"
                            type="number"
                            onChange={ onChange }
                            inputProps={ {min: "80", max: "95", step: "1.0", style: {textAlign: 'center'}} }
                            InputProps={ {
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            } }
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            className={ classes.trainingCycles }
                            disabled={outputOnly}
                            value={ startData.numberOfCycles }
                            error={ error.field === 'numberOfCycles' }
                            helperText={ error.field === 'numberOfCycles' ? error.message : '' }
                            name="numberOfCycles"
                            type="number"
                            onChange={ onChange }
                            inputProps={ {min: "4", max: "12", step: "1", style: {textAlign: 'center'}} }
                            InputProps={ {
                                endAdornment: <InputAdornment position="end">cycles</InputAdornment>,
                            } }
                        />
                    </Grid>
                </Grid>

            </Grid>
        </Paper>
    );
};

export default ChangeDetails;
