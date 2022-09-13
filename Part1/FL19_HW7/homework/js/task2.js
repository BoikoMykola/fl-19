const play = confirm('Do you want to play a game?');

if (play) {
  startGame();
} else {
  alert('You did not become a billionaire, but can.');
}

function startGame() {
  let totalPrize = 0;
  let counter = 1;
  let max = 8;

  totalPrize = game(totalPrize, counter, max);

  alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
  let newGame = confirm(`Do you want to play again?`);

  if (newGame) {
    startGame();
  }
}

function game(totalPrize, counter, max) {
  const attempts = 3;
  const biggerAttempts = 4;
  const firstPrize = 100;
  const secondPrize = 50;
  const thirdPrize = 25;
  const number = getNumber(max);

  for (let i = 0; i < attempts; i++) {
    let currentPrize = 0;

    switch (i) {
      case 0:
        currentPrize = firstPrize * counter;
        break;
      case 1:
        currentPrize = secondPrize * counter;
        break;
      default:
        currentPrize = thirdPrize * counter;
        break;
    }

    let userNumber = +prompt(
      `Choose a roulette pocket number from 0 to ${max}
Attempts left: ${attempts - i}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${currentPrize}$`, '');

    if (userNumber === number) {
      i = attempts;
      totalPrize += currentPrize;
      let newGame = confirm(
        `Congratulation, you won! Your prize is: ${currentPrize} $. Do you want to continue?`
      );

      if (newGame) {
        counter++;
        max += biggerAttempts;
        totalPrize = game(totalPrize, counter, max);
      }
    }
  }

  return totalPrize;
}

function getNumber(max) {
  let number = Math.random() * (max + 1);
  return Math.floor(number);
}
