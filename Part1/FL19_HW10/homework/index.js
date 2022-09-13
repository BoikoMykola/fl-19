const start = document.getElementById('start');
const process = document.getElementById('process');
const best = document.getElementById('best');
const bestAll = document.getElementById('bestAll');
const clearBest = document.getElementById('clearBest');
const clearBestAll = document.getElementById('clearBestAll');
const interval = 5000;

best.addEventListener('click', () => checkInput(showBest));
start.addEventListener('click', () => checkInput(count));
bestAll.addEventListener('click', showBestAll);
clearBest.addEventListener('click', () => checkInput(clearBestFunc));
clearBestAll.addEventListener('click', clearBestAllFunc);

function checkInput(func) {
  try {
    let nickname = document.getElementById('nickname').value;

    if (sessionStorage.getItem('nickname')) {
      nickname = sessionStorage.getItem('nickname');
    }

    if (nickname.trim() === '') {
      throw new SyntaxError('Empty nickname');
    }

    sessionStorage.setItem('nickname', nickname);
    func();
  } catch (e) {
    alert(e.message);
  }
}

function count() {
  let counter = 0;
  process.addEventListener('click', clickCount);
  let promise = new Promise((resolve) => {
    setTimeout(() => {
      process.removeEventListener('click', clickCount);
      resolve(counter);
    }, interval);
  });

  function clickCount() {
    counter++;
  }

  promise.then(() => {
    alert(`You clicked ${counter} times`);
    writeToLS(counter);
  });
}

function writeToLS(counter) {
  const nickname = sessionStorage.getItem('nickname');

  if (localStorage.getItem(nickname) < counter) {
    localStorage.setItem(`${nickname}`, counter);
  }

  if (localStorage.getItem('forAll')) {
    let forAll = JSON.parse(localStorage.forAll);
    let user = Object.keys(forAll)[0];

    if (forAll[user] < counter) {
      delete forAll[user];
      forAll[nickname] = counter;
      localStorage.forAll = JSON.stringify(forAll);
    }
  } else {
    let forAll = {};
    forAll[nickname] = counter;
    localStorage.forAll = JSON.stringify(forAll);
  }
}

function showBest() {
  const nickname = sessionStorage.getItem('nickname');
  alert(`Best result is ${localStorage.getItem(nickname)}`);
}

function showBestAll() {
  if (localStorage.getItem('forAll')) {
    let forAll = JSON.parse(localStorage.forAll);
    let user = Object.keys(forAll)[0];
    alert(`Best result for the whole time is ${forAll[user]} by ${user}`);
  } else {
    alert(`Best result for the whole time is: 0 by null`);
  }
}

function clearBestFunc() {
  const nickname = sessionStorage.getItem('nickname');
  localStorage.setItem(`${nickname}`, 0);
  alert(`Best result is cleared`);
}

function clearBestAllFunc() {
  let forAll = {};
  forAll.null = 0;
  localStorage.forAll = JSON.stringify(forAll);
  alert(`Best result for the whole time is cleared`);
}
