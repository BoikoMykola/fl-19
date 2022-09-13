import { extractNumbers } from './src/parser.js';
import {
  validateStringNotEmpty,
  validateNumber
} from './src/util/validation.js';
import { add } from './src/math.js';
import { transformToNumber } from './src/util/numbers.js';

const form = document.querySelector('form');
const output = document.getElementById('result');

function formSubmitHandler(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const numberInputs = extractNumbers(formData);
  let result = '';
  let resultText = '';

  result = getResult(numberInputs);
  console.log(result);

  if (result === 'invalid') {
    resultText = 'Invalid input. You must enter valid numbers.';
  } else if (result !== 'no-calc') {
    resultText = 'Result: ' + result;
  }

  output.textContent = resultText;
}
document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', formSubmitHandler);
});

export function getResult(numberInputs) {
  try {
    const numbers = [];
    for (const numberInput of numberInputs) {
      validateStringNotEmpty(numberInput);
      const number = transformToNumber(numberInput);
      validateNumber(number);
      numbers.push(number);
    }
    return add(numbers).toString();
  } catch (error) {
    return 'invalid';
  }
}
