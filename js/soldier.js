class Soldier {
  constructor() {
    this.health = 100;
    this.strength = 500;
    this.x = 0;
    this.y = 400;
    this.width = 100;
    this.height = 100;
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
      soldierStatus = "You die in the name of the Emperor...";
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
