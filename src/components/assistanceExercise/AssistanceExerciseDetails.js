import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import {makeStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = makeStyles((theme) => ({
        exerciseRow: {
            paddingLeft: theme.spacing(10),
            background: '#fafafa'
        },
    })
);

const AssistanceExerciseDetails = props => {
    // Properties
    const {mainExercises, exercises, onAssistanceExerciseClick, onSelectExercise, selectedAssistanceExercise, open} = props;
    // Styling
    const classes = styles();

    const onChange = (event, id) => {
        onSelectExercise(event.target.value, id);
    };

    return (
        <List style={ {maxHeight: 800, overflow: "auto"} } component="nav" key={ "a" }>
            { mainExercises.map((mainExercise_row, i) => {

                    let collapseLines = [];
                    collapseLines.push(
                        <Select
                            key={"S" + i}
                            native
                            fullWidth
                            onChange={event => onChange(event, mainExercise_row.id)}
                            name="name"

                        >
                            <option value="">
                                Select exercise...
                            </option>
                            {exercises.map((row, index) => {
                                return (
                                    <option key={row.name} value={row.id}>
                                        {row.name}
                                    </option>
                                )
                            })}
                        </Select>
                    );

                // collapseLines.push(
                //     <Grid item xs={12} key={"b"}>
                //         <List style={{maxHeight: 800, overflow: "auto"}} component="nav">
                //             {this.state.add_exerciseA.map((a_row, index) => {
                //                 return (
                //                     <ListItem
                //                         className={classes.listItem}
                //                         divider
                //                         key={index}
                //                         index={index}
                //                         button
                //                         selected={this.state.selectedIndex === index}
                //                         // onClick={event => this.onListItemClick(event, index)}
                //                     >
                //                         <ListItemText primary={a_row.add_exercise}/>
                //                         <ListItemSecondaryAction>
                //                             <IconButton
                //                                 onClick={event => this.onDeleteClick(index, 'a')}
                //                                 edge="end"
                //                                 aria-label="delete"
                //                             >
                //                                 <DeleteIcon
                //                                     className={classes.deleteIcon}
                //                                 />
                //                             </IconButton>
                //                         </ListItemSecondaryAction>
                //                     </ListItem>
                //                 )
                //             })}
                //         </List>
                //     </Grid>
                // );

                    return (
                        <div key={ i }>
                            <ListItem
                                divider
                                key={ i }
                                index={ i }
                                button
                                selected={ selectedAssistanceExercise === i }
                                onClick={ event => onAssistanceExerciseClick(i) }
                            >
                                <ListItemText primary={ mainExercise_row.name }/>
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

export default AssistanceExerciseDetails;
