let turns = 0;
const zero = 0;
const one = 1;
const two = 2;
const three = 3;
const four = 4;
const five = 5;
const six = 6;
const seven = 7;
const eight = 8;
const nine = 9;
const winCombos = [
  [zero, one, two],
  [three, four, five],
  [six, seven, eight],
  [zero, three, six],
  [one, four, seven],
  [two, five, eight],
  [zero, four, eight],
  [six, four, two]
];

document.addEventListener('DOMContentLoaded', getGame);

function getGame() {
  const reset = document.getElementById('reset');
  reset.addEventListener('click', () => {
    document.location.reload();
  });

  showTiles();

  const container = document.querySelector('.container');
  const tiles = [...document.getElementsByClassName('tile')];

  tiles.forEach((item) => {
    item.addEventListener('pressEnter', clickHandler);
  });

  container.addEventListener('click', clickHandler);

  document.addEventListener('keydown', keydownHandler);
  const avatarIcons = [...document.getElementsByClassName('avatar-icon')];
  const avatarContainer = [
    ...document.getElementsByClassName('avatar-container')
  ];

  avatarIcons.forEach((item) => {
    item.setAttribute('draggable', 'true');
    item.ondragstart = drag;
  });

  avatarContainer.forEach((item) => {
    item.ondragover = allowDrop;
    item.ondrop = drop;
  });
}

function drop(e) {
  let itemData = e.dataTransfer.getData('dataItem');
  const icon = document.querySelector(`[data-item="${itemData}"]`);

  if (e.target.childNodes.length === 0) {
    e.target.append(icon);
  }
}

function drag(e) {
  e.dataTransfer.setData('dataItem', e.target.dataset.item);
}

function allowDrop(e) {
  e.preventDefault();
}

function keydownHandler(e) {
  const tiles = [...document.getElementsByClassName('tile')];
  const currentTile = tiles.findIndex((item) =>
    item.classList.contains('active')
  );

  switch (e.code) {
    case 'ArrowRight':
      changeTile(one, eight, zero);
      break;
    case 'ArrowLeft':
      changeTile(-one, zero, eight);
      break;
    case 'Enter':
      pressEnterFunc(tiles[currentTile]);
      break;
    default:
      break;
  }

  function changeTile(num, border, next) {
    if (currentTile !== -one) {
      tiles[currentTile].classList.remove('active');
      if (currentTile === border) {
        tiles[next].classList.add('active');
      } else {
        tiles[currentTile + num].classList.add('active');
      }
    } else {
      tiles[four].classList.add('active');
    }
  }
}

function pressEnterFunc(currentTile) {
  const event = new Event('pressEnter');
  currentTile.dispatchEvent(event);
}

function getResult() {
  if (turns >= five) {
    let arrO = [];
    let arrX = [];
    const tiles = [...document.getElementsByClassName('tile')];

    tiles.forEach((item, index) => {
      if (item.innerText === 'X') {
        arrX.push(index);
      } else if (item.innerText === 'O') {
        arrO.push(index);
      }
    });

    const playerO = winCombos.find((comb) => checkComb(comb, arrO));
    const playerX = winCombos.find((comb) => checkComb(comb, arrX));

    if (playerO) {
      showResult('Player <span class="playerO">O Won</span>');
    }

    if (playerX) {
      showResult('Player <span class="playerX">X Won</span>');
    }

    if (turns >= nine && !playerX && !playerO) {
      showResult('Nobody Won');
    }
  }
}

function showResult(player) {
  const announcer = document.querySelector('.announcer');
  announcer.classList.remove('hide');
  announcer.innerHTML = player;
  const container = document.querySelector('.container');
  container.removeEventListener('click', clickHandler);

  const tiles = [...document.getElementsByClassName('tile')];
  tiles.forEach((item) => {
    item.removeEventListener('pressEnter', clickHandler);
  });

  document.removeEventListener('keydown', keydownHandler);
}

function checkComb(comb, arr) {
  return comb.every(function (item) {
    return arr.indexOf(item) !== -one;
  });
}

function clickHandler(e) {
  if (e.target.innerText === '') {
    turns++;
    const displayPlayer = document.querySelector('.display-player');
    e.target.classList.add([...displayPlayer.classList][1]);
    e.target.innerText = displayPlayer.innerText;

    getResult();

    displayPlayer.classList.toggle('playerX');
    displayPlayer.classList.toggle('playerO');

    if (displayPlayer.innerText === 'X') {
      displayPlayer.innerText = 'O';
    } else {
      displayPlayer.innerText = 'X';
    }
  }
}

function showTiles() {
  const tilesNum = 9;
  const div = document.createElement('div');
  div.classList.add('container');

  for (let i = 0; i < tilesNum; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    div.append(tile);
  }

  const container = document.querySelector('.container');
  container.replaceWith(div);
}
