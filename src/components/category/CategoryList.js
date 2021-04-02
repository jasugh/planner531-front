import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const CategoryList = props => {
    // Properties
    const {categoryList, onItemListClick} = props;

    return (
        <List style={ {maxHeight: 800, overflow: "auto"} } component="nav">
            { categoryList.map((row, index) => {
                return (
                    <ListItem
                        divider
                        key={ row.id }
                        index={ index }
                        button
                        onClick={ event => onItemListClick(index) }
                    >
                        <ListItemText primary={ row.name }/>
                    </ListItem>
                );
            }) }
        </List>
    );
};

export default CategoryList;
