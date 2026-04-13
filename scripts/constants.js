// ----------------
//    Constants
// ----------------

const debugMode = false // check console for print statements
const players = 3 // 0, 1, 2, 3
const goal = 100

// Audios from Pixabay, https://stackoverflow.com/questions/9419263/how-to-play-audio
const click = new Audio('audio/click.mp3');
const chaching = new Audio('audio/chaching.mp3')
const pigout = new Audio('audio/pigout.mp3')
const jackpot = new Audio('audio/jackpot.mp3')
const win = new Audio('audio/win.mp3')

pigout.volume = 0.5

// AI
const aiInstance = new AI()
const aiLevel = 3 // 0 = off, 1-3 = level X AI