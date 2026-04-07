// ----------------
//    Constants
// ----------------

const debugMode = true

const players = [new Player(element('player0RollButton'), element('player0PassButton'), element('player0HandScore'), element('player0TotalScore')),
                new Player(element('player1RollButton'), element('player1PassButton'), element('player1HandScore'), element('player1TotalScore')),
                new Player(element('player2RollButton'), element('player2PassButton'), element('player2HandScore'), element('player2TotalScore')), 
                new Player(element('player3RollButton'), element('player3PassButton'), element('player3HandScore'), element('player3TotalScore')), ]

const states = [['Dot', 34.90, 0], ['No Dot', 65.1, 0], ['Razorback', 87.5, 5],
                ['Trotter', 96.3, 5], ['Snouter', 99.3, 10], 
                ['Leaning Jowler', 100, 15]] // name, probability (sum of previous terms), points (greater than 1)

const goal = 20

// ----------------
//     Frontend
// ----------------

// Variables //

// Functions //

// ----------------
//     Backend
// ----------------

// Variables //

let rolls = null

let totalScore = 0
let tempScore = 0

// Functions //

function gameLoop() {
    rolls = inputRoll()
    print(handlePlayerScore(score(rolls[0], rolls[1])))
}

function inputRoll() {
    let pig1 = roll()
    let pig2 = roll()

    return [pig1, pig2]
}

function score(pig1, pig2) {
    print(states[pig1])
    print(states[pig2])

    if (pig1 == pig2) { // Matching index
        if (pig1 == 0 || pig1 == 1) { // Dot/No Dot
            return 1
        }
        return states[pig1][2] * 4 // Scoring 2D Array Index
    } else if (pig1 + pig2 == 1) { // Dot & No Dot
        return 0 // Pig Out!
    } else {
        return states[pig1][2] + states[pig2][2] // The greater index will always have a higher value
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

function pass() {
    print('pass!')

    totalScore += tempScore

    // pass to next player
}

function handlePlayerScore(score) {
    if (score == 0) return pigOut()
    
    tempScore += score

    if (totalScore + tempScore >= goal) {
        print('WIN!')
        // implement win
        return totalScore + tempScore
    }

    return tempScore
}

function pigOut() {
    print('pig out!')
    pass(0)
    return 0
}

// ----------------
//     Classes
// ----------------

class Player {

    #totalScore = 0

    constructor(rollButton, passButton, scoreText, totalText) {
        // Frontend
        this.rollButton = rollButton
        this.passButton = passButton
        this.scoreText = scoreText
        this.totalText = totalText
    }

    
}

// ----------------
//  Util (Wrappers)
// ----------------

function print(thing) {
    if (debugMode) {
        console.log(thing)
    }
}

function element(id) {
    return document.getElementById(id)
}

gameLoop()