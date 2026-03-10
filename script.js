 const STORAGE_KEY = "pcod_tracker_final_v1";
const PERIOD_LENGTH = 4;

/* ---------- DOM ---------- */
const lastPeriodInput = document.getElementById("lastPeriod");
const cycleLengthInput = document.getElementById("cycleLength");
const stressInput = document.getElementById("stress");
const stressLabel = document.getElementById("stressLabel");
const trackBtn = document.getElementById("trackBtn");
const historyList = document.getElementById("history");
const calendarGrid = document.getElementById("calendarGrid");
const calendarHeader = document.getElementById("calendarHeader");
const resultBox = document.getElementById("result");
const moodButtons = document.querySelectorAll("#moodButtons button");

/* ---------- STATE ---------- */
let state = {
  selectedMood: null,
  entries: []
};

/* ---------- INIT ---------- */
loadState();
bindEvents();
renderAll();

/* ---------- EVENTS ---------- */
function bindEvents() {
  trackBtn.onclick = trackCycle;
  stressInput.oninput = updateStressLabel;
  moodButtons.forEach(b => b.onclick = () => selectMood(b));
}

/* ---------- MOOD ---------- */
function selectMood(btn) {
  moodButtons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  state.selectedMood = btn.dataset.mood;
}

/* ---------- STRESS ---------- */
function updateStressLabel() {
  const v = +stressInput.value;
  const level = v <= 3 ? "Low" : v >= 7 ? "High" : "Medium";
  stressLabel.innerText = `Stress: ${level} (${v})`;
}

/* ---------- TRACK ---------- */
function trackCycle() {
  const lastStart = lastPeriodInput.value;
  const cycle = +cycleLengthInput.value;
  const stress = +stressInput.value;

  if (!lastStart || !cycle) {
    alert("Please fill date and cycle length");
    return;
  }
  if (!state.selectedMood) {
    alert("Please select mood");
    return;
  }

  let nextStart = addDays(lastStart, cycle);

  if (stress >= 7) {
    nextStart = addDays(nextStart, 1);
  }

  state.entries.push({
    id: crypto.randomUUID(),
    lastStart,
    nextStart,
    cycle,
    mood: state.selectedMood,
    stress
  });

  saveState();

  let msg = `Next period expected around ${nextStart}`;
  if (stress >= 7) msg += " (High stress detected)";

  resultBox.innerText = msg;
  renderAll();
}

/* ---------- DATE HELPERS ---------- */
function addDays(dateStr, days) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function dateRange(start) {
  const arr = [];
  for (let i = 0; i < PERIOD_LENGTH; i++) {
    arr.push(addDays(start, i));
  }
  return arr;
}

/* ---------- RENDER ---------- */
function renderAll() {
  renderHistory();
  renderCalendar();
  showMoodAlert();
}

function renderHistory() {
  historyList.innerHTML = "";
  state.entries.forEach(e => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${e.lastStart} → ${e.nextStart}
      <button onclick="deleteEntry('${e.id}')">X</button>
    `;
    historyList.appendChild(li);
  });
}

/* ---------- CALENDAR ---------- */
function renderCalendar() {
  calendarGrid.innerHTML = "";

  if (!state.entries.length) return;

  // latest prediction
  const latest = state.entries[state.entries.length - 1];

  // calendar month = next predicted period month
  const refDate = new Date(latest.nextStart + "T00:00:00");
  const year = refDate.getFullYear();
  const month = refDate.getMonth();

  calendarHeader.innerText =
    refDate.toLocaleString("default", { month: "long", year: "numeric" });

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const nextSet = new Set(
    dateRange(latest.nextStart)
  );

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

    const cell = document.createElement("div");
    cell.innerText = d;

    if (nextSet.has(dateStr)) {
      cell.classList.add("next-period");
    }

    calendarGrid.appendChild(cell);
  }
}

/* ---------- MOOD ALERT ---------- */
function showMoodAlert() {
  if (!state.entries.length) return;

  const last = state.entries[state.entries.length - 1];
  const today = new Date().toISOString().slice(0, 10);

  const daysLeft =
    (new Date(last.nextStart) - new Date(today)) / (1000 * 60 * 60 * 24);

  if (
    daysLeft <= 3 &&
    ["Low", "Irritated", "Tired"].includes(last.mood)
  ) {
    resultBox.innerText +=
      "\n⚠️ Mood pattern suggests your period may be approaching.";
  }
}

/* ---------- DELETE ---------- */
function deleteEntry(id) {
  state.entries = state.entries.filter(e => e.id !== id);
  saveState();
  renderAll();
}

/* ---------- STORAGE ---------- */
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) state = JSON.parse(saved);
}