import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import {Typography} from '@material-ui/core';
import {Grid} from '@material-ui/core';

const WorkoutDaysList = props => {
    // Properties
    const {
        workoutDaysList,
        onCycleListClick,
        selectedCycle,
        openCycle,
        onWeekListClick,
        selectedWeek,
        openWeek,
        onDayListClick,
        selectedDay,
        openDay,
        onSetListClick,
        selectedSet,
        // openSet
    } = props;

    if (workoutDaysList.workoutDays.length === 0) {
        return null;
    }

    // let cycle = 0;
    // const checkCycle = (c) => {
    //     if (cycle === c) {
    //         return null;
    //     } else {
    //         cycle = c;
    //         return <h4>Workout Cycle { cycle }</h4>;
    //     }
    // };
    //
    // let week = 0;
    // const checkWeek = (w) => {
    //     if (week === w) {
    //         return null;
    //     } else {
    //         week = w;
    //         return <h4>Workout Week { week }</h4>;
    //     }
    // };
    //
    // let day = 0;
    // const checkDay = (d) => {
    //     if (day === d) {
    //         return null;
    //     } else {
    //         day = d;
    //         return <h4>Workout Day { day }</h4>;
    //     }
    // };

    const workoutDays = (
        <List style={ {maxHeight: 800, overflow: "auto"} } component="nav" key={ "c" }>
            { workoutDaysList.workoutDays.cycleDtos.map((woCycle, i) => {

                    let weekLines = [];
                    weekLines.push(
                        <List component="nav" key={ "w" }>
                            { woCycle.weekDtos.map((woWeek, ii) => {

                                let dayLines = [];
                                dayLines.push(
                                    <List component="nav" key={ "d" + ii }>
                                        { woWeek.dayDtos.map((woDay, iii) => {

                                            let setLines = [];
                                            setLines.push(
                                                <List component="nav" key={ "s" + iii }>
                                                    { woDay.setDtos.map((woSet, iiii) => {

                                                        return (
                                                            <div key={ iiii }>
                                                                <ListItem
                                                                    divider
                                                                    key={ iiii }
                                                                    index={ iiii }
                                                                    button
                                                                    selected={ selectedSet === iiii }
                                                                    onClick={ event => onSetListClick(iiii) }
                                                                >
                                                                    <Grid container justify='space-around' alignItems='center'>
                                                                        <Grid item>
                                                                            { woSet.kgs }
                                                                        </Grid>
                                                                        <Grid item>
                                                                            { woSet.reps }
                                                                        </Grid>
                                                                    </Grid>
                                                                </ListItem>
                                                                {/*<Collapse in={ openSet[i] } timeout="auto" unmountOnExit>*/ }
                                                                {/*    { setLines }*/ }
                                                                {/*</Collapse>*/ }
                                                            </div>
                                                        );
                                                    })
                                                    }
                                                </List>
                                            );

                                            return (
                                                <div key={ iii }>
                                                    <ListItem
                                                        divider
                                                        key={ iii }
                                                        index={ iii }
                                                        button
                                                        selected={ selectedDay === iii }
                                                        onClick={ event => onDayListClick(iii) }
                                                    >
                                                        <Grid container>
                                                            <ListItemText
                                                                primary={
                                                                    <Typography
                                                                        style={ {width: '100%', textIndent: 20} }
                                                                    >
                                                                        { woDay.exercise }
                                                                    </Typography> }/>
                                                        </Grid>
                                                        { openDay[iii] ? <ExpandLess/> : <ExpandMore/> }
                                                    </ListItem>
                                                    <Collapse in={ openDay[iii] } timeout="auto" unmountOnExit>
                                                        <Grid container  justify='space-around' alignItems='center'>
                                                            <Grid item style={{marginLeft: 20, paddingTop: 0, paddingBottom: 0}}>
                                                                <Typography
                                                                    variant="caption"
                                                                >
                                                                    Kg
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography
                                                                variant="caption"
                                                                >
                                                                    Reps
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        { setLines }
                                                    </Collapse>
                                                </div>
                                            );
                                        })
                                        }
                                    </List>
                                );

                                return (
                                    <div key={ ii }>
                                        <ListItem
                                            divider
                                            key={ ii }
                                            index={ ii }
                                            button
                                            selected={ selectedWeek === ii }
                                            onClick={ event => onWeekListClick(ii) }
                                        >
                                            <Grid container>
                                                <ListItemText
                                                    primary={
                                                        <Typography
                                                            style={ {width: '100%', textIndent: 10} }
                                                        >
                                                            Week { woWeek.week }
                                                        </Typography> }/>
                                            </Grid>
                                            { openWeek[ii] ? <ExpandLess/> : <ExpandMore/> }
                                        </ListItem>
                                        <Collapse in={ openWeek[ii] } timeout="auto" unmountOnExit>
                                            { dayLines }
                                        </Collapse>
                                    </div>
                                );
                            })
                            }
                        </List>
                    );

                    return (
                        <div key={ i }>
                            <ListItem
                                divider
                                key={ i }
                                index={ i }
                                button
                                selected={ selectedCycle === i }
                                onClick={ event => onCycleListClick(i) }
                            >
                                <Grid container>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                style={ {width: '100%'} }
                                            >
                                                Cycle { woCycle.cycle }
                                            </Typography> }/>
                                </Grid>
                                { openCycle[i] ? <ExpandLess/> : <ExpandMore/> }
                            </ListItem>
                            <Collapse in={ openCycle[i] } timeout="auto" unmountOnExit>
                                { weekLines }
                            </Collapse>
                        </div>
                    );
                }
            ) }
        </List>
    );

    return (
        workoutDays
    );
};

export default WorkoutDaysList;
