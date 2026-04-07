export const GRID_SIZE = 16;
export const INITIAL_DIRECTION = "right";
export const TICK_MS = 140;

const DIRECTION_VECTORS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

const OPPOSITES = {
  up: "down",
  down: "up",
  left: "right",
  right: "left"
};

export function createInitialState(random = Math.random) {
  const snake = [
    { x: 8, y: 8 },
    { x: 7, y: 8 },
    { x: 6, y: 8 }
  ];

  return {
    gridSize: GRID_SIZE,
    snake,
    direction: INITIAL_DIRECTION,
    queuedDirection: INITIAL_DIRECTION,
    food: placeFood(snake, GRID_SIZE, random),
    score: 0,
    isRunning: false,
    isPaused: false,
    isGameOver: false
  };
}

export function queueDirection(state, nextDirection) {
  if (!DIRECTION_VECTORS[nextDirection]) {
    return state;
  }

  const blockedDirection = OPPOSITES[state.direction];
  if (state.snake.length > 1 && nextDirection === blockedDirection) {
    return state;
  }

  return {
    ...state,
    queuedDirection: nextDirection
  };
}

export function togglePause(state) {
  if (state.isGameOver) {
    return state;
  }

  return {
    ...state,
    isPaused: !state.isPaused
  };
}

export function restartGame(random = Math.random) {
  return createInitialState(random);
}

export function stepGame(state, random = Math.random) {
  if (state.isPaused || state.isGameOver) {
    return state;
  }

  if (!state.food) {
    return {
      ...state,
      isRunning: false,
      isGameOver: true
    };
  }

  const direction = resolveDirection(state.direction, state.queuedDirection);
  const head = state.snake[0];
  const movement = DIRECTION_VECTORS[direction];
  const nextHead = { x: head.x + movement.x, y: head.y + movement.y };
  const ateFood = nextHead.x === state.food.x && nextHead.y === state.food.y;
  const collisionBody = ateFood ? state.snake : state.snake.slice(0, -1);

  if (hitsBoundary(nextHead, state.gridSize) || hitsSnake(nextHead, collisionBody)) {
    return {
      ...state,
      direction,
      queuedDirection: direction,
      isRunning: false,
      isGameOver: true
    };
  }

  const nextSnake = [nextHead, ...state.snake];

  if (!ateFood) {
    nextSnake.pop();
  }

  const nextFood = ateFood ? placeFood(nextSnake, state.gridSize, random) : state.food;

  return {
    ...state,
    snake: nextSnake,
    direction,
    queuedDirection: direction,
    food: nextFood,
    score: ateFood ? state.score + 1 : state.score,
    isRunning: nextFood !== null,
    isGameOver: nextFood === null
  };
}

export function placeFood(snake, gridSize, random = Math.random) {
  const openCells = [];

  for (let y = 0; y < gridSize; y += 1) {
    for (let x = 0; x < gridSize; x += 1) {
      if (!snake.some((segment) => segment.x === x && segment.y === y)) {
        openCells.push({ x, y });
      }
    }
  }

  if (openCells.length === 0) {
    return null;
  }

  const index = Math.floor(random() * openCells.length);
  return openCells[index];
}

function resolveDirection(currentDirection, queuedDirection) {
  if (queuedDirection === OPPOSITES[currentDirection]) {
    return currentDirection;
  }

  return queuedDirection;
}

function hitsBoundary(position, gridSize) {
  return (
    position.x < 0 ||
    position.y < 0 ||
    position.x >= gridSize ||
    position.y >= gridSize
  );
}

function hitsSnake(position, snake) {
  return snake.some((segment) => segment.x === position.x && segment.y === position.y);
}
