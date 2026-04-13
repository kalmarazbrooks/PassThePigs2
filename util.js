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