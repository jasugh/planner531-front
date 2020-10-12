import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const styles = makeStyles((theme) => ({
    typographyHeader: {
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bolder',
        color: theme.palette.primary.dark
    },
}));

const SectionTitle = props => {
    // Styling
    const classes = styles();
    //props
    const {title, toolTip} = props;

    return (
        <Tooltip title={toolTip}>
        <Typography
                variant="subtitle2"
                className={ classes.typographyHeader }
            >
            {title}
            </Typography>
        </Tooltip>
    );
};

export default SectionTitle;
