import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import isEmpty from '../../validation/is-empty';
import * as actions from '../../store/actions/index';
import GeneralError from '../common/GeneralError';
import Header from '../common/Header';
import StartDetails from './StartDetails';
import moment from 'moment';
// import PlanFound from './PlanFound';

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

const Start = props => {
    const [outputOnly, setOutputOnly] = useState(false);
    const [startData, setStartData] = useState(
        {
            pressKg: '',
            pressReps: '',
            press1RM: '',
            deadLiftKg: '',
            deadLiftReps: '',
            deadLift1RM: '',
            benchPressKg: '',
            benchPressReps: '',
            benchPress1RM: '',
            squatKg: '',
            squatReps: '',
            squat1RM: '',
            weightRounding: "5",
            pressIncrement: 2.5,
            deadLiftIncrement: 5.0,
            benchIncrement: 2.5,
            squatIncrement: 5.0,
            trainingMax: 90,
            numberOfCycles: 12,
            w1percentages: [65, 75, 85],
            w2percentages: [70, 80, 90],
            w3percentages: [75, 85, 95],
            w4percentages: [40, 50, 60],
        });

    // Get initial data
    useEffect(() => {
        props.onGetStart(props.login.id);
    }, []);

    useEffect(() => {
        if (!isEmpty(props.startingDetails.startingDetails)) {
            setOutputOnly(true);
            setStartData({
                pressKg: props.startingDetails.startingDetails.pressKg,
                pressReps: props.startingDetails.startingDetails.pressReps,
                press1RM: calculateOneRM(
                    props.startingDetails.startingDetails.pressKg,
                    props.startingDetails.startingDetails.pressReps),
                deadLiftKg: props.startingDetails.startingDetails.deadLiftKg,
                deadLiftReps: props.startingDetails.startingDetails.deadLiftReps,
                deadLift1RM: calculateOneRM(
                    props.startingDetails.startingDetails.deadLiftKg,
                    props.startingDetails.startingDetails.deadLiftReps),
                benchPressKg: props.startingDetails.startingDetails.benchPressKg,
                benchPressReps: props.startingDetails.startingDetails.benchPressReps,
                benchPress1RM: calculateOneRM(
                    props.startingDetails.startingDetails.benchPressKg,
                    props.startingDetails.startingDetails.benchPressReps),
                squatKg: props.startingDetails.startingDetails.squatKg,
                squatReps: props.startingDetails.startingDetails.squatReps,
                squat1RM: calculateOneRM(
                    props.startingDetails.startingDetails.squatKg,
                    props.startingDetails.startingDetails.squatReps),
                weightRounding: props.startingDetails.startingDetails.weightRounding.toString(),
                pressIncrement: props.startingDetails.startingDetails.pressIncrement,
                deadLiftIncrement: props.startingDetails.startingDetails.deadLiftIncrement,
                benchIncrement: props.startingDetails.startingDetails.benchIncrement,
                squatIncrement: props.startingDetails.startingDetails.squatIncrement,
                trainingMax: props.startingDetails.startingDetails.trainingMax,
                numberOfCycles: props.startingDetails.startingDetails.numberOfCycles,
                w1percentages: props.startingDetails.startingDetails.w1percentages,
                w2percentages: props.startingDetails.startingDetails.w2percentages,
                w3percentages: props.startingDetails.startingDetails.w3percentages,
                w4percentages: props.startingDetails.startingDetails.w4percentages,
            });
        } else {
            setOutputOnly(false);

            setStartData({
                pressKg: '',
                pressReps: '',
                press1RM: '',
                deadLiftKg: '',
                deadLiftReps: '',
                deadLift1RM: '',
                benchPressKg: '',
                benchPressReps: '',
                benchPress1RM: '',
                squatKg: '',
                squatReps: '',
                squat1RM: '',
                weightRounding: "2.5",
                pressIncrement: 2.5,
                deadLiftIncrement: 5.0,
                benchIncrement: 2.5,
                squatIncrement: 5.0,
                trainingMax: 90,
                numberOfCycles: 12,
                w1percentages: [65, 75, 85],
                w2percentages: [70, 80, 90],
                w3percentages: [75, 85, 95],
                w4percentages: [40, 50, 60],
            });
        }

    }, [props.startingDetails.startingDetails && !props.startingDetails.loading]);

    // Styling
    const classes = styles();

    const onGeneratePlan = () => {
        const now = new Date();
        const dateString = moment(now).format('YYYY-MM-DD');

        const startingDetailsData = {
            startingDate: dateString,
            pressKg: startData.pressKg,
            pressReps: startData.pressReps,
            press1rm: startData.press1RM,
            deadLiftKg: startData.deadLiftKg,
            deadLiftReps: startData.deadLiftReps,
            deadLift1rm: startData.deadLift1RM,
            benchPressKg: startData.benchPressKg,
            benchPressReps: startData.benchPressReps,
            benchPress1rm: startData.benchPress1RM,
            squatKg: startData.squatKg,
            squatReps: startData.squatReps,
            squat1rm: startData.squat1RM,
            weightRounding: startData.weightRounding,
            pressIncrement: startData.pressIncrement,
            deadLiftIncrement: startData.deadLiftIncrement,
            benchIncrement: startData.benchIncrement,
            squatIncrement: startData.squatIncrement,
            trainingMax: startData.trainingMax,
            numberOfCycles: startData.numberOfCycles,
            w1percentages: startData.w1percentages,
            w2percentages: startData.w2percentages,
            w3percentages: startData.w3percentages,
            w4percentages: startData.w4percentages,
            loginId: props.login.id
        };
        props.onAddStart(startingDetailsData);
    };

    const onStartOver = () => {
        props.onRemoveStart(props.startingDetails.startingDetails.id);
    };

    const onChangeStart = (name, value) => {
        setStartData((state) =>
            ({
                ...state,
                [name]: value
            })
        );
    };

    const calculate1RM = (name, value) => {
        onChangeStart(name, value);

        switch (name) {
            case 'pressKg' :
                update1RM('press1RM', value, startData.pressReps);
                break;
            case'pressReps':
                update1RM('press1RM', startData.pressKg, value);
                break;
            case 'deadLiftKg' :
                update1RM('deadLift1RM', value, startData.deadLiftReps);
                break;
            case'deadLiftReps':
                update1RM('deadLift1RM', startData.deadLiftKg, value);
                break;
            case 'benchPressKg' :
                update1RM('benchPress1RM', value, startData.benchPressReps);
                break;
            case'benchPressReps':
                update1RM('benchPress1RM', startData.benchPressKg, value);
                break;
            case 'squatKg' :
                update1RM('squat1RM', value, startData.squatReps);
                break;
            case'squatReps':
                update1RM('squat1RM', startData.squatKg, value);
                break;
            default:
                break;
        }
    };

    const update1RM = (oneRM, kg, reps) => {
        setStartData((state) =>
            ({
                ...state,
                [oneRM]: calculateOneRM(kg, reps)
            })
        );
    };

    //Epley formula 1rm = w(1 +r/30), assuming that r > 1
    //  (Brzycki formula 1rm = w / (1.0278 - 0.0278 *r))
    const calculateOneRM = (kg, reps) => {
        let oR = '';
        if (reps === 1 || reps === '1') {
            oR = kg;
        } else if (reps > 1) {
            oR = Math.round(kg * (1 + reps / 30));
        }
        return oR;
    };

    const changePercentages = (set, value, index) => {
        switch (index) {
            case 0 :
                setStartData((state) =>
                    ({
                        ...state,
                        w1percentages: startData.w1percentages.map(
                            (s, i) => i === parseInt(set) ? value : s)
                    })
                );
                break;
            case 1 :
                setStartData((state) =>
                    ({
                        ...state,
                        w2percentages: startData.w2percentages.map(
                            (s, i) => i === parseInt(set) ? value : s)
                    })
                );
                break;
            case 2 :
                setStartData((state) =>
                    ({
                        ...state,
                        w3percentages: startData.w3percentages.map(
                            (s, i) => i === parseInt(set) ? value : s)
                    })
                );
                break;
            case 3 :
                setStartData((state) =>
                    ({
                        ...state,
                        w4percentages: startData.w4percentages.map(
                            (s, i) => i === parseInt(set) ? value : s)
                    })
                );
                break;
            default:
                break;
        }
    };

    let screenRows = (
        <StartDetails
            startData={ startData }
            outputOnly={ outputOnly }
            error={ props.error }
            onChangeStart={ onChangeStart }
            calculate1RM={ calculate1RM }
            changePercentages={ changePercentages }
            onGeneratePlan={ onGeneratePlan }
            onStartOver={ onStartOver }
        />
    );

    const generalError = (
        <GeneralError
            error={ props.error }
        />
    );

    // TODO : is this screen needed?
    // if (!isEmpty(props.startingDetails.startingDetails) && !props.startingDetails.loading && showPlanFound) {
    //     screenRows = (
    //         <PlanFound
    //             onStartOver={ onStartOver }
    //             onView={ onView }
    //         />
    //     );
    // }

    if (!isEmpty(props.error.message) && isEmpty(props.error.field)) {
        screenRows = generalError;
    }

    return (
        <>
            <Header header={ "Starting Details" }/>

            <div className={ classes.layout }>
                { props.startingDetails.loading ?
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
        startingDetails: state.startingDetails,
        login: state.login,
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetStart: (id) => dispatch(actions.getStart(id)),
        onAddStart: (startData) => dispatch(actions.addStart(startData)),
        onRemoveStart: (id) => dispatch(actions.removeStart(id)),
        onClearError: () => dispatch(actions.clearError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);
