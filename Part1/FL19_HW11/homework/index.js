function getWeekDay(date) {
  return new Date(date).toLocaleString('en-US', { weekday: 'long' });
}

function getAmountDaysToNewYear() {
  const day = 86400000;
  const now = new Date();
  const newYear = Date.parse(`${now.getFullYear() + 1}`);

  return Math.floor((newYear - now) / day);
}

function getApprovedToPass(birthday) {
  const nowYear = 2022;
  const fullAge = 18;
  const birthdayYear = birthday.getFullYear();
  const age = nowYear - birthdayYear - 1;

  if (age >= fullAge) {
    return 'Hello adventurer, you may pass!';
  } else if (age === fullAge - 1) {
    return (
      'Hello adventurer, you are to young for ' +
      'this quest wait for few more months!'
    );
  } else {
    return (
      `Hello adventurer, you are to young for ` +
      `this quest wait for ${fullAge - age} years more!`
    );
  }
}

function transformStringToHtml(str) {
  let additional = 3;
  let tagBorder = str.indexOf('"');
  let tagName = str.slice(tagBorder + 1, str.indexOf('"', tagBorder + 1));
  let valueBorder = str.indexOf('value="') + 'value="'.length;
  let value = str.slice(valueBorder, str.indexOf('"', valueBorder));
  let attributes = str
    .slice(tagBorder + additional + tagName.length, str.indexOf('value="') - 1)
    .replace(/[{}]/g, '"');

  return `<${tagName} ${attributes}>${value}</${tagName}>`;
}

function isValidIdentifier(str) {
  let regexp = /^[a-zA-Z$_][\w$]*$/;
  return regexp.test(str);
}

function capitalize(str) {
  let arr = str.split(/\s+/);
  let resultArr = arr.map((item) => item[0].toUpperCase() + item.slice(1));
  return resultArr.join(' ');
}

function isValidPassword(password) {
  const minPassword = 8;
  return (
    password.length >= minPassword &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j + 1] < arr[j]) {
        let t = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = t;
      }
    }
  }

  return arr;
}

function sortByItem(obj) {
  const minusOne = -1;
  const { item, array } = obj;

  function compare(a, b) {
    if (a[item] > b[item]) {
      return 1;
    }

    if (a[item] < b[item]) {
      return minusOne;
    }

    return 0;
  }

  return array.sort(compare);
}
