import React, {useState} from 'react';
import WorkoutExerciseSets from './WorkoutExerciseSets';
import WorkoutExerciseWeightRep from './WorkoutExerciseWeightRep';

const WorkoutExerciseDo = props => {
    const [kgs, setKgs] = useState('');
    const [reps, setReps] = useState('');
    const [index, setIndex] = useState('');

    //Properties
    const {exercise} = props;

    const onClickRow = (kgs, reps) => {
        setKgs(kgs);
        setReps(reps);
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

    return (
        <div>
            <WorkoutExerciseWeightRep
                exercise={ exercise }
                kgs={ kgs }
                reps={ reps }
                onAddKgs={ onAddKgs }
                onReduceKgs={ onReduceKgs }
                onAddReps={ onAddReps }
                onReduceReps={ onReduceReps }
            />
            <WorkoutExerciseSets
                exercise={ exercise }
                onClickRow={ onClickRow }
                kgs={ kgs }
                reps={ reps }
            />
        </div>
    );
};

export default WorkoutExerciseDo;
