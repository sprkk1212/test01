const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const boxSize = 20; // Size of each grid box
let snake = [{ x: 200, y: 200 }];
let food = generateFood();
let direction = { x: 0, y: 0 };
let score = 0;

function gameLoop() {
  if (isGameOver()) {
    alert("Game Over! Your Score: " + score);
    resetGame();
    return;
  }

  updateSnake();
  drawGame();
}

function updateSnake() {
  const head = { x: snake[0].x + direction.x * boxSize, y: snake[0].y + direction.y * boxSize };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood();
  } else {
    snake.pop();
  }
}

function drawGame() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "lime";
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, boxSize, boxSize));

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  // Draw score
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

function generateFood() {
  const x = Math.floor((Math.random() * canvas.width) / boxSize) * boxSize;
  const y = Math.floor((Math.random() * canvas.height) / boxSize) * boxSize;
  return { x, y };
}

function isGameOver() {
  const head = snake[0];
  return (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  );
}

function resetGame() {
  snake = [{ x: 200, y: 200 }];
  direction = { x: 0, y: 0 };
  score = 0;
  food = generateFood();
}

document.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

setInterval(gameLoop, 100);
