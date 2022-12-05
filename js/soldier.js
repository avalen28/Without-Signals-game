class Soldier {
  constructor() {
    this.health = 100;
    this.strength = 5;
    this.x = 0;
    this.y = 300;
    this.width = 200;
    this.height = 300;
    this.movement = true;
  }
  _generateDamage(initialStrengh) {
    let finalDmg = Math.floor(Math.random() * 10) * initialStrengh;
    console.log("soldier", finalDmg);
    return finalDmg;
  }
  receiveDamage(damage) {
    this.health = this.health - damage;
    let soldierStatus = "";
    if (this.health > 0) {
      soldierStatus = `Emperor... PROTECTS ME! You receive ${damage} points of damage!`;
    } else {
      soldierStatus = `You receive ${damage} points of damage and die in the name of the Emperor...`;
    }
    return soldierStatus;
  }
  moveLeft() {
    if (this.movement) {
      this.x = this.x - 15;
    }
  }
  moveRight() {
    if (this.movement) {
      this.x = this.x + 15;
    }
  }
}
