const dice = document.getElementById("dice");
const score1 = document.getElementById("score");
const message = document.getElementById("message");
const rollBtn = document.getElementById("rollBtn");
const diceImage = document.getElementById("diceImage"); // The dice roll animation
const diceImages = {
  1: document.getElementById("dice1"),
  2: document.getElementById("dice2"),
  3: document.getElementById("dice3"),
  4: document.getElementById("dice4"),
  5: document.getElementById("dice5"),
  6: document.getElementById("dice6")
};

let score = 0;
const winningScore = 30;
let isGameOver = false;

// Arrow function to roll the dice
const rollDice = () => Math.floor(Math.random() * 6) + 1;

// Arrow function to reset the game
const resetGame = () => {
  score = 0;
  isGameOver = false;
  dice.textContent = '';
  score1.textContent = `Score: ${score}`;
  message.textContent = '';

  // Hide all dice images
  diceImage.style.display = 'none';
  Object.values(diceImages).forEach(img => img.style.display = 'none');
};

// Arrow function to handle game logic
const handleRoll = () => {
  if (isGameOver) return;

  // Hide all previous dice images and show the rolling animation
  Object.values(diceImages).forEach(img => img.style.display = 'none');
  diceImage.style.display = 'block'; // Show dice roll animation

  setTimeout(() => {
    const rolledValue = rollDice();
    diceImage.style.display = 'none'; // Hide rolling animation

    // Show the corresponding dice image for the rolled value
    diceImages[rolledValue].style.display = 'block';

    dice.textContent = `You rolled: ${rolledValue}`;

    if (rolledValue === 1) {
      message.textContent = 'You lost! You rolled a 1.';
      rollBtn.textContent = 'Start Again';
      isGameOver = true;
    } else {
      score += rolledValue;
      score1.textContent = `Score: ${score}`;

      if (score >= winningScore) {
        message.textContent = 'Congratulations! You won!';
        rollBtn.textContent = 'Start Again';
        isGameOver = true;
      }
    }
  }, 3000); // 3 seconds before showing the result
};

// Event listener for rolling the dice
rollBtn.addEventListener('click', (e) => {
  const btnText = e.target.textContent;

  if (btnText === 'Start Again') {
    e.target.textContent = 'Roll the Dice';
    resetGame();
  } else {
    handleRoll();
  }
});
