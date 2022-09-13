// #1
function calculateSum(arr) {
  return arr.reduce((acc, elem) => acc + elem, 0);
}

// console.log(calculateSum([1, 2, 3, 4, 5])); //15

// #2
function isTriangle(a, b, c) {
  return a < b + c && b < a + c && c < a + b;
}

// console.log(isTriangle(5, 6, 7)); //true
// console.log(isTriangle(2, 9, 3)); //false

// #3
function isIsogram(word) {
  let lowWord = word.toLowerCase();

  for (let i = 0; i < lowWord.length; i++) {
    if (lowWord.includes(lowWord[i], i + 1)) {
      return false;
    }
  }

  return true;
}

console.log(isIsogram('Dermatoglyphics')); //true
console.log(isIsogram('abab')); //false

// #4
function isPalindrome(word) {
  let longStr = word.toLowerCase().split(' ').join('');

  return longStr === longStr.split('').reverse().join('');
}

console.log(isPalindrome('Dermatoglyphics')); //false
console.log(isPalindrome('abbabba')); //true

// #5
function showFormattedDate(dateObj) {
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en', { month: 'long' });
  const year = dateObj.getFullYear();

  return `${day} of ${month}, ${year}`;
}

console.log(showFormattedDate(new Date('05/12/22'))); //'12 of May, 2022'

// #6
const letterCount = (str, letter) => {
  let count = 0;
  let pos = -1;
  const noMatches = -1;

  while ((pos = str.indexOf(letter, pos + 1)) !== noMatches) {
    pos += letter.length - 1;
    count++;
  }

  return count;
};

console.log(letterCount('abbaba', 'b')); //3

// #7
function countRepetitions(arr) {
  let obj = {};

  arr.forEach((element) => {
    if (obj[element]) {
      obj[element] += 1;
    } else {
      obj[element] = 1;
    }
  });

  return obj;
}

console.log(countRepetitions(['banana', 'apple', 'banana']));
// { banana: 2, apple: 1 }

// #8
function calculateNumber(arr) {
  const binary = arr.join('');

  return parseInt(binary, 2);
}

console.log(calculateNumber([0, 1, 0, 1])); //5
console.log(calculateNumber([1, 0, 0, 1])); //9
