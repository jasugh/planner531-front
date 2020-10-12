import React, {useEffect, useState} from 'react';

import {Grid} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';

import {connect} from 'react-redux';

import * as actions from '../../../store/actions';

import Header from '../../common/Header';
import WorkoutDaysList from './WorkoutDaysList';


const styles = makeStyles((theme) => ({
    layout: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('md')]: {
            width: 335,
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    }
}));

const WorkoutDays = props => {
    const [selectedCycle, setSelectedCycle] = useState('');
    const [openCycle, setOpenCycle] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('');
    const [openWeek, setOpenWeek] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [openDay, setOpenDay] = useState('');
    const [selectedSet, setSelectedSet] = useState('');
    const [openSet, setOpenSet] = useState('');

    useEffect(() => {
        props.onGetWorkoutDays(props.login.id);
    }, []);

    // Styling
    const classes = styles();

    const onCycleListClick = (index) => {
        let o = [];
        o[index] = !openCycle[index];
        setOpenCycle(o);
        setSelectedCycle(index);

        setOpenWeek('');
        setSelectedWeek('');
        setOpenDay('');
        setSelectedDay('');
        setOpenSet('');
        setSelectedSet('');
    };

    const onWeekListClick = (index) => {
        let o = [];
        o[index] = !openWeek[index];
        setOpenWeek(o);
        setSelectedWeek(index);

        setOpenDay('');
        setSelectedDay('');
        setOpenSet('');
        setSelectedSet('');
    };

    const onDayListClick = (index) => {
        let o = [];
        o[index] = !openDay[index];
        setOpenDay(o);
        setSelectedDay(index);

        setOpenSet('');
        setSelectedSet('');
    };

    const onSetListClick = (index) => {
        let o = [];
        o[index] = !openSet[index];
        setOpenSet(o);
        setSelectedSet(index);
    };


    let screenRows = (
        <WorkoutDaysList
            workoutDaysList={ props.workoutDays }
            selectedCycle={ selectedCycle }
            onCycleListClick={ onCycleListClick }
            openCycle={ openCycle }
            selectedWeek={ selectedWeek }
            onWeekListClick={ onWeekListClick }
            openWeek={ openWeek }
            selectedDay={ selectedDay }
            onDayListClick={ onDayListClick }
            openDay={ openDay }
            onSetListClick={ onSetListClick }
            selectedSet={ selectedSet }
            openSet={ openSet }
        />
    );

    return (
        <>
            <Header header={ "Workout Days" }/>

            <div className={ classes.layout }>
                { props.workoutDays.loading ?
                    <Grid container justify="center">
                        <CircularProgress/>
                    </Grid>
                    :
                    screenRows
                }
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        login: state.login,
        error: state.error,
        workoutDays: state.workoutDays
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetWorkoutDays: (loginId) => dispatch(actions.getWorkoutDaysByLoginId(loginId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDays);
