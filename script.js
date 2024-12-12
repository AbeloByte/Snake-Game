const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game settings
const boxSize = 20; // Size of each square in the grid
const canvasSize = canvas.width / boxSize; // Number of squares per row/column
let snake = [{ x: 5, y: 5 }]; // Initial snake position
let food = randomFoodPosition();
let direction = { x: 0, y: 0 };
let score = 0;

// Listen for arrow key inputs
document.addEventListener("keydown", changeDirection);

// Start the game loop
const gameInterval = setInterval(gameLoop, 200);

function gameLoop() {
    moveSnake();

    if (isGameOver()) {
        clearInterval(gameInterval);
        alert(`Game Over! Your score is ${score}`);
        return;
    }

    if (hasEatenFood()) {
        growSnake();
        food = randomFoodPosition();
        score++;
    }

    drawGame();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);

    // Draw the snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "lime" : "green";
        ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
    });

    // Draw the score
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText(`Score: ${score}`, 10, canvas.height - 10);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head); // Add new head
    snake.pop(); // Remove tail
}

function changeDirection(event) {
    const key = event.key;

    if (key === "ArrowUp" && direction.y !== 1) {
        direction = { x: 0, y: -1 };
    } else if (key === "ArrowDown" && direction.y !== -1) {
        direction = { x: 0, y: 1 };
    } else if (key === "ArrowLeft" && direction.x !== 1) {
        direction = { x: -1, y: 0 };
    } else if (key === "ArrowRight" && direction.x !== -1) {
        direction = { x: 1, y: 0 };
    }
}

function randomFoodPosition() {
    return {
        x: Math.floor(Math.random() * canvasSize),
        y: Math.floor(Math.random() * canvasSize)
    };
}

function hasEatenFood() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

function growSnake() {
    const tail = { ...snake[snake.length - 1] };
    snake.push(tail);
}

function isGameOver() {
    // Check wall collision
    const head = snake[0];
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }

    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}
