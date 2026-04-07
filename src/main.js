import {
  GRID_SIZE,
  TICK_MS,
  createInitialState,
  queueDirection,
  restartGame,
  stepGame,
  togglePause
} from "./game-logic.js";

const boardElement = document.querySelector("#board");
const scoreElement = document.querySelector("#score");
const statusElement = document.querySelector("#status");
const restartButton = document.querySelector("#restart-button");
const pauseButton = document.querySelector("#pause-button");
const controlButtons = document.querySelectorAll("[data-direction]");

const keyToDirection = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  a: "left",
  s: "down",
  d: "right",
  W: "up",
  A: "left",
  S: "down",
  D: "right"
};

let state = createInitialState();
let tickHandle = null;

buildBoard();
render();
syncLoop();

document.addEventListener("keydown", (event) => {
  const direction = keyToDirection[event.key];
  if (!direction) {
    if (event.key === " ") {
      event.preventDefault();
      state = togglePause(state);
      render();
      syncLoop();
    }
    return;
  }

  event.preventDefault();
  handleDirection(direction);
});

restartButton.addEventListener("click", () => {
  state = restartGame();
  render();
  syncLoop();
});

pauseButton.addEventListener("click", () => {
  state = togglePause(state);
  render();
  syncLoop();
});

controlButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleDirection(button.dataset.direction);
  });
});

function handleDirection(direction) {
  state = queueDirection(state, direction);

  if (!state.isGameOver) {
    state = {
      ...state,
      isRunning: true,
      isPaused: false
    };
  }

  render();
  syncLoop();
}

function syncLoop() {
  if (tickHandle) {
    window.clearInterval(tickHandle);
    tickHandle = null;
  }

  if (!state.isRunning || state.isPaused || state.isGameOver) {
    return;
  }

  tickHandle = window.setInterval(() => {
    state = stepGame(state);
    render();

    if (state.isGameOver) {
      syncLoop();
    }
  }, TICK_MS);
}

function buildBoard() {
  const cells = [];

  for (let index = 0; index < GRID_SIZE * GRID_SIZE; index += 1) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.setAttribute("role", "gridcell");
    boardElement.appendChild(cell);
    cells.push(cell);
  }

  boardElement.cells = cells;
}

function render() {
  for (const cell of boardElement.cells) {
    cell.className = "cell";
  }

  for (let index = state.snake.length - 1; index >= 0; index -= 1) {
    const segment = state.snake[index];
    const cell = getCell(segment.x, segment.y);

    if (cell) {
      cell.classList.add("cell--snake");
      if (index === 0) {
        cell.classList.add("cell--head");
      }
    }
  }

  if (state.food) {
    const foodCell = getCell(state.food.x, state.food.y);
    if (foodCell) {
      foodCell.classList.add("cell--food");
    }
  }

  scoreElement.textContent = String(state.score);
  statusElement.textContent = getStatusText();
  pauseButton.textContent = state.isPaused ? "Resume" : "Pause";
}

function getCell(x, y) {
  return boardElement.cells[(y * GRID_SIZE) + x];
}

function getStatusText() {
  if (state.isGameOver) {
    return "Game over. Restart to play again.";
  }

  if (state.isPaused) {
    return "Paused.";
  }

  if (!state.isRunning) {
    return "Press any arrow key or WASD to start.";
  }

  return "Use arrow keys, WASD, or the on-screen controls.";
}
