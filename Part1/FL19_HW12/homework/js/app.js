import { dictionary } from './dictionary.js';

const check = document.getElementById('check');
const reset = document.getElementById('reset');
const fild = document.getElementById('fild');
const roundArr = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
const word = dictionary[Math.floor(Math.random() * dictionary.length)];
const wordArr = word.split('');
let newWordArr = [];
let row = '';

reset.addEventListener('click', () => {
  document.location.reload();
});

check.addEventListener('click', checkWord);

fild.addEventListener('input', (e) => {
  getRound(e.target.classList[0]);
});

function getRound(round) {
  const lineElemArr = [...document.getElementsByClassName(round)];
  row = round;

  getWordArr(lineElemArr);
}

function enableChange() {
  const lineElemArr = [...document.getElementsByClassName(row)];
  const nextRound = roundArr.indexOf(row) + 1;
  const nextLineElemArr = [
    ...document.getElementsByClassName(roundArr[nextRound])
  ];

  lineElemArr.forEach((elem) => {
    elem.setAttribute('disabled', 'disabled');
  });

  nextLineElemArr.forEach((elem) => {
    elem.removeAttribute('disabled');
  });
}

function checkWord() {
  check.setAttribute('disabled', 'disabled');
  const lineElemArr = [...document.getElementsByClassName(row)];
  const newWord = newWordArr.join('');

  if (dictionary.includes(newWord)) {
    for (let i = 0; i < newWordArr.length; i++) {
      if (newWordArr[i] === wordArr[i]) {
        lineElemArr[i].classList.add('bg-green');
      } else if (
        wordArr.includes(newWordArr[i]) &&
        newWordArr[i] !== wordArr[i]
      ) {
        lineElemArr[i].classList.add('bg-yellow');
      } else {
        lineElemArr[i].classList.add('bg-gray');
      }
    }

    if (newWord === word) {
      alert('Congratulation! You won.');
      return;
    }

    if (row === 'sixth') {
      alert('Game over.');
    } else {
      enableChange();
    }
  } else {
    alert('Not in word list.');

    for (let i = 0; i < lineElemArr.length; i++) {
      lineElemArr[i].value = '';
    }
  }
}

function getWordArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value === '') {
      return;
    }

    newWordArr[i] = arr[i].value;
  }

  check.removeAttribute('disabled');
}
