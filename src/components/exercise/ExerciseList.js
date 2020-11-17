import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
        exerciseRow: {
            paddingLeft: theme.spacing(10),
            background: '#fafafa'
        },
    })
);

const ExerciseList = props => {
    const {categoryList, onCategoryListClick, selectedCategory, onExerciseListClick, open} = props;

    const classes = styles();

    return (
        <List style={ {maxHeight: 800, overflow: "auto"} } component="nav" key={ "a" }>
            { categoryList.map((category_row, i) => {

                    let collapseLines = [];
                    collapseLines.push(
                        <List component="nav" key={ "a" + i }>
                            { category_row.exercises.map((exercise_row, ii) => {
                                return (
                                    <div key={ ii }>
                                        <ListItem
                                            divider
                                            className={ classes.exerciseRow }
                                            key={ ii }
                                            index={ ii }
                                            button
                                            onClick={ event => onExerciseListClick(ii) }
                                        >
                                            <ListItemText primary={ exercise_row.name }/>
                                        </ListItem>
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
                                selected={ selectedCategory === i }
                                onClick={ event => onCategoryListClick(i) }
                            >
                                <ListItemText primary={ category_row.name }/>
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

export default ExerciseList;
