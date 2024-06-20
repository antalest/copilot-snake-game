// Get the canvas element and its context
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

// Define the size of each square in the grid
let box = 32;

// Initialize the snake at the center of the grid
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };

// Initialize an array of obstacles
let obstacles = [
    { x: 5 * box, y: 7 * box },
    { x: 5 * box, y: 8 * box },
    { x: 7 * box, y: 5 * box },
    { x: 8 * box, y: 5 * box }
    // Add more obstacles as needed
];

// Set the initial direction of the snake
let direction = "right";

//Initialize the score
let score = 0;

// Function to draw the background of the game
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to draw the snake
function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Function to draw the obstacles
function createObstacles() {
    context.fillStyle = "gray";
    for (let i = 0; i < obstacles.length; i++) {
        context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }
}

// Initialize the food variable
let food = {}

// Function to generate a new position for the food
function generateFood() {
    while (true) {
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        };

        let overlap = false;
        for (let i = 0; i < obstacles.length; i++) {
            if (food.x == obstacles[i].x && food.y == obstacles[i].y) {
                overlap = true;
                break;
            }
        }

        if (!overlap) {
            break;
        }
    }
}

// Generate the initial position of the food
generateFood();

// Function to draw the food
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Event listener to update the direction of the snake
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

// Main game loop
function startGame() {
    // If the snake hits the border, it appears on the opposite side
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    // Check if the snake has hit itself
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over!');
        }
    }

    // Check if the snake has hit an obstacle
    for (let i = 0; i < obstacles.length; i++) {
        if (snake[0].x == obstacles[i].x && snake[0].y == obstacles[i].y) {
            clearInterval(game);
            alert('Game Over!');
        }
    }

    // Draw the game objects
    createBG();
    createSnake();
    drawFood();
    createObstacles();

    // Get the next position of the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // If the snake eats the food, generate a new food position
    // Otherwise, remove the tail of the snake
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        generateFood();

        // Increase the score
        score++;
        // Update the score display
        document.getElementById('score').innerHTML = 'Score: ' + score;
    }

    // Add the new head to the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

// Start the game loop
let game = setInterval(startGame, 100);