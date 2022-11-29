class Soldier {
  constructor() {
    this.health = 100;
    this.strength = 30;
    this.x = 0;
    this.y = 400;
    this.width = 100;
    this.height = 100;
    this.movement = true;
  }

  receiveDamage(damage) {
    this.health = this.health - damage;
    if (this.health > 0) {
      console.log(
        `You receive ${damage} points of damage! Health remaining:${this.health}hp`
      );
    } else {
      console.log("You died in the name of the Emperor");
    }
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
