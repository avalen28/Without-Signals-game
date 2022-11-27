class Tyranid {
  constructor() {
    this.health = 100;
    this.strength = 20;
    this.x = 400;
    this.y = -100;
    this.width = 100;
    this.height = 100;
  }

  receiveDamage(damage) {
    this.health = this.health - damage;
    if (this.health > 0) {
      console.log(`The Tyranid receives ${damage} points of damage!`);
    } else {
      console.log("The Tyranid dies in horrible screams!");
    }
  }
}
