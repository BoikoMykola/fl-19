class Unit {
  constructor(name, health, speed, damage, armor) {
    this.name = name;
    this.health = health;
    this.speed = speed;
    this.armor = armor;
    this.damage = damage;
  }
}

class Display {
  constructor(characters, myFighter, compFighter) {
    this.characters = characters;
    this.myFighter = myFighter;
    this.compFighter = compFighter;
  }

  chooseScreen() {
    const charactersList = document.querySelector('.characters-list');

    for (const item of this.characters) {
      const button = document.createElement('button');
      button.classList.add('fighterButton');
      button.innerText = item.name;
      charactersList.append(button);
    }
  }

  fighterScreen() {
    const battleField = document.querySelector('.battle-field');
    const fight = document.querySelector('.fight');
    fight.classList.remove('hidden');

    battleField.innerHTML += `<div class="fighter myFighter">
      <h2>${this.myFighter.name}</h2>
      <p class="myHealth">Health: ${this.myFighter.health}</p>
      <p>Speed: ${this.myFighter.speed}</p>
      <p>Armor: ${this.myFighter.armor}</p>
      <p>Damage: ${this.myFighter.damage}</p>
    </div>
    <div class="fighter compFighter">
      <h2>${this.compFighter.name}</h2>
      <p class="compHealth">Health: ${this.compFighter.health}</p>
      <p>Speed: ${this.compFighter.speed}</p>
      <p>Armor: ${this.compFighter.armor}</p>
      <p>Damage: ${this.compFighter.damage}</p>
    </div>`;
  }

  winnerScreen() {
    if (this.compFighter.health <= 0 && this.myFighter.health > 0) {
      alert(`${this.myFighter.name} is WINNER.`);
    } else if (this.myFighter.health <= 0 && this.compFighter.health > 0) {
      alert(`${this.compFighter.name} is WINNER.`);
    } else if (this.myFighter.health <= 0 && this.compFighter.health <= 0) {
      alert('The fight is a draw');
    }
    document.location.reload();
  }
}

class Game extends Display {
  constructor() {
    super(characters, myFighter, compFighter);
  }

  startGame() {
    const startButton = document.querySelector('.start');
    startButton.addEventListener('click', () => {
      alert('Choose your fighter');
      startButton.classList.add('hidden');
      this.chooseScreen();
      this.chooseFighter();
    });
  }

  chooseFighter() {
    const charactersList = document.querySelector('.characters-list');

    charactersList.addEventListener('click', (e) => {
      const myFighterIndex = characters.findIndex(
        (item) => item.name === e.target.innerText
      );
      this.myFighter = characters[myFighterIndex];
      charactersList.classList.add('hidden');
      this.compFighter = characters[this.randomFighter(myFighterIndex)];
      this.fighterScreen();
      this.startFight();
    });
  }

  randomFighter(same) {
    let compFighter;

    do {
      compFighter = Math.floor(Math.random() * characters.length);
    } while (compFighter === same);

    return compFighter;
  }

  startFight() {
    const fight = document.querySelector('.fight');

    fight.addEventListener('click', () => {
      fight.setAttribute('disabled', 'disabled');
      let timerMyStrike = setInterval(() => {
        let compHealth = document.querySelector('.compHealth');
        this.compFighter.health =
          +this.compFighter.health -
          (this.myFighter.damage - this.compFighter.armor);

        if (this.compFighter.health <= 0) {
          compHealth.innerText = `Health: 0`;
          clearInterval(timerMyStrike);
          clearInterval(timerCompStrike);
          this.winnerScreen();
        } else {
          compHealth.innerText = `Health: ${this.compFighter.health}`;
        }
      }, this.myFighter.speed);

      let timerCompStrike = setInterval(() => {
        let myHealth = document.querySelector('.myHealth');
        this.myFighter.health =
          +this.myFighter.health -
          (this.compFighter.damage - this.myFighter.armor);

        if (this.myFighter.health <= 0) {
          clearInterval(timerMyStrike);
          clearInterval(timerCompStrike);
          myHealth.innerText = `Health: 0`;
          this.winnerScreen();
        } else {
          myHealth.innerText = `Health: ${this.myFighter.health}`;
        }
      }, this.compFighter.speed);
    });
  }
}

const characters = [
  new Unit('Footman', 230, 2000, 25, 12),
  new Unit('Knight', 330, 4000, 30, 15),
  new Unit('Rifleman', 280, 500, 28, 8),
  new Unit('Priest', 230, 2000, 25, 12),
  new Unit('Sorceress', 230, 2000, 25, 12),
  new Unit('Dragonhawk', 350, 5000, 40, 12)
];

let myFighter;
let compFighter;
const game = new Game(characters, myFighter, compFighter);

game.startGame();
