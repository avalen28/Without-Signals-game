class Soldier {
  constructor() {
    this.health = 100;
    this.strength = 30;
    this.x = 0;
    this.y = 400;
    this.width = 100;
    this.height = 100;
  }
  attack() {
    return this.strength;
  }
  receiveDamage(damage) {
    this.health = this.health - damage;
    if (this.health > 0) {
      console.log(`You receive ${damage} points of damage!`);
    } else {
      console.log("You died in the name of the Emperor");
    }
  }
}
