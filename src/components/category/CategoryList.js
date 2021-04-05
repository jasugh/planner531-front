import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
        list: {
            maxHeight: 800,
            overflow: "auto"
        }
    })
);

const CategoryList = props => {
    // Properties
    const {categoryList, onItemListClick} = props;
    // Styling
    const classes = useStyles();

    return (
        <List className={classes.list} component="nav">
            { categoryList.map((row, index) => {
                return (
                    <ListItem
                        divider
                        key={ row.id }
                        index={ index }
                        button
                        onClick={ event => onItemListClick(index) }
                    >
                        <ListItemText primary={ row.name } />
                    </ListItem>
                );
            }) }
        </List>
    );
};

export default CategoryList;
