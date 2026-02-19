let startTime = 0;
let elapsed = 0;
let timer = null;
let running = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

/* Format time */
function format(ms) {
  const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  const milli = String(ms % 1000).padStart(3, "0");
  return `${minutes}:${seconds}:${milli}`;
}

/* Update display */
function update() {
  const now = Date.now();
  elapsed = now - startTime;
  display.textContent = format(elapsed);
}

/* Start / Pause */
function startPause() {
  if (!running) {
    startTime = Date.now() - elapsed;
    timer = setInterval(update, 10);
    running = true;
  } else {
    clearInterval(timer);
    running = false;
  }
}

/* Reset */
function reset() {
  clearInterval(timer);
  running = false;
  elapsed = 0;
  display.textContent = "00:00:000";
  laps.innerHTML = "";
}

/* Lap */
function lap() {
  if (!running) return;

  const li = document.createElement("li");
  li.textContent = format(elapsed);
  laps.prepend(li);
}

/* Keyboard controls */
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    startPause();
  }
  if (e.key.toLowerCase() === "l") lap();
  if (e.key.toLowerCase() === "r") reset();
});