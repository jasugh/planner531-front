const calculateOneRM = (kg, reps) => {
// Epley formula:  1rm = w(1 +r/30), assuming that r > 1
// another formula:  Brzycki formula 1rm = w / (1.0278 - 0.0278 *r)

    let oR = '';
    if (reps === 1 || reps === '1') {
        oR = kg;
    } else if (reps > 1) {
        oR = Math.round(kg * (1 + reps / 30));
    }
    return oR;
};

export default calculateOneRM;
