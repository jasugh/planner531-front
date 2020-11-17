import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';

import MainExerciseDetails from '../mainExercise/MainExerciseDetails';

const MainExerciseList = props => {
    const {
        mainExercises,
        onMainExerciseClick,
        selectedMainExercise,
        mainExerciseData,
        error,
        onChangeMainExercise,
        calculate1RM,
        onUpdate,
        open
    } = props;

    return (
        <List style={ {maxHeight: 800, overflow: "auto"} } component="nav" key={ "a" }>
            { mainExercises.map((mainExercise_row, i) => {

                    let collapseLines = [];
                    collapseLines.push(
                        <MainExerciseDetails
                            key={ "m" + i }
                            mainExerciseData={ mainExerciseData }
                            error={ error }
                            onChangeMainExercise={ onChangeMainExercise }
                            calculate1RM={ calculate1RM }
                            onUpdate={ onUpdate }
                        />
                    );

                    return (
                        <div key={ i }>
                            <ListItem
                                divider
                                key={ i }
                                index={ i }
                                button
                                selected={ selectedMainExercise === i }
                                onClick={ event => onMainExerciseClick(i) }
                            >
                                <ListItemText
                                    // primary={ `Exercise  ${ mainExercise_row.exerciseNumber } ` }
                                    primary={ mainExercise_row.name }
                                />
                                { open[i] ? <ExpandLess/> : <ExpandMore/> }
                            </ListItem>
                            <Collapse in={ open[i] } timeout="auto" unmountOnExit>
                                { collapseLines }
                            </Collapse>
                        </div>
                    );
                }
            ) }
        </List>
    );
};

export default MainExerciseList;
