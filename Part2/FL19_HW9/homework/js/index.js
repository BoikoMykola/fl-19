import { calendar } from './calendar.js';
import '../scss/style.scss';
import '../scss/calendar.scss';

calendar('calendar', new Date().getFullYear(), new Date().getMonth());

const prev = document.getElementById('prev');
prev.addEventListener('click', () => {
  const year = document.getElementById('monthYear').dataset.year;
  const month =
    parseFloat(document.getElementById('monthYear').dataset.month) - 1;
  calendar('calendar', year, month);
});

const next = document.getElementById('next');
next.addEventListener('click', () => {
  const year = document.getElementById('monthYear').dataset.year;
  const month =
    parseFloat(document.getElementById('monthYear').dataset.month) + 1;
  calendar('calendar', year, month);
});
