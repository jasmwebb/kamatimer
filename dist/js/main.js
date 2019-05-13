// Select start buttons and set timer durations in milliseconds
const test = document.getElementById("test");
test.duration = 1;
test.longBreak = 3;
test.wasBreak = false;
const start25 = document.getElementById("start-25");
start25.duration = 25 * 60;
start25.longBreak = 15 * 60;
start25.wasBreak = false;
const start30 = document.getElementById("start-30");
start30.duration = 30 * 60;
start30.longBreak = 20 * 60;
start30.wasBreak = false;
const start45 = document.getElementById("start-45");
start45.duration = 45 * 60;
start45.longBreak = 30 * 60;
start45.wasBreak = false;
let startBreak = setBreak(1);

// Initialize countdown display, session type, and tallies
let display;
let wasBreak;
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
startBreak.addEventListener("click", timer);

function timer(e) {
  let duration = e.target.duration;
  const startTime = Date.now();
  const endTime = startTime + (duration * 1000);
  wasBreak = e.target.wasBreak;

  workBtns.style.display = "none"; // Hide work session start buttons
  breakBtn.style.display = "none"; // Hide break start button
  runBtns.style.display = "inherit"; // How stop button

  display = setInterval(() => {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    let timeRemaining = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    countdown.innerHTML = timeRemaining;
    document.title = timeRemaining;
    duration--;

    if (Date.now() > endTime || duration < 0) {
      if (!wasBreak) { // If timer expires and last session wasn't a break
        toggleTally(); // Advance tallies
      }

      stopTimer(false, e.target.longBreak);
    }
  }, 1000);
}

function stopTimer(manual = true, longBreak) {
  // Reset timer display
  clearInterval(display);
  countdown.innerHTML = "00:00";
  document.title = "Kamatimer";
  runBtns.style.display = "none";

  if (wasBreak) { // Last session was a break
    if (manual) { // User ended timer manually
      breakBtn.style.display = "inherit";
    } else { // Timer expired
      workBtns.style.display = "inherit";

      if (completedSessions === 4) {
        toggleTally();
        setBreak(1);
        breakMins.innerHTML = startBreak.duration;
      }
    }
  } else { // Last session was work
    if (manual) { // User ended timer manually
      workBtns.style.display = "inherit";
    } else { // Timer expired
      breakBtn.style.display = "inherit";

      if (completedSessions === 4) {
        breakMins.innerHTML = longBreak;
        setBreak(longBreak);
      }
    }
  }
}

function toggleTally() {
  if (completedSessions < 4) { // If 4 works sessions have yet to be completed
    completedSessions++;
    document.getElementById(`session-${completedSessions}`).classList.add("done");
  } else { // 4 sessions have been completed, reset
    for (let i = 1; i <= 4; i++) {
      document.getElementById(`session-${i}`).classList.remove("done");
    }
    completedSessions = 0;
  }
}

function setBreak(seconds = 5 * 60) {
  const startBreak = document.querySelector("#break-btn > button");
  startBreak.duration = seconds;
  startBreak.wasBreak = true;
  return startBreak;
}
