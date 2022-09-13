const array = ['rock', 'paper', 'scissors'];

export function getRandom() {
  let index = Math.floor(Math.random() * array.length);
  return array[index]
}

