export const addResult = (my, comp, round, state) => {
  const result = document.querySelector('.result');
  const p = document.createElement('p');
  p.innerText = `Round ${round}, ${my} vs. ${comp}, You’ve ${state}!`;
  result.append(p);
};