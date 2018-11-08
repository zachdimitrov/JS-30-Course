let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds) {
    clearInterval(countDown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTIme(then);
    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countDown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutesLeft = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    const displayTime = `${minutesLeft}:${secondsLeft<10?'0':''}${secondsLeft}`;
    timerDisplay.textContent = displayTime;
    document.title = 'Time left: ' + displayTime;
}

function displayEndTIme(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = `${hour > 12?hour - 12:hour}`;
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at: ${adjustedHour}:${minutes < 10?'0':''}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(b => {
    b.addEventListener('click', startTimer);
});

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});