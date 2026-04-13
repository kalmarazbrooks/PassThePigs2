// ----------------
//     Backend
// ----------------

// Variables //

let player = 0
let prevPlayer = null

let tempScore = 0

let rolls = null
let scores = [0, 0, 0, 0]

const states = [['Dot', 34.90, 0], ['No Dot', 65.1, 0], ['Razorback', 87.5, 5],
                ['Trotter', 96.3, 5], ['Snouter', 99.3, 10], 
                ['Leaning Jowler', 100, 15]] // name, probability (sum of previous terms), points (greater than 1)

// Functions //

function init() {
    player = -1 // incrementPlayer will set this to 0 after initialization
    rolls = null

    disableAllButtons()
    resetScores()
    resetPigs()
    resetTexts()

    incrementPlayer()
}

function rollAction() {
    print('roll!')

    let pig1 = roll()
    let pig2 = roll()
    displayPigs(pigTexts[player], states[pig1], states[pig2])

    let score = scorePigs(pig1, pig2)
    updatePlayerScore(score)
}

function passAction(out) {
    print('pass!')

    if (!out) {
        scores[player] += tempScore
        updateTotal(false, texts[player][1], player)

        playSound(chaching)
    } else playSound(pigout)

    updateTemp(out, true, texts[player][0])
    disableButton(buttons[player][0])
    disableButton(buttons[player][1])

    incrementPlayer()

    print(player)
}

function scorePigs(pig1, pig2) {
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

function updatePlayerScore(score) {
    if (score == 0) return passAction(true) // pig out short circuit
    
    tempScore += score

    updateTemp(false, false, texts[player][0])

    if (scores[player] + tempScore >= goal) {
        handleWin(player)
        prevPlayer = player

        playSound(jackpot)
        playSound(win)

        return scores[player] + tempScore
    }

    enableButton(buttons[player][1])
}

function incrementPlayer() {
    tempScore = 0

    resetAllColors()

    if (player == players) {
        player = 0
    } else {
        player++
    }

    changeCardColor(cards[player], colorPalette[1])
    enableButton(buttons[player][0])
}

function roll() {
    let roll = Math.random() * 100

    for (const state of states) {
        if (roll < state[1]) {
            return states.indexOf(state)
        }
    }
}

function resetScores() {
    scores = [0, 0, 0, 0]
}

init()