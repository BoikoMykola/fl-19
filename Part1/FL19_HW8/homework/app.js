// #1
function extractCurrencyValue(param) {
  const border = 1e15;
  const num = +param.match(/\d+(\.\d{1,2})?/)[0];

  if (num >= border) {
    return BigInt(Math.trunc(num));
  }

  return num;
}

console.log(extractCurrencyValue('120 USD')); // 120
console.log(extractCurrencyValue('1283948234720742 EUR')); // 1283948234720742n

// #2

let object = {
  name: 'Ann',
  age: 16,
  hobbies: undefined,
  degree: null,
  isChild: false,
  isTeen: true,
  isAdult: false,
};

function clearObject(obj) {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (!obj[key]) {
        delete obj[key];
      }
    }
  }

  return obj;
}

console.log(clearObject(object)); // { name: 'Ann', age: 16, isTeen: true }

// #3

function getUnique(param) {
  return Symbol(param);
}

console.log(getUnique('Test')); // Symbol('Test')

// #4

function countBetweenTwoDays(startDate, endDate) {
  const two = 2;
  const milisecInSec = 1000;
  const secInMin = 60;
  const minInHour = 60;
  const hourInDay = 24;
  const dayInWeek = 7;
  const monthInYear = 12;
  const milisecInDay = milisecInSec * secInMin * minInHour * hourInDay;
  const milisecInWeek = milisecInDay * dayInWeek;

  function getDateObj(str) {
    const arr = str.split('/');
    return {
      day: +arr[1],
      month: +arr[0],
      year: +arr[two],
      timestamp: Date.parse(`20${arr[two]}-${arr[0]}-${arr[1]}`),
    };
  }

  const startDateObj = getDateObj(startDate);
  const endDateObj = getDateObj(endDate);
  const day = Math.floor(
    (endDateObj.timestamp - startDateObj.timestamp) / milisecInDay
  );
  const week = Math.floor(
    (endDateObj.timestamp - startDateObj.timestamp) / milisecInWeek
  );
  let month = (startDateObj.year - endDateObj.year) * monthInYear;
  month -= startDateObj.month;
  month += endDateObj.month;

  if (endDateObj.day < startDateObj.day) {
    month -= 1;
  }

  return (
    `The difference between dates is: ` +
    `${day} day(-s), ` +
    `${week} week(-s), ` +
    `${month} month(-s)`
  );
}

console.log(countBetweenTwoDays('03/22/22', '05/25/22'));
// The difference between dates is: 64 day(-s), 9 week(-s), 2 month(-s)

// #5

function filterArray(arr) {
  return [...new Set(arr)];
}

// console.log(filterArray([1, 2, 2, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9]));

function filterArrayWithoutSet(arr) {
  let newArr = [];

  arr.forEach((element) => {
    if (!newArr.includes(element)) {
      newArr.push(element);
    }
  });

  return newArr;
}

// console.log(filterArrayWithoutSet([1, 2, 2, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9]));
