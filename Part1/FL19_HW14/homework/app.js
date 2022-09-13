const root = document.getElementById('root');
const searchBtn = document.getElementById('search-btn');
const loadMore = document.querySelector('.load-more');
let charactersList = [];
let cardNum = 5;
let count;

document.addEventListener('DOMContentLoaded', getList);

function getList() {
  let url = `https://rickandmortyapi.com/api/character`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      count = data.info.count;
    });
  charactersList = localStorage.charactersList
    ? JSON.parse(localStorage.charactersList)
    : [];
  showLoadMore();
  render(charactersList);
}

function showLoadMore() {
  if (charactersList.length <= cardNum) {
    loadMore.classList.add('hide');
  } else {
    loadMore.classList.remove('hide');
  }
}

window.onbeforeunload = function () {
  localStorage.charactersList = JSON.stringify(charactersList);
};

root.addEventListener('click', removeCard);
loadMore.addEventListener('click', changeCardNum);
searchBtn.addEventListener('click', search);

function changeCardNum() {
  const five = 5;
  cardNum += five;

  render(charactersList);
  setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
}

function removeCard(e) {
  const four = 4;

  if (/^card\d+$/.test(e.target.id)) {
    let remove = confirm('Would you like delete this photo?');

    if (remove) {
      const newList = charactersList.filter(
        (item) => item.id !== +e.target.id.slice(four)
      );
      charactersList = [...newList];
      render(charactersList);
    }
  }
}

function search() {
  const searchInput = document.getElementById('search-input');
  if (searchInput.value > 0 && searchInput.value <= count) {
    let url = `https://rickandmortyapi.com/api/character/${searchInput.value}`;

    if (
      charactersList.find((item) => item.id === +searchInput.value) ===
      undefined
    ) {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Character not found');
          }
        })
        .then((data) => {
          let newObj = {
            id: data.id,
            image: data.image
          };
          charactersList.push(newObj);
          render(charactersList);
        })
        .catch((error) => alert(error.message));
    } else {
      alert('Character is already in the list');
    }
  } else {
    alert('Character not found');
  }

  searchInput.value = '';
}

function render(arr) {
  let maxCard = 0;
  showLoadMore();
  const reversedArr = [...arr].reverse();

  if (reversedArr.length < cardNum) {
    maxCard = reversedArr.length;
  } else {
    maxCard = cardNum;
  }

  const div = document.createElement('div');
  div.id = 'characters-wrap';

  for (let i = 0; i < maxCard; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML =
      `<img src="${reversedArr[i].image}"` +
      ` alt="character ${reversedArr[i].id}">
    <button id="card${reversedArr[i].id}">Remove</button>`;
    div.append(card);
  }

  const charactersWrap = document.getElementById('characters-wrap');
  charactersWrap.replaceWith(div);
}
