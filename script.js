const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart");

let isGameOver = false;
let score = 0;
let obstacleInterval, scoreInterval;

// Jump using CSS class
function jump() {
  if (dino.classList.contains("jump") || isGameOver) return;
  dino.classList.add("jump");
  setTimeout(() => {
    dino.classList.remove("jump");
  }, 600); // match animation duration
}

// Pick a random obstacle height (between 20px and 90px)
function randomObstacleHeight() {
  return Math.floor(Math.random() * 70) ; 
}

// Move obstacle with random heights
function moveObstacle() {
  let position = 600;
  obstacle.style.left = position + "px";
  obstacle.style.height = randomObstacleHeight() + "px";

  obstacleInterval = setInterval(() => {
    if (position < -30) {
      // reset position and give a new random height
      position = 600;
      obstacle.style.height = randomObstacleHeight() + "px";
    } else {
      position -= 5;
      obstacle.style.left = position + "px";
    }

    // Collision check
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let obstacleHeight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("height"));

    if (position < 90 && position > 40 && dinoBottom < obstacleHeight) {
      gameOver();
    }
  }, 20);
}

// Score
function startScore() {
  score = 0;
  scoreInterval = setInterval(() => {
    score++;
    scoreDisplay.textContent = "Score: " + score;
  }, 100);
}

// Game Over
function gameOver() {
  isGameOver = true;
  clearInterval(obstacleInterval);
  clearInterval(scoreInterval);
  restartBtn.style.display = "inline-block";
}

// Restart
restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  isGameOver = false;
  startGame();
});

// Start game
function startGame() {
  moveObstacle();
  startScore();
}

document.addEventListener("keydown", e => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    jump();
  }
});

startGame();