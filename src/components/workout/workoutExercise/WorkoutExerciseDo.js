import React, {useState} from 'react';
import WorkoutExerciseSets from './WorkoutExerciseSets';
import WorkoutExerciseWeightRep from './WorkoutExerciseWeightRep';

const WorkoutExerciseDo = props => {
    const [kgs, setKgs] = useState('');
    const [reps, setReps] = useState('');
    const [index, setIndex] = useState('');
    const [error, setError] = useState({});

    //Properties
    const {exercise} = props;

    const onClickRow = (kgs, reps, i) => {
        setKgs(kgs);
        setReps(reps);

        if (i === index) {
            setIndex('');
        } else {
            setIndex(i);
        }
    };

    const onAddKgs = () => {
        let w = kgs;
        w = w + 2.5;
        if (w < 501) {
            setKgs(w);
        }
    };

    const onReduceKgs = () => {
        let w = kgs;
        w = w - 2.5;
        if (w >= 2.5 || w === 0) {
            setKgs(w);
        }
    };

    const onAddReps = () => {
        let r = reps;
        r++;
        if (r < 21) {
            setReps(r);
        }
    };

    const onReduceReps = () => {
        let r = reps;
        r--;
        if (r > 0) {
            setReps(r);
        }
    };

    const onSave = () => {
        if (reps < 1 || undefined) {
            setError({reps: 'Please enter Reps'});
            return;
        }

        // let w = this.state.workout;
        // let s = this.props.workout.selected_workout.workout.exercises[0].sets;

        let w = {};
        let s = {};

        const set = {
            kgs: kgs,
            reps: reps,
            comment: '',
            finished: false
        };

        s.push(set);
        w.exercises[0].sets = s;

        // this.setState({workout: w});
    };

    const onUpdate = (event) => {
        console.log('eventti', event.target.name);

        // let w = this.state.workout;
        // let s = this.props.workout.selected_workout.workout.exercises[0].sets;
        //
        // s[this.state.index].kgs = this.state.kgs;
        // s[this.state.index].reps = this.state.reps;
        // w.exercises[0].sets = s;
        //
        // this.setState({workout: w, index: ''});
    };

    return (
        <div>
            <WorkoutExerciseWeightRep
                kgs={ kgs }
                reps={ reps }
                index={ index }
                error={ error }
                onAddKgs={ onAddKgs }
                onReduceKgs={ onReduceKgs }
                onAddReps={ onAddReps }
                onReduceReps={ onReduceReps }
                onSave={ onSave }
                onUpdate={ onUpdate }
            />
            <WorkoutExerciseSets
                exercise={ exercise }
                onClickRow={ onClickRow }
                index={ index }
            />
        </div>
    );
};

export default WorkoutExerciseDo;
