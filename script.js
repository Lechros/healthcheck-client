const apiPathInput = document.getElementById("apiPath");
const intervalInput = document.getElementById("interval");
const runButton = document.getElementById("run");
const stopButton = document.getElementById("stop");
const clearButton = document.getElementById("clear");
const display = document.getElementById("display");

runButton.addEventListener("click", handleRunClick);
stopButton.addEventListener("click", handleStopClick);
clearButton.addEventListener("click", handleClearClick);

enableElements();

let intervalId = undefined;

async function handleRunClick() {
  disableElements();
  try {
    await validateApi();

    intervalId = setInterval(async () => {
      const start = Date.now();
      await api();
      const end = Date.now();
      display.appendChild(textDiv(`${new Date()} - ${end - start}ms`));
    }, getInterval());
  } catch (e) {
    enableElements();
  }
}

function handleStopClick() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  enableElements();
}

function handleClearClick() {
  display.textContent = undefined;
}

function disableElements() {
  apiPathInput.disabled = true;
  intervalInput.disabled = true;
  runButton.disabled = true;
  stopButton.disabled = false;
}

function enableElements() {
  apiPathInput.disabled = false;
  intervalInput.disabled = false;
  runButton.disabled = false;
  stopButton.disabled = true;
}

async function validateApi() {
  try {
    await api();
  } catch (e) {
    alert(e);
    throw e;
  }
}

function api() {
  return fetch(apiPathInput.value, { mode: "no-cors" });
}

function getInterval() {
  return Number.parseFloat(intervalInput.value);
}

function textDiv(text) {
  const div = document.createElement("div");
  const content = document.createTextNode(text);
  div.appendChild(content);
  return div;
}
