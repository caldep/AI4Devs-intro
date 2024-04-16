// Global variables
let stopwatchStartTime;
let stopwatchPauseTime;
let stopwatchInterval;
let countdownStartTime;
let countdownPauseTime;
let countdownInterval;
let countdownDuration;

// Stopwatch functions
// Stopwatch functions
function startStopwatch() {
    if (!stopwatchStartTime) {
        stopwatchStartTime = new Date().getTime();
    } else if (stopwatchPauseTime) {
        let elapsedTime = new Date().getTime() - stopwatchPauseTime;
        stopwatchStartTime += elapsedTime;
        stopwatchPauseTime = null;
    }
    stopwatchInterval = setInterval(() => {
        let elapsedTime = new Date().getTime() - stopwatchStartTime;
        updateStopwatchDisplay(elapsedTime);
    }, 10);
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchPauseTime = new Date().getTime();
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchStartTime = null;
    stopwatchPauseTime = null;
    updateStopwatchDisplay(0);
}


function updateStopwatchDisplay(elapsedTime) {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    let milliseconds = elapsedTime % 1000;
    document.getElementById("stopwatch-display").textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 3)}`;
}


// Countdown functions
function startCountdown() {
    if (!countdownStartTime) {
        let hours = parseInt(document.getElementById("countdown-hours").value);
        let minutes = parseInt(document.getElementById("countdown-minutes").value);
        let seconds = parseInt(document.getElementById("countdown-seconds").value);
        countdownDuration = (hours * 3600 + minutes * 60 + seconds) * 1000;
        countdownStartTime = new Date().getTime() + countdownDuration;
    } else if (countdownPauseTime) {
        countdownStartTime = new Date().getTime() + (countdownStartTime - countdownPauseTime);
        countdownPauseTime = null;
    }
    countdownInterval = setInterval(() => {
        updateCountdownDisplay();
    }, 10);
}

function stopCountdown() {
    clearInterval(countdownInterval);
    countdownPauseTime = new Date().getTime();
}

function resetCountdown() {
    stopCountdown();
    document.getElementById("countdown-hours").value = "0";
    document.getElementById("countdown-minutes").value = "0";
    document.getElementById("countdown-seconds").value = "0";
    countdownStartTime = null;
    countdownPauseTime = null;
    updateCountdownDisplay(0);
}

function updateCountdownDisplay() {
    let currentTime = new Date().getTime();
    let timeRemaining = countdownStartTime - currentTime;
    if (timeRemaining <= 0) {
        stopCountdown();
        timeRemaining = 0;
    }
    let hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    let milliseconds = timeRemaining % 1000;
    document.getElementById("countdown-display").textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 3)}`;
}

// Helper function
function padZero(number, length = 2) {
    return number.toString().padStart(length, "0");
}

// Event listeners
document.getElementById("stopwatch-btn").addEventListener("click", () => {
    document.getElementById("stopwatch-container").classList.remove("d-none");
    document.getElementById("countdown-container").classList.add("d-none");
});

document.getElementById("countdown-btn").addEventListener("click", () => {
    document.getElementById("countdown-container").classList.remove("d-none");
    document.getElementById("stopwatch-container").classList.add("d-none");
});

document.getElementById("start-stopwatch").addEventListener("click", startStopwatch);
document.getElementById("stop-stopwatch").addEventListener("click", stopStopwatch);
document.getElementById("reset-stopwatch").addEventListener("click", resetStopwatch);

document.getElementById("start-countdown").addEventListener("click", startCountdown);
document.getElementById("stop-countdown").addEventListener("click", stopCountdown);
document.getElementById("reset-countdown").addEventListener("click", resetCountdown);
