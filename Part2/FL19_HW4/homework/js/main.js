const loadJs = document.getElementById('loadJs');
const loadFetch = document.getElementById('loadFetch');
const url = 'https://jsonplaceholder.typicode.com/users';
let userArray = [];

loadJs.addEventListener('click', sendRequest);
loadFetch.addEventListener('click', sendFetch);

function sendRequest() {
  loadJs.setAttribute('disabled', 'disabled');
  showSpinner('firstCol');
  let request = new XMLHttpRequest();
  request.open('GET', url);
  request.onerror = function () {
    alert('Error');
  };
  request.send();
  request.onload = function () {
    let num = 200;
    if (request.status === num) {
      let userArr = JSON.parse(this.response);
      showSpinner('firstCol');
      showList(userArr);
    }
  };
}

function showSpinner(id) {
  const spinner = document.getElementById(id);
  spinner.classList.toggle('hidden');
}

function showList(arr) {
  const usersBlock = document.getElementById('usersBlockXhr');
  const ul = document.createElement('ul');

  for (const item of arr) {
    const li = document.createElement('li');
    li.innerText = item.name;
    ul.append(li);
  }

  usersBlock.appendChild(ul);
}

function sendFetch() {
  loadFetch.setAttribute('disabled', 'disabled');
  showSpinner('secondCol');

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      showSpinner('secondCol');
      userArray = result;
      showFullList(result);
      getClick();
    });
}

function showFullList(arr) {
  const fullList = document.getElementById('fullList');
  const ul = document.createElement('ul');
  ul.id = 'fullList';

  for (const item of arr) {
    const li = document.createElement('li');
    li.id = 'id' + item.id;
    li.innerHTML = `<p class="name">${item.name}</p>
    <p id="load${item.id}" class="loading hidden">...Loading</p>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
    <div class="save hidden">
      <input type="text">
      <button class="saveBtn" data-id="${item.id}" type="submit">Save</button>
    </div>`;
    ul.append(li);
  }

  fullList.replaceWith(ul);
}

function getClick() {
  const fullList = document.getElementById('fullList');
  fullList.addEventListener('click', (e) => {
    let num = 2;
    const userId = e.target.parentNode.id.slice(num);

    switch (e.target.classList[0]) {
      case 'edit':
        showEdit(e.target.parentNode.id);
        break;
      case 'delete':
        deleteUser(userId);
        break;
      case 'saveBtn':
        saveName(
          e.target.previousElementSibling,
          e.target.getAttribute('data-id')
        );
        break;
      default:
        break;
    }
  });
}

function hiddenSave() {
  const save = [...document.querySelectorAll('.save')];
  save.forEach((element) => {
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
    }
  });
}

function showEdit(userId) {
  hiddenSave();
  const item = document.getElementById(userId);
  item.lastElementChild.classList.toggle('hidden');
}

function deleteUser(userId) {
  showSpinner(`load${userId}`);
  fetch(url + '/' + userId, {
    method: 'DELETE'
  }).then((response) => {
    showSpinner(`load${userId}`);

    if (response.ok) {
      alert(`User with id – ${userId} was deleted`);
      let index = userArray.findIndex((item) => item.id === +userId);
      userArray.splice(index, 1);
      showFullList(userArray);
      getClick();
    }
  });
}

function saveName(inputBlock, userId) {
  if (inputBlock.value.trim() !== '') {
    showSpinner(`load${userId}`);
    const item = document.getElementById('id' + userId);

    fetch(url + '/' + userId, {
      method: 'PUT',
      body: JSON.stringify({
        name: inputBlock.value,
        userId: userId
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then((result) => {
        showSpinner(`load${userId}`);
        inputBlock.value = '';
        hiddenSave();
        let index = userArray.findIndex((item) => item.id === +userId);
        userArray[index].name = result.name;
        item.firstChild.innerText = result.name;
      });
  }
}
