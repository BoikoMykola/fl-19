import {getRandom} from "./computer.js";
import { addResult } from "./result.js";
import '../scss/style.scss'
import '../scss/resultStyle.scss'
const gameButtons = document.querySelector('.game-buttons');
let round = 0;
let won = 0;
let lost = 0;

const getValue = (val) => val ?? '';

gameButtons.addEventListener('click', (e) => {
  let my = getValue(e.target.id);

  if (my) {
    round++;
    let comp = getRandom();

    if (my === comp) {
      let state = 'draw';
      addResult(my, comp, round, state);
    } else if (
      (my === 'scissors' && comp === 'paper') ||
      (my === 'rock' && comp === 'scissors') ||
      (my === 'paper' && comp === 'rock')
    ) {
      let state = 'WON';
      won++
      addResult(my, comp, round, state);
    } else if (
      (my === 'paper' && comp === 'scissors') ||
      (my === 'scissors' && comp === 'rock') ||
      (my === 'rock' && comp === 'paper')
    ) {
      let state = 'LOST';
      lost++
      addResult(my, comp, round, state);
    }

    if(won === 3) {
      alert('You WON!!!');
    }

    if(lost === 3) {
      alert('You LOST.')
    }
  }
});

const reset = document.querySelector('.reset');
reset.addEventListener('click', () => document.location.reload())
