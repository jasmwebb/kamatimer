// Select start buttons and set timer durations in milliseconds
const test = document.getElementById("test");
test.duration = 3;
const start25 = document.getElementById("start-25");
start25.duration = 25 * 60;
const start30 = document.getElementById("start-30");
start30.duration = 30 * 60;
const start45 = document.getElementById("start-45");
start45.duration = 45 * 60;

// Keep track of tallies
let completedSessions = 0;

// Select other timer elements
const countdown = document.getElementById("timer-countdown");
const workBtns = document.getElementById("work-btns");
const runBtns = document.getElementById("run-btns");
const stopBtn = document.getElementById("stop-btn");

// Create event listeners for timer controls
test.addEventListener("click", timer);
start25.addEventListener("click", timer);
start30.addEventListener("click", timer);
start45.addEventListener("click", timer);
stopBtn.addEventListener("click", Window.clearInterval);

function timer(e) {
  let duration = e.target.duration;
  const startTime = Date.now();
  const endTime = startTime + (duration * 1000);

  workBtns.style.display = "none";
  runBtns.style.display = "inherit";

  const display = setInterval(() => {
    if (Date.now() < endTime || duration >= 0) {
      let minutes = Math.floor(duration / 60);
      let seconds = duration % 60;
      let timeRemaining = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
      countdown.innerHTML = timeRemaining;
      document.title = timeRemaining;
      duration--;
    } else {
      clearInterval(display);
      runBtns.style.display = "none";
      workBtns.style.display = "inherit";
      document.title = "Kamatimer";
      toggleTally();
    }
  }, 1000);
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
