// ----------------
//    Constants
// ----------------

const debugMode = true
const players = 3 // 0, 1, 2, 3
const goal = 20

// ----------------
//     Frontend
// ----------------

// Variables //

const buttons = [['player0RollButton', 'player0PassButton'],
                ['player1RollButton', 'player1PassButton'],
                ['player2RollButton', 'player2PassButton'],
                ['player3RollButton', 'player3PassButton']]
const texts = [['player0HandScore', 'player0TotalScore'],
                ['player1HandScore', 'player1TotalScore'],
                ['player2HandScore', 'player2TotalScore'],
                ['player3HandScore', 'player3TotalScore']]
const pigTexts = [['player0Pig1', 'player0Pig2'],
                ['player1Pig1', 'player1Pig2'],
                ['player2Pig1', 'player2Pig2'],
                ['player3Pig1', 'player3Pig2']]
const cards = ['player0', 'player1', 'player2', 'player3']

// Functions //

function handleClick(element) {
    if (element == 'replayButton') {
        handleReplay()
    } else if (element.slice(7) == 'RollButton') {
        actionLoop()
    } else {
        pass(false)
    }
}

function handleWin(player) {
    print('win!')

    disableAllButtons()
    changeCardColor(cards[player], 'w3-yellow')
    // implement win

    element('replay').classList.remove('w3-hide')
}

function handleReplay() {
    element('replay').classList.add('w3-hide')

    init()
}

function updateTemp(out, reset, textID) {
    if (out) {
        element(textID).innerHTML = 'PIG OUT!'
    } else if (reset) {
        element(textID).innerHTML = 'Score: '
    } else {
        element(textID).innerHTML = 'Score: ' + tempScore
    }
}
function updateTotal(reset, totalID) {
    if (reset) {
        element(totalID).innerHTML = 'Total score: 0'
    } else {
        element(totalID).innerHTML = 'Total score: ' + scores[player]
    }
}

function displayPigs(textIDs, pig1, pig2) {
    element(textIDs[0]).innerHTML = pig1[0] 
    element(textIDs[1]).innerHTML = pig2[0]
}
function resetPigs() {
    for (let pig of pigTexts) {
        element(pig[0]).innerHTML = '/'
        element(pig[1]).innerHTML = '/'
    }
}

function enableButton(buttonID) {
    element(buttonID).disabled = false
}
function disableButton(buttonID) {
    element(buttonID).disabled = true
}

function disableAllButtons() {
    for (const button of buttons) {
        disableButton(button[0])
        disableButton(button[1])
    }
}

function changeCardColor(card, color) {
    element(card).classList.add(color)
}

// ----------------
//     Backend
// ----------------

// Variables //

let player = 0 // start at player 0
let tempScore = 0

let rolls = null
let scores = [0, 0, 0, 0]

const states = [['Dot', 34.90, 0], ['No Dot', 65.1, 0], ['Razorback', 87.5, 5],
                ['Trotter', 96.3, 5], ['Snouter', 99.3, 10], 
                ['Leaning Jowler', 100, 15]] // name, probability (sum of previous terms), points (greater than 1)

// Functions //

function init() {
    resetScores()
    resetPigs()

    player = -1
    rolls = null

    disableAllButtons()
    for (const text of texts) {
        updateTemp(false, true, text[0])
        updateTotal(true, text[1])
    }

    incrementPlayer()
}

function actionLoop() {
    rolls = inputRoll()
    handlePlayerScore(score(rolls[0], rolls[1]))
}

function inputRoll() {
    let pig1 = roll()
    let pig2 = roll()

    displayPigs(pigTexts[player], states[pig1], states[pig2])

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

function pass(out) {
    print('pass!')

    if (!out) {
        scores[player] += tempScore
        updateTotal(false, texts[player][1])
    } 

    updateTemp(out, true, texts[player][0])
    disableButton(buttons[player][0])
    disableButton(buttons[player][1])

    incrementPlayer()

    print(player)
}

function handlePlayerScore(score) {
    if (score == 0) return pass(true) // pig out short circuit
    
    tempScore += score

    updateTemp(false, false, texts[player][0])

    if (scores[player] + tempScore >= goal) {
        handleWin()
        return scores[player] + tempScore
    }

    enableButton(buttons[player][1])
}

function incrementPlayer() {
    tempScore = 0

    if (player == players) {
        player = 0
    } else {
        player++
    }

    enableButton(buttons[player][0])
}

function resetScores() {
    scores = [0, 0, 0, 0]
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

init()