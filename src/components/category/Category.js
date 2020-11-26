import React, {useEffect, useState, Fragment} from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
// import PropTypes from 'prop-types';

import {Grid} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from "@material-ui/core/Tooltip";

import isEmpty from '../../validation/is-empty';
import * as actions from '../../store/actions/index';
import CategoryDetails from './CategoryDetails';
import CategoryList from './CategoryList';
import GeneralError from '../common/GeneralError';
import Header from '../common/Header';
import Loading from '../common/Loading';

const styles = makeStyles((theme) => ({
    fabBottom: {
        margin: theme.spacing(1),
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(3),
        zIndex: 1
    },
    snackbar: {
        [theme.breakpoints.down('xs')]: {
            bottom: 90,
        },
    },
}));

const Category = props => {
    const [showAddScreen, setShowAddScreen] = useState(false);
    const [buttonText, setButtonText] = useState('Add');
    const [categoryData, setCategoryData] = useState(
        {
            id: 0,
            name: '',
            notes: ''
        });

    useEffect(() => {
        props.onGetCategories();
    }, []);

    // Styling
    const classes = styles();

    const onShowAddScreen = () => {
        setCategoryData({
            id: 0,
            name: '',
            notes: ''
        });

        setShowAddScreen(true);
        setButtonText('Add');
    };

    const onAddUpdate = () => {
        if (categoryData.id > 0) {
            props.onChangeCategory(categoryData);
        } else {
            props.onAddCategory(categoryData);

        }
        setShowAddScreen(false);
    };

    const onItemListClick = index => {
        setCategoryData({
            id: props.category.categories[index].id,
            name: props.category.categories[index].name,
            notes: props.category.categories[index].notes
        });

        setShowAddScreen(true);
        setButtonText('Update');
    };

    const onDelete = () => {
        props.onRemoveCategory(categoryData.id);
        setShowAddScreen(false);
    };

    const onCancel = () => {
        props.onClearError();
        setShowAddScreen(false);
    };


    const onChangeCategory = (name, value) => {
        setCategoryData((state) =>
            ({
                ...state,
                [name]: value
            })
        );
    };

    let screenRows = '';

    const actionsScreenRows = (
        <Grid container justify="center">
            <CategoryDetails
                categoryData={ categoryData }
                buttonText={ buttonText }
                error={ props.error }
                onChangeCategory={ onChangeCategory }
                onAddUpdate={ onAddUpdate }
                onDelete={ onDelete }
                onCancel={ onCancel }
            />
        </Grid>
    );

    screenRows = (
        <CategoryList
            categoryList={ props.category.categories }
            onItemListClick={ onItemListClick }
            loading={ props.category.loading }
        />
    );

    const generalError = (
        <GeneralError
            error={ props.error }
        />
    );

    if (showAddScreen || (!isEmpty(props.error.message) && !isEmpty(props.error.field))) {
        screenRows = actionsScreenRows;
    }
    if (!isEmpty(props.error.message) && isEmpty(props.error.field)) {
        screenRows = generalError;
    }

    return (
        <Fragment>
            <Header header={ "Categories" }/>

            <Grid container justify='center'>
                <Fab
                    className={ classes.fabBottom }
                    color="primary"
                    aria-label="add"
                    onClick={ onShowAddScreen }
                    disabled={ showAddScreen }
                >
                    <Tooltip
                        title={ "Add a new category" }
                    >
                        <AddIcon
                            color="inherit"
                        />
                    </Tooltip>
                </Fab>
            </Grid>

            { props.category.loading ?
                <Loading/>
                :
                screenRows }
        </Fragment>
    );
};

// category.propTypes = {
//     onAddUpdate: PropTypes.func,
// };

const mapStateToProps = state => {
    return {
        category: state.categoryReducer,
        error: state.errorReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCategories: () => dispatch(actions.getCategories()),
        onAddCategory: (categoryData) => dispatch(actions.addCategory(categoryData)),
        onChangeCategory: (categoryData) => dispatch(actions.changeCategory(categoryData)),
        onRemoveCategory: (id) => dispatch(actions.removeCategory(id)),
        onClearError: () => dispatch(actions.clearError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
