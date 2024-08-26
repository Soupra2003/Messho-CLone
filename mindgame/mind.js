const min = 1;
const max = 100;
let randomNumber;
let attempts;

const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const message = document.getElementById('message');

guessButton.addEventListener('click', () => {
  if (!randomNumber) {
    startGame();
    return;
  }
  
  const guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage('Please enter a valid number between 1 and 100.', 'red');
    return;
  }

  attempts++;
  if (guess === randomNumber) {
    setMessage(`Congratulations! You've guessed the number ${randomNumber} in ${attempts} attempts.`, 'green');
    showPopup();
  } else if (guess < randomNumber) {
    setMessage('Too low. Try again!', 'blue');
  } else {
    setMessage('Too high. Try again!', 'blue');
  }
});

function startGame() {
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  attempts = 0;
  setMessage('Guess a number between 1 and 100:');
  guessInput.value = '';
}

function setMessage(msg, color = 'black') {
  message.textContent = msg;
  message.style.color = color;
}

function showPopup() {
  const score = attempts;
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerHTML = `
    <div class="popup-content">
      <p>Your score: ${score} attempts</p>
      <button onclick="restartGame()">Restart Game</button>
    </div>
  `;
  document.body.appendChild(popup);
}

function restartGame() {
  const popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
  }
  randomNumber = null;
  startGame();
}
