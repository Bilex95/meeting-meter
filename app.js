// meeting-meter — drift-free live cost counter.
// We never "count up"; we always derive cost from (now - startedAt),
// so background-tab throttling can't make the number lie.

const peopleEl = document.getElementById("people");
const rateEl = document.getElementById("rate");
const costEl = document.getElementById("cost");
const elapsedEl = document.getElementById("elapsed");
const toggleBtn = document.getElementById("toggle");
const resetBtn = document.getElementById("reset");

let startedAt = null;   // timestamp of current run
let banked = 0;         // ms accumulated across previous runs (pause support)
let rafId = null;

function elapsedMs() {
  return banked + (startedAt ? Date.now() - startedAt : 0);
}

function currentCost() {
  const people = Math.max(1, Number(peopleEl.value) || 1);
  const rate = Math.max(0, Number(rateEl.value) || 0);
  const hours = elapsedMs() / 3_600_000;
  return people * rate * hours;
}

function fmtClock(ms) {
  const s = Math.floor(ms / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

function tick() {
  const cost = currentCost();
  costEl.textContent = cost.toFixed(2);
  costEl.classList.toggle("hot", cost >= 100); // psychology: it turns red
  elapsedEl.textContent = fmtClock(elapsedMs());
  rafId = requestAnimationFrame(tick);
}

toggleBtn.addEventListener("click", () => {
  if (startedAt) {
    banked += Date.now() - startedAt;   // pause
    startedAt = null;
    cancelAnimationFrame(rafId);
    toggleBtn.textContent = "Resume";
  } else {
    startedAt = Date.now();             // start / resume
    toggleBtn.textContent = "Pause";
    tick();
  }
});

resetBtn.addEventListener("click", () => {
  startedAt = null;
  banked = 0;
  cancelAnimationFrame(rafId);
  toggleBtn.textContent = "Start";
  costEl.textContent = "0.00";
  costEl.classList.remove("hot");
  elapsedEl.textContent = "00:00:00";
});
