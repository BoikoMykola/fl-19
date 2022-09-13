let array = [];
const askFirst = 'Enter first number';
const askSecond = 'Enter second number';

const firstNumber = getNumber(askFirst);
const secondNumber = getNumber(askSecond);

if (firstNumber > secondNumber) {
  alert('Invalid input data');
} else {
  for (let i = Math.floor(firstNumber) + 1; i < secondNumber; i++) {
    array.push(i);
  }

  alert(
    `First number: ${firstNumber}
Second number: ${secondNumber}

Numbers between: ${array.join(' ')}`
);
}

function getNumber(ask) {
  let number = +prompt(ask, '');

  if (typeof number !== 'number' || isNaN(number)) {
    alert('Invalid input data');
    number = getNumber(ask);
  }

  return number;
}
