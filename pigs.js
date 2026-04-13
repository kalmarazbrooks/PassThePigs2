// ----------------
//    Constants
// ----------------

const debugMode = true // check console for print statements
const players = 3 // 0, 1, 2, 3
const goal = 5

// Audios from Pixabay, https://stackoverflow.com/questions/9419263/how-to-play-audio
const click = new Audio('audio/click.mp3');
const chaching = new Audio('audio/chaching.mp3')
const pigout = new Audio('audio/pigout.mp3')
const jackpot = new Audio('audio/jackpot.mp3')
const win = new Audio('audio/win.mp3')

pigout.volume = 0.5

// ----------------
//     Frontend
// ----------------

// Variables //

const buttons = [['player0RollButton', 'player0PassButton'],
                ['player1RollButton', 'player1PassButton'],
                ['player2RollButton', 'player2PassButton'],
                ['player3RollButton', 'player3PassButton']]
const texts = [['player0HandScore', 'player0TotalScore', 'player0Heading'],
                ['player1HandScore', 'player1TotalScore', 'player1Heading'],
                ['player2HandScore', 'player2TotalScore', 'player2Heading'],
                ['player3HandScore', 'player3TotalScore', 'player3Heading']]
const pigTexts = [['player0Pig1', 'player0Pig2'],
                ['player1Pig1', 'player1Pig2'],
                ['player2Pig1', 'player2Pig2'],
                ['player3Pig1', 'player3Pig2']]
const cards = ['player0', 'player1', 'player2', 'player3']
const colorPalette = ['w3-light-gray', 'w3-dark-gray', 'w3-yellow']

// Functions //

function handleClick(element) {
    playSound(click)

    if (element == 'replayButton') {
        handleReplay()
    } else if (element.slice(7) == 'RollButton') {
        rollAction()
    } else {
        passAction(false)
    }
}

function handleWin(player) {
    print('win!')

    disableAllButtons()
    changeCardColor(cards[player], colorPalette[2])

    if (prevPlayer != null) updateHeading(texts[prevPlayer][2], prevPlayer) // safety check
    updateHeading(texts[player][2], player, `Player ${player} 👑`)

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
        element(textID).innerHTML = 'Score: 0'
    } else {
        element(textID).innerHTML = 'Score: ' + tempScore
    }
}
function updateTotal(reset, textID, player) {
    if (reset) {
        element(textID).innerHTML = 'Total score: 0'
    } else {
        element(textID).innerHTML = 'Total score: ' + scores[player]
    }
}
function updateHeading(textID, player, text) {
    if (text) {
        element(textID).innerHTML = text
        print(`updating player ${0} header to ${text}`)
    } else {
        element(textID).innerHTML = 'Player ' + player
        print(`resetting player ${0} header`)
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
function resetTexts() {
    for (const text of texts) {
        updateTemp(false, true, text[0])
        updateTotal(true, text[1], player)
    }
}

function changeCardColor(cardID, color) {
    print(color)

    removeColor(cardID)
    element(cardID).classList.add(color)
}
function removeColor(cardID) {
    print('removing color from ' + cardID)
    for (const color of colorPalette) {
        element(cardID).classList.remove(color)
    }
}
function resetAllColors() {
    for (let cardID of cards) {
        print(cardID)
        changeCardColor(cardID, colorPalette[0])
    }
}

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

function playSound(audio) {
    audio.currentTime = 0
    audio.play()
}

init()