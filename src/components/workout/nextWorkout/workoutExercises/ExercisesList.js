import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Button, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {DeleteOutline} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
        kgsReps: {
            width: 5,
            border: 0,
            paddingLeft: 4,
        },
        kgRep: {
            width: 40,
            border: 0,
            paddingRight: 0,
        },
        tableCell1: {
            width: 400,
            border: 0,
        },
        //Card rgba(51, 110, 123, 1)
        card: {
            // paddingBottom: 0,
            // borderStyle: 'solid',
            // borderColor: theme.palette.primary.main,
            // boxShadow: 'rgba(96, 125, 139, 1) 0px 1px 6px, rgba(96, 125, 139, 1) 0px 1px 4px'
        },
        cardPadding: {
            "&:last-child": {
                paddingBottom: 0
            },
            details: {
                display: 'flex',
                flexDirection: 'column',
            },
        },
        dividerColor: {
            marginTop: 0,
            height: 2,
            backgroundColor: theme.palette.primary.main,
        },
        progressDiv: {
            width: 20,
            paddingBottom: 10,
            paddingRight: 10
        },
        iconColor: {
            marginRight: 20,
            color: theme.palette.primary.main,
        },
        deleteIcon: {
            color: theme.palette.secondary.main,
        }
    })
);

const ExercisesList = props => {
    const [draggedExercise, setDraggedExercise] = useState(-1);
    const [exercises, setExercises] = useState([]);

    // Properties
    const {workout, onStartWorkout, onDeleteExercise} = props;
    // Styling
    const classes = styles();

    useEffect(() => {
        setExercises(workout.exerciseDays);
    }, []);

    //*************************************************************************
    // Drag and drop events

    const onDragEvent = (event, i) => {
        event.preventDefault();
        setDraggedExercise(i);
    };

    const onDragOverEvent = (event) => {
        event.preventDefault();
    };

    const onDropEvent = (event, i) => {
        Array.prototype.swap = function (x, y) {
            const b = this[x];
            this[x] = this[y];
            this[y] = b;
            return this;
        };

        const e = exercises;
        e.swap(draggedExercise, i);
        setExercises(e);

        const newSortedArray = [...exercises];
        setExercises(newSortedArray);
    };
    //*************************************************************************

    return (
        <div>
            { exercises.map((exercise_row, i) => {
                return (
                    <div key={ i }>
                        <Card
                            className={ classes.card }
                            elevation={ 5 }>
                            <CardActionArea>
                                <CardActions
                                    onClick={ () => onStartWorkout(exercises[i]) }
                                    data-position={ i }
                                    draggable
                                    onDrag={ (event) => onDragEvent(event, i) }
                                    onDrop={ (event) => onDropEvent(event, i) }
                                    onDragOver={ (event) => onDragOverEvent(event) }
                                >
                                    <CardContent className={ classes.cardPadding }>
                                        <Grid
                                            style={ {
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            } }>
                                            <Typography
                                                value={ exercise_row.exerciseName }
                                                name={ "exerciseName" }
                                            >
                                                { exercise_row.exerciseName }
                                            </Typography>
                                            <div className={ classes.progressDiv }>
                                                { (() => {
                                                    let count = 0;
                                                    for (let i = 0; i < exercise_row.exerciseSets.length; ++i) {
                                                        if (exercise_row.exerciseSets[i].finished === true)
                                                            count++;
                                                    }
                                                    return count === exercise_row.exerciseSets.length;
                                                })() ?
                                                    (
                                                        <DoneOutlineIcon
                                                            className={ classes.iconColor }/>
                                                    )
                                                    :
                                                    (
                                                        ''
                                                    ) }
                                            </div>
                                        </Grid>
                                        <Divider
                                            classes={ {
                                                root: classes.dividerColor,
                                            } }
                                        />
                                        <Table
                                            size="small"
                                            key={ i }>
                                            <TableBody>
                                                { exercises[i].exerciseSets.map((sets_row, ii) => {
                                                    return (
                                                        <TableRow
                                                            className={ classes.row }
                                                            key={ sets_row.id }>
                                                            <TableCell
                                                                className={ classes.tableCell1 }>
                                                            </TableCell>
                                                            <TableCell className={ classes.kgRep }
                                                                       align="right">
                                                                { (() => {
                                                                    var num = parseFloat(sets_row.kgs);
                                                                    return num.toFixed(1);
                                                                })() }
                                                            </TableCell>
                                                            <TableCell
                                                                className={ classes.kgsReps }
                                                                align="right">
                                                                kgs
                                                            </TableCell>
                                                            <TableCell
                                                                className={ classes.kgRep }
                                                                align="right">
                                                                { sets_row.reps }
                                                            </TableCell>
                                                            <TableCell
                                                                className={ classes.kgsReps }
                                                                align="right">
                                                                reps
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                }) }
                                            </TableBody>
                                        </Table>
                                        <Divider
                                            classes={ {
                                                root: classes.dividerColor,
                                            } }
                                        />
                                    </CardContent>
                                </CardActions>
                            </CardActionArea>

                            <CardActions>
                                <Button
                                    onClick={ () => onDeleteExercise(exercises[i]) }
                                >
                                    <DeleteOutline className={ classes.deleteIcon }/>
                                </Button>
                            </CardActions>
                        </Card>
                        <br/>
                    </div>
                );
            }) }
        </div>
    );
};

export default ExercisesList;
