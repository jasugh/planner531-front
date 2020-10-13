import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import SectionTitle from './SectionTitle';
import Calculate1RM from './Calculate1RM';
import ChangeDetails from './ChangeDetails';
import Paper from '@material-ui/core/Paper';

const styles = makeStyles((theme) => ({
    table: {
        marginLeft: 5
    },
    tableHeaders: {
        width: 60,
        color: theme.palette.primary.main,
    },
    paper: {
        margin: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 20
    }
}));

const StartDetails = props => {
    // Properties
    const {startData, outputOnly, error, onChangeStart, calculate1RM, changePercentages, onGeneratePlan, onStartOver} = props;
    // Styling
    const classes = styles();

    function createData(week, ws1, ws2, ws3) {
        return {week, ws1, ws2, ws3};
    }

    const rows = [
        createData(
            'Week 1',
            startData.w1percentages[0],
            startData.w1percentages[1],
            startData.w1percentages[2]
        ),
        createData(
            'Week 2',
            startData.w2percentages[0],
            startData.w2percentages[1],
            startData.w2percentages[2]
        ),
        createData(
            'Week 3',
            startData.w3percentages[0],
            startData.w3percentages[1],
            startData.w3percentages[2]
        ),
        createData(
            'Week 4',
            startData.w4percentages[0],
            startData.w4percentages[1],
            startData.w4percentages[2]
        ),
    ];

    let button;
    if (outputOnly) {
        button = (
            <Button
                type="submit"
                size='large'
                variant='contained'
                color='secondary'
                onClick={ onStartOver }
            >
                start over
            </Button>);
    } else {
        button = (
            <Button
                type="submit"
                size='large'
                variant='contained'
                color='primary'
                onClick={ onGeneratePlan }
            >
                generate 5/3/1 plan
            </Button>);
    }

    const onChangePercentages = (index, event) => {
        changePercentages(event.target.name, event.target.value, index);
    };

    return (
        <form>
            <Calculate1RM
                startData={ startData }
                outputOnly={ outputOnly }
                error={ error }
                calculate1RM={ calculate1RM }
            />
            <ChangeDetails
                startData={ startData }
                outputOnly={ outputOnly }
                error={ error }
                onChangeStart={ onChangeStart }
            />
            <Paper className={ classes.paper } elevation={ 2 }>
                <Grid container justify="center" alignItems="center">
                    <SectionTitle
                        toolTip={ "" }
                        title={ "5/3/1 Percentages" }
                    />

                    <Table className={ classes.table }>
                        <TableHead>
                            <TableRow>
                                <TableCell className={ classes.tableHeaders }> </TableCell>
                                <TableCell className={ classes.tableHeaders } style={{paddingLeft: 25}} >Set&nbsp;1</TableCell>
                                <TableCell className={ classes.tableHeaders } style={{paddingLeft: 25}}>Set&nbsp;2</TableCell>
                                <TableCell className={ classes.tableHeaders } style={{paddingLeft: 25}}>Set&nbsp;3</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { rows.map((row, index) => (
                                <TableRow key={ row.week }>
                                    <TableCell className={ classes.tableHeaders } style={{whiteSpace: 'nowrap'}} component="th" scope="row">
                                        { row.week }
                                    </TableCell>
                                    <TableCell style={ {width: 90} }>
                                        <TextField
                                            value={ row.ws1 }
                                            disabled={ outputOnly }
                                            name="0"
                                            type="number"
                                            onChange={ onChangePercentages.bind(this, index) }
                                            inputProps={ {min: "50", max: "95", step: "1.0", style: {textAlign: 'center'}} }
                                        /></TableCell>
                                    <TableCell style={ {width: 90} }>
                                        <TextField
                                            value={ row.ws2 }
                                            disabled={ outputOnly }
                                            name="1"
                                            type="number"
                                            onChange={ onChangePercentages.bind(this, index) }
                                            inputProps={ {min: "50", max: "95", step: "1.0", style: {textAlign: 'center'}} }
                                        /></TableCell>
                                    <TableCell style={ {width: 90} }>
                                        <TextField
                                            value={ row.ws3 }
                                            disabled={ outputOnly }
                                            name="2"
                                            type="number"
                                            onChange={ onChangePercentages.bind(this, index) }
                                            inputProps={ {min: "50", max: "95", step: "1.0", style: {textAlign: 'center'}} }
                                        /></TableCell>
                                </TableRow>
                            )) }
                        </TableBody>
                    </Table>
                </Grid>
            </Paper>

            <Grid style={ {padding: 20} } container justify="center" alignItems="center">
                <Grid item>
                    { button }
                </Grid>
            </Grid>
        </form>
    );
};

export default StartDetails;
