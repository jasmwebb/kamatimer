// Select start buttons and set timer durations in milliseconds
const test = document.getElementById("test");
test.duration = 3;
test.longBreak = 3;
test.isBreak = false;
const start25 = document.getElementById("start-25");
start25.duration = 25 * 60;
start25.longBreak = 15 * 60;
start25.isBreak = false;
const start30 = document.getElementById("start-30");
start30.duration = 30 * 60;
start25.longBreak = 20 * 60;
start30.isBreak = false;
const start45 = document.getElementById("start-45");
start25.duration = 25 * 60;
start45.longBreak = 30 * 60;
start45.isBreak = false;
const break5 = document.getElementById("break-5");
break5.duration = 3; // 5 * 60
break5.isBreak = true;

// Initialize countdown display and tallies
let display;
let completedSessions = 0;

// Select other timer elements
const countdown = document.getElementById("timer-countdown");
const workBtns = document.getElementById("work-btns");
const runBtns = document.getElementById("run-btns");
const stopBtn = document.getElementById("stop-btn");
const breakBtn = document.getElementById("break-btn");
const breakMins = document.getElementById("break-mins");

// Create event listeners for timer controls
test.addEventListener("click", timer);
start25.addEventListener("click", timer);
start30.addEventListener("click", timer);
start45.addEventListener("click", timer);
stopBtn.addEventListener("click", stopTimer);
break5.addEventListener("click", timer);

function timer(e) {
  let duration = e.target.duration;
  const startTime = Date.now();
  const endTime = startTime + (duration * 1000);

  workBtns.style.display = "none";
  breakBtn.style.display = "none";
  runBtns.style.display = "inherit";

  display = setInterval(() => {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    let timeRemaining = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    countdown.innerHTML = timeRemaining;
    document.title = timeRemaining;
    duration--;

    if (Date.now() > endTime || duration < 0) {
      if (!e.target.isBreak) {
        toggleTally();
      }

      stopTimer(e.target.longBreak, e.target.isBreak);
    }
  }, 1000);
}

function stopTimer(longBreak, isBreak) {
  clearInterval(display);
  countdown.innerHTML = "00:00";
  document.title = "Kamatimer";
  runBtns.style.display = "none";

  if (isBreak) {
    workBtns.style.display = "inherit";
  } else {
    breakBtn.style.display = "inherit";
  }

  if (completedSessions === 4) {
    breakMins.innerHTML = longBreak;
  } else {
    console.log("idk");
  }
}

function toggleTally() {
  if (completedSessions < 4) {
    completedSessions++;
    document.getElementById(`session-${completedSessions}`).classList.add("done");
  } else {
    for (let i = 1; i <= 4; i++) {
      document.getElementById(`session-${i}`).classList.remove("done");
    }
    completedSessions = 0;
  }
}
