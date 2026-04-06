// name, probability (sum of previous terms), points (greater than 1)
const states = [['Dot', 34.90], ['No Dot', 65.1], ['Razorback', 87.5, 5], ['Trotter', 96.3, 5], ['Snouter', 99.3, 10], ['Leaning Jowler', 100, 15]]

print(score(roll(), roll()))

// ----------------
//     Backend
// ----------------


function score(pig1, pig2) {
    print(states[pig1])
    print(states[pig2])

    if (pig1 == pig2) { // Matching index
        if (pig1 == 0 || pig1 == 1) {
            return 1
        }
        return states[pig1][2] * 2 // Scoring 2D Array Index
    } else if (pig1 + pig2 == 1) {
        return 0
    } else {
        return states[Math.max(pig1, pig2)][2] // The greater index will always have a higher value
    }
}

function roll() {
    let roll = Math.random() * 100

    for (const state of states) {
        if (roll < state[1]) {
            return states.indexOf(state)
        }
    }
}

// ----------------
//     Util
// ----------------

function print(thing) {
    console.log(thing)
}