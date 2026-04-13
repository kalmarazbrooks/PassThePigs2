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
        print(`updating player ${player} header to ${text}`)
    } else {
        element(textID).innerHTML = 'Player ' + player
        print(`resetting player ${player} header`)
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