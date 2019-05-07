// Select start buttons and set timer durations in seconds
const start25 = document.getElementById("start-25");
start25.duration = 25 * 60;

const start30 = document.getElementById("start-30");
start30.duration = 30 * 60;

const start45 = document.getElementById("start-45");
start45.duration = 45 * 60;

// Create event listeners for each button
start25.addEventListener("click", timer);
start30.addEventListener("click", timer);
start45.addEventListener("click", timer);

function timer(e) {
  let duration = e.target.duration;
  console.log(`User has selected ${duration} seconds`);

  const startTime = Date.now();
  console.log(`Start time is ${startTime}`);
}
