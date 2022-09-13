class Toy {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getToyInfo() {
    return `The toy name is "${this.name}". It costs ${this.price} dollars.`;
  }
}

class Teddy extends Toy {
  constructor(name, price) {
    super(name, price);
    this.material = 'cotton';
  }

  getMaterialInfo() {
    return `The toy ${this.name} was made of ${this.material}.`;
  }
}

class Wooden extends Toy {
  constructor(name, price) {
    if (Wooden.instanse) {
      return Wooden.instanse;
    }

    super(name, price);
    Wooden.instanse = this;
    this.material = 'wood';
  }

  getMaterialInfo() {
    return `The toy ${this.name} was made of ${this.material}.`;
  }
}

class Plastic extends Toy {
  constructor(name, price) {
    super(name, price);
    this.material = 'plastic';
  }

  getMaterialInfo() {
    return `The toy ${this.name} was made of ${this.material}.`;
  }
}

class ToyFactory {
  constructor() {
    this._toysName = [];
  }

  produce(name, price, type = 'plastic') {
    let toy = this._toysName.find((item) => item.name === name);

    if (toy) {
      return toy;
    } else {
      if (type === 'teddy') {
        toy = new Teddy(name, price);
      } else if (type === 'wooden') {
        toy = new Wooden(name, price);
      } else if (type === 'plastic') {
        toy = new Plastic(name, price);
      }
      this._toysName.push(toy);
      return this._toysName[this._toysName.length - 1];
    }
  }
}

const factory = new ToyFactory();

const teddyBear = factory.produce('Bear', 200, 'teddy');
console.log(teddyBear.getToyInfo());
console.log(teddyBear.getMaterialInfo());

const plasticCar = factory.produce('Car', 100);
console.log(plasticCar.getToyInfo());
console.log(plasticCar.getMaterialInfo());

const plasticBear = factory.produce('Bear', 150, 'plastic');
console.log(plasticBear.getToyInfo());
console.log(plasticBear.getMaterialInfo());

const woodenHorse = factory.produce('Horse', 400, 'wooden');
console.log(woodenHorse.getToyInfo());

const woodenBear = factory.produce('Bears', 140, 'wooden');
console.log(woodenBear.getToyInfo());

class Car {
  constructor(name, host) {
    this.name = name;
    this.host = host;
  }

  carSound() {
    return 'Usual car sound.';
  }
}

function ambulancerCar(car) {
  car.ambulanceSound = function () {
    return 'Siren sound.';
  };
  return car;
}

const mers = new Car('Mersedes', 'Doctor');
const ambulanceMers = ambulancerCar(mers);
console.log(ambulanceMers.ambulanceSound());

const toyota = new Car('Toyota', 'Doctor2');
const ambulanceToyota = ambulancerCar(toyota);
console.log(toyota.ambulanceSound());
