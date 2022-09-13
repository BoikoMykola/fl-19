const arr = ['1', '3', '4', '2', '5'];

const getMaxEvenElement = (arr) => {
  const evenArr = arr.reduce((acc, item) => {
    if (item % 2 === 0) {
      acc.push(item);
    }
    return acc;
  }, []);
  return Math.max(...evenArr);
};

console.log(getMaxEvenElement(arr));

let a = 3;
let b = 5;

[a, b] = [b, a];

console.log(a);
console.log(b);

const getValue = (val) => val ?? '-';

console.log(getValue(0));
console.log(getValue(4));
console.log(getValue('someText'));
console.log(getValue(null));
console.log(getValue(undefined));

const arrayOfArrays = [
  ['name', 'dan'],
  ['age', '21'],
  ['city', 'lviv']
];

const getObjFromArray = (arr) => Object.fromEntries(arr);

console.log(getObjFromArray(arrayOfArrays));

const addUniqueId = (obj) => {
  return { ...obj, id: Symbol() };
};

const obj1 = { name: 'nick' };

console.log(addUniqueId(obj1));
console.log(addUniqueId({ name: 'buffy' }));
console.log(Object.keys(obj1).includes('id'));

const getRegroupedObject = function (oldObj) {
  let {
    name,
    details: { id, age, university }
  } = oldObj;

  return {
    university: university,
    user: {
      age: age,
      firstName: name,
      id: id
    }
  };
};

const oldObj = {
  name: 'willow',
  details: { id: 1, age: 47, university: 'LNU' }
};

console.log(getRegroupedObject(oldObj));

const getArrayWithUniqueElements = (arr) => [...new Set(arr)];

const array = [2, 3, 4, 2, 4, 'a', 'c', 'a'];

console.log(getArrayWithUniqueElements(array));

const hideNumber = (phoneNumber) =>
  phoneNumber.slice(-4).padStart(phoneNumber.length, '*');

const phoneNumber = '0503456709';
console.log(hideNumber(phoneNumber));

const add = (a = required('a is required'), b = required('a is required')) => {
  try {
    return a + b;
  } catch (e) {
    console.log(`Uncaught ${e.name}: ${e.message}`);
  }
};

function required(arg) {
  throw new Error(arg);
}

console.log(add(2, 4));

function* generateIterableSequence() {
  yield 'I';
  yield 'love';
  yield 'EPAM';
}

const generatorObject = generateIterableSequence();

for (const value of generatorObject) {
  console.log(value);
}
